import os
import sys
import json
import base64
import hashlib
import struct
import mimetypes
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver

WS_MAGIC = b"258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
DIR_PATH = os.path.join(os.path.dirname(__file__), "demo")

CURRENT_MODE = ["HIZ"]

MOCK_FILES = [
    {"name": "tv_samsung.ir", "size": 1840, "isDir": False},
    {"name": "gate_remote.sub", "size": 3280, "isDir": False},
    {"name": "weather_station.sub", "size": 2150, "isDir": False},
    {"name": "mesh_beacon.lora", "size": 950, "isDir": False},
    {"name": "eeprom_backup.bin", "size": 8192, "isDir": False}
]

def make_ws_response(text):
    data = text.encode("utf-8")
    length = len(data)
    if length <= 125:
        header = struct.pack("!BB", 0x81, length)
    elif length <= 65535:
        header = struct.pack("!BBH", 0x81, 126, length)
    else:
        header = struct.pack("!BBQ", 0x81, 127, length)
    return header + data

def read_ws_frame(stream):
    h = stream.read(2)
    if not h or len(h) < 2:
        return None
    b1, b2 = struct.unpack("!BB", h)
    opcode = b1 & 0x0F
    if opcode == 0x8:  # close
        return None
    masked = bool(b2 & 0x80)
    length = b2 & 0x7F
    if length == 126:
        length = struct.unpack("!H", stream.read(2))[0]
    elif length == 127:
        length = struct.unpack("!Q", stream.read(8))[0]
    mask = stream.read(4) if masked else b""
    payload = stream.read(length)
    if masked:
        payload = bytes([b ^ mask[i % 4] for i, b in enumerate(payload)])
    return payload.decode("utf-8", errors="replace")

def handle_command(cmd):
    cmd = cmd.strip()
    if not cmd:
        return f"\r\n{CURRENT_MODE[0]}> "

    parts = cmd.split()
    root = parts[0].lower()
    sub = parts[1].lower() if len(parts) > 1 else ""

    out = f"\r\n"
    if root in ("help", "?", "h"):
        out += (
            "====================================\r\n"
            "ESP32 OmniBus - General Commands\r\n"
            "====================================\r\n"
            "help                 - Show this help\r\n"
            "mode [name]          - Set active mode (hiz, i2c, spi, uart, wifi, etc.)\r\n"
            "man                  - Show firmware guide\r\n"
            "system               - Show system infos\r\n"
            "profile              - Save/load GPIOs config\r\n"
            "logic <gpio>         - Logic analyzer\r\n"
            "analogic <gpio>      - Analogic plotter\r\n"
            "wizard <gpio>        - GPIO activity analyzer\r\n"
            "P / p                - Enable / disable pull-up\r\n"
        )
    elif root in ("mode", "m"):
        if sub:
            valid_modes = ["HIZ", "1WIRE", "UART", "HDUART", "I2C", "SPI", "2WIRE", "3WIRE", 
                           "DIO", "LED", "INFRARED", "USB", "BLUETOOTH", "WIFI", "JTAG", "I2S", 
                           "CAN", "ETHERNET", "SUBGHZ", "RFID", "RF24", "FM", "CELL", "LORA"]
            for vm in valid_modes:
                if vm.lower() == sub:
                    CURRENT_MODE[0] = vm
                    out += f"Mode changed to {vm}\r\n"
                    break
            else:
                out += f"Unknown mode: {sub}\r\n"
        else:
            out += "Modes: HIZ, 1WIRE, UART, I2C, SPI, 2WIRE, DIO, LED, INFRARED, BLUETOOTH, WIFI, SUBGHZ, RFID, LORA\r\n"
    elif root in ("system", "sys"):
        out += (
            "=== System Information ===\r\n"
            "Device: ESP32-S3 DevKit (Mock Local Demo)\r\n"
            "Flash: 16 MB | PSRAM: 8 MB\r\n"
            "CPU: 240 MHz (Dual Core Xtensa LX7)\r\n"
            "Free Heap: 312 KB | Free PSRAM: 7.8 MB\r\n"
            "Firmware: ESP32 OmniBus v1.0\r\n"
            "Status: Online via Web CLI\r\n"
        )
    elif root == "scan":
        if CURRENT_MODE[0] == "I2C":
            out += "I2C: Scanning bus...\r\nDevice found at address 0x3C (OLED/SSD1306)\r\nDevice found at address 0x50 (EEPROM AT24C32)\r\nDevice found at address 0x68 (RTC DS3231)\r\n"
        elif CURRENT_MODE[0] == "WIFI":
            out += (
                "WiFi: Scanning for networks...\r\n"
                "  SSID: Home_WiFi_5G | Sec: WPA2 | BSSID: A4:2B:B0:12:34:56 | CH: 6 | RSSI: -48 dBm\r\n"
                "  SSID: Viettel_Fibre_Guest | Sec: OPEN | BSSID: E0:CC:7A:88:99:AA | CH: 1 | RSSI: -65 dBm [open]\r\n"
                "  SSID: Coffee_Free_Wifi | Sec: WPA2 | BSSID: 2C:FD:A1:33:44:55 | CH: 11 | RSSI: -78 dBm\r\n"
            )
        elif CURRENT_MODE[0] == "SUBGHZ":
            out += "Sub-GHz: Scanning band 433.92 MHz... Found peak at 433.920 MHz (-52 dBm)\r\n"
        else:
            out += f"{CURRENT_MODE[0]}: Scan completed. 2 devices active.\r\n"
    elif root == "status":
        out += f"Current Mode: {CURRENT_MODE[0]}\r\nPull-ups: Disabled\r\nInterface: Web Terminal (WebSocket)\r\n"
    else:
        out += f"Command executed: {cmd}\r\nOK\r\n"

    out += f"\r\n{CURRENT_MODE[0]}> "
    return out

class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # Suppress default noisy access logs

    def do_GET(self):
        # WebSocket Upgrade
        if self.headers.get("Upgrade", "").lower() == "websocket":
            key = self.headers.get("Sec-WebSocket-Key", "")
            accept = base64.b64encode(hashlib.sha1(key.encode("utf-8") + WS_MAGIC).digest()).decode("utf-8")
            self.send_response(101)
            self.send_header("Upgrade", "websocket")
            self.send_header("Connection", "Upgrade")
            self.send_header("Sec-WebSocket-Accept", accept)
            self.end_headers()
            
            # Send initial prompt
            self.wfile.write(make_ws_response(f"\r\n{CURRENT_MODE[0]}> "))
            self.wfile.flush()

            while True:
                try:
                    msg = read_ws_frame(self.rfile)
                    if msg is None:
                        break
                    resp = handle_command(msg)
                    self.wfile.write(make_ws_response(resp))
                    self.wfile.flush()
                except Exception:
                    break
            return

        # LittleFS API List
        if self.path.startswith("/littlefs/list"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            resp = {
                "total": 4194304,
                "used": sum(f["size"] for f in MOCK_FILES),
                "entries": MOCK_FILES
            }
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        # LittleFS API Delete
        if self.path.startswith("/littlefs/delete"):
            self.send_response(200)
            self.end_headers()
            return

        # Static files
        clean_path = self.path.split("?")[0].lstrip("/")
        if not clean_path or clean_path == "index.html":
            file_path = os.path.join(DIR_PATH, "index.html")
        else:
            file_path = os.path.join(DIR_PATH, clean_path)

        if os.path.exists(file_path) and os.path.isfile(file_path):
            ctype, _ = mimetypes.guess_type(file_path)
            self.send_response(200)
            if ctype:
                self.send_header("Content-Type", ctype)
            self.end_headers()
            with open(file_path, "rb") as f:
                self.wfile.write(f.read())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"404 Not Found")

    def do_POST(self):
        if self.path.startswith("/littlefs/upload"):
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"OK")
            return
        self.send_response(404)
        self.end_headers()

    def do_DELETE(self):
        if self.path.startswith("/littlefs/delete"):
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"OK")
            return
        self.send_response(404)
        self.end_headers()

class ThreadingServer(socketserver.ThreadingMixIn, HTTPServer):
    daemon_threads = True

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    server = ThreadingServer(("127.0.0.1", port), Handler)
    print(f"ESP32 OmniBus Local Demo running at http://127.0.0.1:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
