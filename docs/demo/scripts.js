/* =========================================================
   CONFIG
   ========================================================= */

// Gemini model
const GEMINI_MODEL = "gemini-3-flash-preview";

// Local storage key
const GEMINI_API_KEY_STORAGE_KEY = "gemini_api_key";

// Delay window where typed echo is likely to appear
const ECHO_FILTER_WINDOW_MS = 4000;

const GEMINI_TRANSLATOR_CONTEXT = `
You are a command translator for the ESP32 OmniBus multi-protocol analyzer firmware.

Your job is to convert natural language (English, Vietnamese / Tiếng Việt, etc.) into exact firmware commands.

You MUST:
- Output ONLY valid JSON
- Never output markdown
- Never wrap JSON in code fences
- Never invent commands
- Never invent argument values
- Only use commands from the known command list
- If the user query is in Vietnamese, provide "label", "description", and "notes" in Vietnamese!

==================================================
OUTPUT FORMAT
==================================================

{
  "user_intent": "string",
  "commands": [
    {
      "label": "string",
      "command": "string",
      "steps": ["string"],
      "description": "string"
    }
  ],
  "notes": "string"
}

Rules:
- "command" = compact CLI string
- Use " || " to chain commands
- "steps" = same commands split
- If unknown → return "commands": []
- "notes" = explain ambiguity or missing args

==================================================
GENERAL COMMANDS
==================================================

help
mode [name]
man
system
profile
alias
hex [number]
logic <gpio>
analogic <gpio>
wizard <gpio>
listen <gpio>
repeat <count> <cmd>
delay <seconds>
delayms <milliseconds>
delayus <microseconds>
P
p

==================================================
MODES
==================================================

1WIRE
UART
HDUART
I2C
SPI
2WIRE
3WIRE
DIO
LED
INFRARED
USB
BLUETOOTH
WIFI
JTAG
I2S 
CAN (Works with MCP2515)
ETHERNET (Works with W5500)
SUBGHZ (Works with CC1101)
RFID (Works with PN532)
RF24 (Works with NRF24L01)
FM (Works with SI4713)
CELL (Works with SIMCOM modules)
LORA (Works with SX1262)
EXPANDER (Works with ESP32 C5 for WiFi 5GHz support)

Default mode = HiZ

==================================================
CORE RULE (VERY IMPORTANT)
==================================================

If a request targets a protocol:
→ ALWAYS notify the user to switch to the corresponding mode first.

==================================================
MODE CONFIGURATION SAFETY
==================================================

Important rule:
- Do not assume a mode is already configured, user needs to explicitly configure the mode one time before use.
- If a command depends on entering a protocol mode first, and that mode may require setup, mention it in "notes".
- Do not invent configuration values.
- Do not pretend the action is fully immediate if entering the mode may open a configuration flow.
- Any Wi-Fi command that may reconfigure, disconnect, reset, switch mode, or heavily occupy the radio must be treated as disruptive from the Web UI.
- For such Wi-Fi commands, do not present them as safely executable from the Web UI.

Examples:
- For:
  mode I2C || scan
  notes may say:
  "Entering I2C mode may require initial configuration first."

- For:
  mode I2C || eeprom
  notes may say:
  "I2C mode may need to be configured before using EEPROM commands."

- For:
  mode SPI || flash
  notes may say:
  "SPI mode may require configuration before flash operations."

If the request involves hardware interaction or protocols:
- Help the user avoid common mistakes, don't specify pullup for I2C or if it's not strictly needed for a mode.
- Mention pinout for SPI EEPROM, FLASH, 3WIRE EEPROM, I2C EEPROM, 1WIRE EEPROM, etc
- When relevant, include short practical hardware advice (wiring, voltage, common issues).

==================================================
COMMANDS BY MODE
==================================================
[I2C]
scan
discovery (identify + ping + basic check)
ping <addr>
identify <addr>
sniff [addr]
freq (passive SCL measurement; waits for external traffic)
slave <addr>
read <addr> [reg]
write <addr> [reg] [val]
dump <addr> [len] (not for EEPROM)
regs <addr> [len] (not for EEPROM)
glitch <addr>
flood <addr>
health <addr>
monitor <addr> [ms]
trace <addr> [reg] [ms]
eeprom [addr] (24XX and AT24C series)
recover
jam 
swap
config

[UART]
scan
autobaud
ping (send probes to detect devices)
read
raw
sniff [txt|raw] (RX/RX passive mode)
write [text]
bridge
at
emulator (emulate GPS, Shell, AT devices)
trigger [pattern]
spam [text] [ms]
xmodem <send|recv> <path>
config
swap

[SPI]
sniff
sdcard
slave
flash (W25Qxx, MX25Lxx, GD25Qxx, IS25LPxx, and similar)
eeprom (25X-series SPI EEPROMs)
config

[1WIRE]
scan
ping
sniff
read
write id [8 bytes]
write sp [8 bytes]
temp
ibutton (RW1990)
eeprom (DS2431, DS2433, DS28EC20)
config

[DIO]
scan
pins
sniff <gpio>
read <gpio>
set <gpio> <H/L/I/O>
pullup <gpio>
pulldown <gpio>
pulse <gpio> <us>
servo <gpio> <angle>
pwm <gpio> [freq duty%]
toggle <gpio> <ms>
measure <gpio> [ms]
jam <gpio> [min max]
reset <gpio>

[WIFI]
scan
connect
ping <host>
discovery [timeout]
sniff
waterfall
probe
repeater
spoof ap <mac>
spoof sta <mac>
status
deauth [ssid]
disconnect
ap <ssid> <password>
spam
flood [channel]
ssh [h] [u] [pw] [p]
telnet <host> [port]
nc <host> <port>
nmap <host> [-p ports]
modbus <host> [port]
http get <url>
http analyze <url>
lookup mac|ip <addr>
webui
reset

[BLUETOOTH]
scan
pair <mac>
sniff
spoof <mac>
status
server
keyboard [text]
mouse <x> <y>
mouse click
mouse jiggle [ms]
reset

[INFRARED]
send <dev> sub <cmd>
receive
setprotocol
devicebgone
remote
replay [count] (with original delay interval)
record (to the littleFS storage)
load
jam
config

[USB]
storage (alias: stick)
keyboard [text]
mouse [action]
mouse jiggle [ms]
gamepad [key]
sysctrl [action] (power, sleep, wake)
host (connect devices to the ESP32 USB port)
adapters (interactive menu; reboots into USB-UART, serprog, AVRDUDE, SUMP, OpenOCD, IR Toy, SubGHz, BPIO2 or SDR)
reset
config

[HDUART]
bridge
config

[2WIRE]
sniff
smartcard (SLE44XX)
config

[3WIRE]
eeprom (93C series)
config

[LED]
fill <color>
set <index> <color>
blink
rainbow
chase
cycle
wave
reset
setprotocol
config

[JTAG]
scan swd
scan jtag
openocd (reboot into JTAG/SWD USB adapter)
config

[I2S]
play <freq> [ms]
record
test <speaker|mic>
reset
config

[CAN] (MCP2515)
sniff
send [id]
receive [id]
status
config

[ETHERNET] (W5500)
connect
status
ping <host>
discovery [timeout]
ssh [h] [u] [pw] [p]
telnet <host> [port]
nc <host> <port>
nmap <host> [-p ports]
modbus <host> [port]
http get <url>
http analyze <url>
lookup mac|ip <addr>
reset
config

[SUBGHZ] (CC1101)
scan
sweep
send <payload> [te]
receive
replay
jam
bruteforce
trace
waterfall
record
load
ear
setfrequency (alias: setfreq)
raw
decode
config

[RFID] (PN532, mifare, NTAG, felica)
read
write
clone
erase
config

[RF24] (NRF24L01)
scan
send
receive
sweep
jam
waterfall
setchannel
config

[FM] (SI4713)
sweep
trace [freq]
waterfall
broadcast
reset
config

[CELL] (SIMCOM modules)
modem
network
operator
sim
unlock
phonebook
sms
call
ussd [code]
setmode
config

[LORA] (SX1262)
send [payload] (text or hex{ AA BB })
spam [payload] [ms]
jam [seconds] (1..60)
receive
record
load
rssi [ms]
ear
scan
waterfall
cad [ms]
airtime [bytes]
setfreq [MHz]
status
meshtastic (interactive shell)
config

[EXPANDER]
Expand to a UART bridge session with an ESP32 C5 module for WiFi 5GHz support.

[GENERAL]
system (hardware info, status, uptime, etc)
profile (GPIO pinout save and load)
analogic <gpio>
logic <gpio>
wizard <gpio> (analyze and report pin activity and behavior)
listen <gpio> (pin activity to audio)
alias (one or more commands into a custom command shortcut)
hex [number]

==================================================
TRANSLATION RULES
==================================================

- If missing required arguments → DO NOT guess
- If ambiguous → return multiple commands
- If unknown → return empty commands

==================================================
EXAMPLES
==================================================

User: "tell me devices on the I2C bus"
→ mode I2C || scan

User: "read register 0x00 from device 0x68"
→ mode I2C || read 0x68 0x00

User: "switch to uart and detect baud rate"
→ mode UART || autobaud

User: "connect to Wi-Fi"
→ mode wifi || connect

User: "wifi scan"
→ mode WIFI || scan


User: "repeat 10 I2C scan"
→ mode I2C || repeat 10 scan

==================================================
FINAL RULE
==================================================

Be strict.
Be minimal.
Never hallucinate.
Only output JSON.
`;

/* =========================================================
   I18N / TRANSLATIONS (VIETNAMESE & ENGLISH)
   ========================================================= */

const I18N = {
  vi: {
    commandPlaceholder: "Nhập lệnh (vd: help, mode, scan...)",
    aiBtnTitle: "Mở Trợ lý Omni AI",
    filesBtnTitle: "Quản lý tệp tin",
    filesBtnText: "Tệp tin",
    sendBtnText: "Gửi",
    wsLostText: "Mất kết nối với thiết bị.",
    wsLostRefresh: "Tải lại",
    wsLostHint: "Chỉ hỗ trợ một phiên terminal tại một thời điểm",
    aiHeaderTitle: "⚡ Trợ lý OmniBus AI",
    aiCloseLabel: "Đóng",
    aiPromptLabel: "Bạn muốn phân tích hoặc điều khiển giao thức gì?",
    aiPromptPlaceholder: "Ví dụ: Làm sao để đọc dữ liệu từ chip nhớ EEPROM I2C?",
    aiTranslateBtn: "Dịch sang lệnh",
    aiSettingsBtn: "Khóa API",
    aiEmpty: "Chưa có gợi ý nào.",
    aiLoading: "Đang dịch...",
    apiKeyModalTitle: "Cấu hình Khóa Gemini API",
    apiKeyModalText: "Vui lòng cung cấp khóa API Google Gemini của bạn. Khóa được lưu an toàn trực tiếp trên trình duyệt. Xem <a href=\"https://ai.google.dev/gemini-api/docs/quickstart\" target=\"_blank\">Hướng dẫn lấy Gemini API</a>.",
    apiKeyLabel: "Khóa API",
    apiKeyPlaceholder: "Dán khóa API Gemini vào đây",
    saveApiKeyBtn: "Lưu cấu hình",
    clearApiKeyBtn: "Xóa",
    fpDropText: "Kéo & thả tệp vào đây, hoặc",
    fpChooseFile: "Chọn tệp",
    fpLoading: "Đang tải...",
    fpNoFiles: "Không tìm thấy tệp nào.",
    fpFailed: "Tải thất bại.",
    fpEmptyList: "Chưa có tệp nào.",
    fpSpace: (total, used, pct) => `Tổng: ${total} KB — Đã dùng: ${used} KB (${pct}%)`,
    dlTitle: "Tải tệp xuống",
    delTitle: "Xóa tệp",
    notEnoughSpace: (need, free) => `Không đủ dung lượng.\nCần: ${need} KB\nCòn trống: ${free} KB`,
    uploading: "⏳ Đang tải lên... Vui lòng đợi",
    uploadError: "Lỗi tải lên: ",
    uploadFailed: "Tải lên thất bại",
    confirmDelete: (name) => `Bạn có chắc muốn xóa '${name}' không?`,
    deleteFailed: "Xóa thất bại",
    deleteError: "Lỗi xóa tệp: ",
    copySuccess: "Đã sao chép vào bộ nhớ tạm.",
    copyEmpty: "Không có nội dung để sao chép.",
    transComplete: "Dịch hoàn tất.",
    transFailed: "Dịch thất bại.",
    noCmdSuggestion: "Không có gợi ý lệnh nào khả dụng.",
    suggestedCmd: "Lệnh gợi ý",
    copyBtn: "Sao chép",
    putInputBtn: "Đưa vào ô lệnh",
    sendCmdBtn: "Gửi",
    notesLabel: "Ghi chú:",
    bannerVersion: "Phiên bản 1.0 (OmniBus)    ⚡ Sẵn sàng",
    bannerTip: "Gõ 'mode' để bắt đầu hoặc 'help' để xem danh sách lệnh",
    guideBadge: "💡 MẸO",
    demoGuideText: "Gõ lệnh hoặc bấm nút nhanh (<strong>help</strong>, <strong>mode</strong>, <strong>scan</strong>). Bấm <strong>✨ AI</strong> để nhờ Trợ lý OmniBus AI dịch câu hỏi tiếng Việt sang tập lệnh phần cứng."
  },
  en: {
    commandPlaceholder: "Enter command (e.g. help, mode, scan...)",
    aiBtnTitle: "Open Omni Assistant",
    filesBtnTitle: "Manage files",
    filesBtnText: "Files",
    sendBtnText: "Send",
    wsLostText: "Connection lost with device.",
    wsLostRefresh: "Refresh",
    wsLostHint: "One terminal session supported at a time",
    aiHeaderTitle: "⚡ OmniBus AI Assistant",
    aiCloseLabel: "Close",
    aiPromptLabel: "What protocol or device do you want to explore?",
    aiPromptPlaceholder: "Example: How can I read data from an I2C EEPROM chip?",
    aiTranslateBtn: "Translate to command",
    aiSettingsBtn: "API Key",
    aiEmpty: "No suggestions yet.",
    aiLoading: "Translating...",
    apiKeyModalTitle: "Gemini API Key Configuration",
    apiKeyModalText: "Please provide your Google Gemini API key. Stored safely in your browser. See <a href=\"https://ai.google.dev/gemini-api/docs/quickstart\" target=\"_blank\">Gemini API Quickstart</a>.",
    apiKeyLabel: "API Key",
    apiKeyPlaceholder: "Paste Gemini API key here",
    saveApiKeyBtn: "Save locally",
    clearApiKeyBtn: "Clear",
    fpDropText: "Drag & drop a file here, or",
    fpChooseFile: "Choose file",
    fpLoading: "Loading...",
    fpNoFiles: "No files found.",
    fpFailed: "Failed to load.",
    fpEmptyList: "No files yet.",
    fpSpace: (total, used, pct) => `Total: ${total} KB — Used: ${used} KB (${pct}%)`,
    dlTitle: "Download file",
    delTitle: "Delete file",
    notEnoughSpace: (need, free) => `Not enough space.\nNeeded: ${need} KB\nFree: ${free} KB`,
    uploading: "⏳ Uploading... Please wait",
    uploadError: "Upload error: ",
    uploadFailed: "Upload failed",
    confirmDelete: (name) => `Delete '${name}' ?`,
    deleteFailed: "Delete failed",
    deleteError: "Delete error: ",
    copySuccess: "Copied to clipboard.",
    copyEmpty: "Nothing to copy.",
    transComplete: "Translation complete.",
    transFailed: "Translation failed.",
    noCmdSuggestion: "No command suggestion available.",
    suggestedCmd: "Suggested command",
    copyBtn: "Copy",
    putInputBtn: "Put in input",
    sendCmdBtn: "Send",
    notesLabel: "Notes:",
    bannerVersion: "Version 1.0 (OmniBus)       ⚡ Ready",
    bannerTip: "Type 'mode' to start or 'help' for commands",
    guideBadge: "💡 TIP",
    demoGuideText: "Type commands or click quick buttons (<strong>help</strong>, <strong>mode</strong>, <strong>scan</strong>). Click <strong>✨ AI</strong> for the OmniBus AI Assistant to translate plain text into hardware commands."
  }
};

let currentLang = localStorage.getItem("omnibus_lang") || localStorage.getItem("bp_lang") || "vi";

function updateUiLanguage() {
  const t = I18N[currentLang] || I18N.vi;

  const viBtn = byId("lang-vi-btn");
  const enBtn = byId("lang-en-btn");
  if (viBtn) viBtn.classList.toggle("active", currentLang === "vi");
  if (enBtn) enBtn.classList.toggle("active", currentLang === "en");

  const cmdInp = byId("command");
  if (cmdInp) cmdInp.placeholder = t.commandPlaceholder;

  const aiBtn = byId("ai-btn");
  if (aiBtn) aiBtn.title = t.aiBtnTitle;

  const filesBtn = byId("files-btn");
  if (filesBtn) filesBtn.title = t.filesBtnTitle;
  const filesBtnText = byId("files-btn-text");
  if (filesBtnText) filesBtnText.textContent = t.filesBtnText;

  const sendBtnText = byId("send-btn-text");
  if (sendBtnText) sendBtnText.textContent = t.sendBtnText;

  const wsLostText = byId("ws-lost-text");
  if (wsLostText) wsLostText.textContent = t.wsLostText;
  const wsLostRefresh = byId("ws-lost-refresh");
  if (wsLostRefresh) wsLostRefresh.textContent = t.wsLostRefresh;
  const wsLostHint = byId("ws-lost-hint");
  if (wsLostHint) wsLostHint.textContent = t.wsLostHint;

  const aiHeaderTitle = byId("ai-header-title");
  if (aiHeaderTitle) aiHeaderTitle.textContent = t.aiHeaderTitle;
  const aiCloseBtn = byId("ai-close-btn");
  if (aiCloseBtn) aiCloseBtn.setAttribute("aria-label", t.aiCloseLabel);
  const aiPromptLabel = byId("ai-prompt-label");
  if (aiPromptLabel) aiPromptLabel.textContent = t.aiPromptLabel;
  const aiPrompt = byId("ai-prompt");
  if (aiPrompt) aiPrompt.placeholder = t.aiPromptPlaceholder;
  const aiTranslateBtn = byId("ai-translate-btn");
  if (aiTranslateBtn) aiTranslateBtn.textContent = t.aiTranslateBtn;
  const aiSettingsText = byId("ai-settings-text");
  if (aiSettingsText) aiSettingsText.textContent = t.aiSettingsBtn;

  const apiKeyModalTitle = byId("api-key-modal-title");
  if (apiKeyModalTitle) apiKeyModalTitle.textContent = t.apiKeyModalTitle;
  const apiKeyModalText = byId("api-key-modal-text");
  if (apiKeyModalText) apiKeyModalText.innerHTML = t.apiKeyModalText;
  const apiKeyLabel = byId("api-key-label");
  if (apiKeyLabel) apiKeyLabel.textContent = t.apiKeyLabel;
  const apiKeyInp = byId("gemini-api-key");
  if (apiKeyInp) apiKeyInp.placeholder = t.apiKeyPlaceholder;
  const saveApiKeyBtn = byId("save-api-key-btn");
  if (saveApiKeyBtn) saveApiKeyBtn.textContent = t.saveApiKeyBtn;
  const clearApiKeyBtn = byId("clear-api-key-btn");
  if (clearApiKeyBtn) clearApiKeyBtn.textContent = t.clearApiKeyBtn;
  const apiKeyCloseBtn = byId("api-key-close-btn");
  if (apiKeyCloseBtn) apiKeyCloseBtn.setAttribute("aria-label", t.aiCloseLabel);

  const fpCloseBtn = byId("fp-close-btn");
  if (fpCloseBtn) fpCloseBtn.setAttribute("aria-label", t.aiCloseLabel);
  const dropzoneText = byId("dropzone-text");
  if (dropzoneText) dropzoneText.textContent = t.fpDropText;
  const chooseFileText = byId("choose-file-text");
  if (chooseFileText) chooseFileText.textContent = t.fpChooseFile;

  const aiEmptyMsg = byId("ai-empty-msg");
  if (aiEmptyMsg) aiEmptyMsg.textContent = t.aiEmpty;

  const guideBadge = byId("guide-badge");
  if (guideBadge && t.guideBadge) guideBadge.textContent = t.guideBadge;
  const demoGuideText = byId("demo-guide-text");
  if (demoGuideText && t.demoGuideText) demoGuideText.innerHTML = t.demoGuideText;
}

function setLanguage(lang) {
  if (lang !== "vi" && lang !== "en") lang = "vi";
  currentLang = lang;
  localStorage.setItem("omnibus_lang", lang);
  updateUiLanguage();
  initTerminalBanner();
}

/* =========================================================
   GLOBAL STATE
   ========================================================= */

let socket = null;
let reconnectInterval = 1000;
let responseTimeout = null;
let responseTimeoutDelay = 6000;
let bridgeMode = false;

let fsTotalBytes = 0;
let fsUsedBytes = 0;
let isUploading = false;

let filePanel = null;
let filePanelOverlay = null;
let aiPanel = null;
let aiPanelOverlay = null;

// Keeps track of recent commands to suppress progressive typed echo
let recentEchoFilters = [];

/* =========================================================
   UTILS
   ========================================================= */

function byId(id) {
  return document.getElementById(id);
}

function safeTrim(value) {
  return String(value ?? "").trim();
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeLineEndings(text) {
  return String(text ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function stripAnsi(text) {
  return String(text ?? "").replace(/\x1B\[[0-9;?]*[ -/]*[@-~]/g, "");
}

function isDigitsOnly(text) {
  return /^\d+$/.test(String(text ?? ""));
}

/* =========================================================
   ECHO FILTERING
   ========================================================= */

function registerEchoFilter(command) {
  const cmd = safeTrim(command);
  if (!cmd) return;

  recentEchoFilters.push({
    command: cmd,
    createdAt: Date.now()
  });

  cleanupEchoFilters();
}

function cleanupEchoFilters() {
  const now = Date.now();
  recentEchoFilters = recentEchoFilters.filter(item => {
    return (now - item.createdAt) <= ECHO_FILTER_WINDOW_MS;
  });
}

function extractPromptAndTypedPart(lineWithoutAnsi) {
  const line = String(lineWithoutAnsi ?? "");

  // Example:
  // "HIZ> m"
  // "I2C> mode I2C"
  // returns typed part after prompt
  const match = line.match(/^([^>\n\r]{0,32}>\s*)(.*)$/);
  if (!match) return null;

  return {
    prompt: match[1],
    typed: match[2] || ""
  };
}

function isEchoLikeLine(rawLine) {
  cleanupEchoFilters();

  if (!rawLine) return false;
  if (!recentEchoFilters.length) return false;

  const noAnsi = stripAnsi(rawLine);
  const trimmed = noAnsi.trim();

  if (!trimmed) return false;

  const promptData = extractPromptAndTypedPart(noAnsi);
  if (!promptData) return false;

  const typed = promptData.typed;

  // Do not suppress plain prompt lines like "HIZ>"
  if (!typed) return false;

  for (const item of recentEchoFilters) {
    const cmd = item.command;

    // Progressive typed echo:
    // "m", "mo", "mod", ...
    if (cmd.startsWith(typed)) {
      return true;
    }

    // Sometimes prompt may include extra spaces or partial display
    if (safeTrim(typed) && cmd.startsWith(safeTrim(typed))) {
      return true;
    }

    // Sometimes the exact command appears after prompt
    if (safeTrim(typed) === cmd) {
      return true;
    }
  }

  return false;
}

function filterIncomingTerminalData(data) {
  const normalized = normalizeLineEndings(data);

  // Keep split structure simple
  const lines = normalized.split("\n");
  const kept = [];

  for (const line of lines) {
    if (isEchoLikeLine(line)) {
      continue;
    }
    kept.push(line);
  }

  // Rebuild content
  return kept.join("\n");
}

/* =========================================================
   WEBSOCKET / TERMINAL
   ========================================================= */

function updateConnBadge(status) {
  const badge = byId("conn-badge");
  if (!badge) return;
  badge.className = "brand-badge";
  if (status === "connected") {
    badge.textContent = "ONLINE";
  } else if (status === "connecting") {
    badge.classList.add("connecting");
    badge.textContent = "CONNECTING";
  } else {
    badge.classList.add("disconnected");
    badge.textContent = "OFFLINE";
  }
}

let isStaticSim = window.location.hostname.endsWith("github.io") || window.location.protocol === "file:" || window.location.search.includes("mock=1");
let simMode = "HIZ";

function simulateCommandResponse(rawCmd) {
  const cmd = String(rawCmd ?? "").trim();
  const parts = cmd.split(/\s+/);
  const root = (parts[0] || "").toLowerCase();
  const sub = (parts[1] || "").toLowerCase();

  let out = "";
  if (!cmd) {
    return out + `${simMode}> `;
  }

  if (["help", "?", "h"].includes(root)) {
    out +=
      "====================================\r\n" +
      "ESP32 OmniBus - General Commands\r\n" +
      "====================================\r\n" +
      "help                 - Show this help\r\n" +
      "mode [name]          - Set active mode (hiz, i2c, spi, uart, wifi, etc.)\r\n" +
      "man                  - Show firmware guide\r\n" +
      "system               - Show system infos\r\n" +
      "profile              - Save/load GPIOs config\r\n" +
      "logic <gpio>         - Logic analyzer\r\n" +
      "analogic <gpio>      - Analogic plotter\r\n" +
      "wizard <gpio>        - GPIO activity analyzer\r\n" +
      "P / p                - Enable / disable pull-up\r\n";
  } else if (["mode", "m"].includes(root)) {
    const validModes = ["HIZ", "1WIRE", "UART", "HDUART", "I2C", "SPI", "2WIRE", "3WIRE", 
                        "DIO", "LED", "INFRARED", "USB", "BLUETOOTH", "WIFI", "JTAG", "I2S", 
                        "CAN", "ETHERNET", "SUBGHZ", "RFID", "RF24", "FM", "CELL", "LORA"];
    if (sub) {
      const found = validModes.find(m => m.toLowerCase() === sub);
      if (found) {
        simMode = found;
        out += `Mode changed to ${found}\r\n`;
      } else {
        out += `Unknown mode: ${sub}\r\n`;
      }
    } else {
      out += "Modes: HIZ, 1WIRE, UART, I2C, SPI, 2WIRE, DIO, LED, INFRARED, BLUETOOTH, WIFI, SUBGHZ, RFID, LORA\r\n";
    }
  } else if (["system", "sys"].includes(root)) {
    out +=
      "=== System Information ===\r\n" +
      "Device: ESP32-S3 DevKit (GitHub Pages Web Simulator)\r\n" +
      "Flash: 16 MB | PSRAM: 8 MB\r\n" +
      "CPU: 240 MHz (Dual Core Xtensa LX7)\r\n" +
      "Free Heap: 312 KB | Free PSRAM: 7.8 MB\r\n" +
      "Firmware: ESP32 OmniBus v1.0\r\n" +
      "Status: Online via Web Simulator\r\n";
  } else if (root === "scan") {
    if (simMode === "I2C") {
      out += "I2C: Scanning bus...\r\nDevice found at address 0x3C (OLED/SSD1306)\r\nDevice found at address 0x50 (EEPROM AT24C32)\r\nDevice found at address 0x68 (RTC DS3231)\r\n";
    } else if (simMode === "WIFI") {
      out +=
        "WiFi: Scanning for networks...\r\n" +
        "  SSID: Home_WiFi_5G | Sec: WPA2 | BSSID: A4:2B:B0:12:34:56 | CH: 6 | RSSI: -48 dBm\r\n" +
        "  SSID: Viettel_Fibre_Guest | Sec: OPEN | BSSID: E0:CC:7A:88:99:AA | CH: 1 | RSSI: -65 dBm [open]\r\n" +
        "  SSID: Coffee_Free_Wifi | Sec: WPA2 | BSSID: 2C:FD:A1:33:44:55 | CH: 11 | RSSI: -78 dBm\r\n";
    } else if (simMode === "SUBGHZ") {
      out += "Sub-GHz: Scanning band 433.92 MHz... Found peak at 433.920 MHz (-52 dBm)\r\n";
    } else {
      out += `${simMode}: Scan completed. 2 devices active.\r\n`;
    }
  } else if (root === "pins") {
    out +=
      "Pins configuration:\r\n" +
      "  SDA: GPIO 8  (Pull-up)\r\n" +
      "  SCL: GPIO 9  (Pull-up)\r\n" +
      "  MOSI: GPIO 11 | MISO: GPIO 13 | SCK: GPIO 12\r\n" +
      "  TX: GPIO 43   | RX: GPIO 44\r\n";
  } else if (root === "status") {
    out += `Current Mode: ${simMode}\r\nPull-ups: Disabled\r\nInterface: Web Terminal (GitHub Pages Web Simulator)\r\n`;
  } else {
    out += `Command executed: ${cmd}\r\nOK\r\n`;
  }

  out += `\r\n${simMode}> `;
  return out;
}

function connectSocket() {
  if (isStaticSim) {
    updateConnBadge("connected");
    const badge = byId("conn-badge");
    if (badge) badge.textContent = "SIMULATOR";
    hideWsLostPopup();
    console.log("[ESP32 OmniBus] Running in GitHub Pages Client Simulation Mode");
    return;
  }

  updateConnBadge("connecting");
  socket = new WebSocket("ws://" + window.location.host + "/ws");

  socket.onopen = function () {
    hideWsLostPopup();
    bridgeMode = false;
    updateConnBadge("connected");
    console.log("[WebSocket] Connected");
  };

  socket.onmessage = function (event) {
    const output = byId("output");
    let rawData = String(event.data ?? "");

    if (rawData.includes("Bridge: Stopped by user.")) {
      bridgeMode = false;
      console.log("[WebSocket] Bridge mode exited.");
    }

    clearTimeout(responseTimeout);
    hideWsLostPopup();
    updateConnBadge("connected");

    let filteredData = rawData;

    if (!bridgeMode) {
      filteredData = filterIncomingTerminalData(rawData);
    }

    if (!filteredData || filteredData.length === 0) {
      return;
    }

    output.value += filteredData;
    output.scrollTop = output.scrollHeight;

    console.log("[WebSocket] Recv:", filteredData);
  };

  socket.onerror = function (error) {
    console.error("[WebSocket] Error:", error);
    updateConnBadge("disconnected");
  };

  socket.onclose = function () {
    console.warn("[WebSocket] Disconnected. Retrying in 1s...");
    updateConnBadge("disconnected");
    showWsLostPopup();
    setTimeout(connectSocket, reconnectInterval);
  };
}

function showWsLostPopup() {
  if (bridgeMode) return;
  const popup = byId("ws-lost-popup");
  if (popup) popup.style.display = "block";
}

function hideWsLostPopup() {
  const popup = byId("ws-lost-popup");
  if (popup) popup.style.display = "none";
}

function appendTerminalLine(text, withNewline = true) {
  const output = byId("output");
  output.value += text;
  if (withNewline) output.value += "\n";
  output.scrollTop = output.scrollHeight;
}

function sendSingleCommand(rawCmd, options = {}) {
  const {
    addHistory = true,
    printToTerminal = true,
    clearInput = true
  } = options;

  const input = byId("command");
  const cmd = safeTrim(rawCmd);

  if (!cmd) return false;

  if (isStaticSim) {
    if (clearInput && input) input.value = "";
    if (printToTerminal) appendTerminalLine(cmd, true);
    if (addHistory) addToHistory(cmd);

    setTimeout(() => {
      const resp = simulateCommandResponse(cmd);
      const output = byId("output");
      if (output) {
        output.value += resp;
        output.scrollTop = output.scrollHeight;
      }
    }, 60);
    return true;
  }

  if (!socket || socket.readyState !== WebSocket.OPEN) return false;

  registerEchoFilter(cmd);

  if (cmd === "bridge" || cmd === "keyboard") {
    bridgeMode = true;
    clearTimeout(responseTimeout);
    hideWsLostPopup();

    socket.send(cmd + "\n");

    if (clearInput && input) input.value = "";
    if (addHistory) addToHistory(cmd);
    if (printToTerminal) appendTerminalLine(cmd, true);

    console.log("[WebSocket] Bridge Mode");
    return true;
  }

  clearTimeout(responseTimeout);
  responseTimeout = setTimeout(() => {
    console.warn("[WebSocket] No response after command.");
    showWsLostPopup();
  }, responseTimeoutDelay);

  socket.send(cmd + "\n");

  if (clearInput && input) input.value = "";

  if (!bridgeMode && !isDigitsOnly(cmd)) {
    if (printToTerminal) appendTerminalLine(cmd, true);
    if (addHistory) addToHistory(cmd);
  }

  return true;
}

function sendCommand() {
  const input = byId("command");
  const rawValue = input ? String(input.value ?? "") : "";
  const trimmed = safeTrim(rawValue);

  // If input is empty, still send a plain Enter to the firmware
  if (!trimmed) {
    if (isStaticSim) {
      const output = byId("output");
      if (output) {
        output.value += `\n${simMode}> `;
        output.scrollTop = output.scrollHeight;
      }
      return;
    }

    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    clearTimeout(responseTimeout);
    responseTimeout = setTimeout(() => {
      console.warn("[WebSocket] No response after empty command.");
      showWsLostPopup();
    }, responseTimeoutDelay);

    socket.send("\n");
    if (input) input.value = "";
    return;
  }

  sendSingleCommand(trimmed);
}

/* =========================================================
   COMMAND HISTORY
   ========================================================= */

function addToHistory(cmd) {
  if (!isValidCommand(cmd)) return;

  const history = byId("history");
  const title = byId("history-title");
  const last = history.firstChild;

  if (last && last.dataset?.full === cmd) return;

  const btn = document.createElement("button");
  const maxLength = 22;
  const displayText = cmd.length > maxLength ? cmd.slice(0, maxLength - 3) + "..." : cmd;

  btn.textContent = displayText;
  btn.title = cmd;
  btn.dataset.full = cmd;
  btn.onclick = () => {
    const input = byId("command");
    input.value = cmd;
    input.focus();
  };

  history.insertBefore(btn, history.firstChild);

  if (title) {
    title.style.display = "block";
  }
}

function isValidCommand(cmd) {
  if (!cmd) return false;
  if (cmd.length < 2) return false;
  if (isDigitsOnly(cmd)) return false;
  return true;
}

/* =========================================================
   AI PANEL
   ========================================================= */

function onAiOverlayClick(e) {
  if (e.target === aiPanelOverlay) {
    closeAiPanel();
  }
}

function openAiPanel() {
  if (!aiPanel || !aiPanelOverlay) return;

  aiPanelOverlay.style.display = "block";
  aiPanel.style.display = "flex";
  aiPanelOverlay.addEventListener("click", onAiOverlayClick);

  // Focus the prompt after the panel becomes visible.
  setTimeout(() => byId("ai-prompt")?.focus(), 0);
}

function closeAiPanel() {
  if (!aiPanel || !aiPanelOverlay) return;

  aiPanelOverlay.style.display = "none";
  aiPanel.style.display = "none";
}

/* =========================================================
   GEMINI API KEY MANAGEMENT
   ========================================================= */

function getStoredGeminiApiKey() {
  try {
    return safeTrim(localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) || "");
  } catch (_) {
    return "";
  }
}

function getGeminiApiKey() {
  return getStoredGeminiApiKey();
}

function hasGeminiApiKey() {
  return !!getGeminiApiKey();
}

function saveGeminiApiKeyToStorage() {
  const input = byId("gemini-api-key");
  const key = safeTrim(input?.value);

  if (!key) {
    setAiStatus("No API key entered.", "error");
    return;
  }

  try {
    localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, key);
    setAiStatus("API key saved locally in this browser.", "success");
    closeApiKeyModal();
  } catch (err) {
    console.error(err);
    setAiStatus("Failed to save API key locally.", "error");
  }

  updateApiKeyStatusDot();
}

function clearGeminiApiKeyFromStorage() {
  try {
    localStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
    const input = byId("gemini-api-key");
    if (input) input.value = "";
    setAiStatus("Stored API key cleared.", "success");
  } catch (err) {
    console.error(err);
    setAiStatus("Failed to clear stored API key.", "error");
  }

  updateApiKeyStatusDot();
}

function openApiKeyModal() {
  const overlay = byId("api-key-overlay");
  const modal = byId("api-key-modal");
  const input = byId("gemini-api-key");

  if (overlay) overlay.style.display = "block";
  if (modal) modal.style.display = "block";

  if (input && !safeTrim(input.value)) {
    input.value = getStoredGeminiApiKey();
  }

  setTimeout(() => input?.focus(), 0);
}

function closeApiKeyModal() {
  const overlay = byId("api-key-overlay");
  const modal = byId("api-key-modal");

  if (overlay) overlay.style.display = "none";
  if (modal) modal.style.display = "none";
}

/* =========================================================
   GEMINI UI HELPERS
   ========================================================= */

function setAiStatus(message, type = "info") {
  const el = byId("ai-status");
  if (!el) return;

  if (!message) {
    el.style.display = "none";
    el.textContent = "";
    el.className = "ai-status";
    return;
  }

  el.style.display = "block";
  el.textContent = message;
  el.className = "ai-status ai-status-" + type;
}

function updateApiKeyStatusDot() {
  const dot = byId("api-status-dot");
  if (!dot) return;

  const key = getGeminiApiKey();

  if (key && key.length > 10) {
    dot.classList.add("ready");
  } else {
    dot.classList.remove("ready");
  }
}

function clearAiResults() {
  const results = byId("ai-results");
  if (results) {
    const t = I18N[currentLang] || I18N.vi;
    results.innerHTML = `<div id="ai-empty-msg" class="ai-empty">${t.aiEmpty}</div>`;
  }
}

function setAiLoading() {
  const results = byId("ai-results");
  if (results) {
    const t = I18N[currentLang] || I18N.vi;
    results.innerHTML = `<div class="ai-empty">${t.aiLoading}</div>`;
  }
}

function fillCommandInput(command) {
  const input = byId("command");
  input.value = command || "";
  input.focus();
}

async function copyToClipboard(text) {
  const t = I18N[currentLang] || I18N.vi;
  const value = String(text ?? "");
  if (!value) {
    setAiStatus(t.copyEmpty, "error");
    return false;
  }

  // Modern API
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      setAiStatus(t.copySuccess, "success");
      return true;
    }
  } catch (err) {
    console.warn("[Clipboard] navigator.clipboard failed:", err);
  }

  // Fallback for local ESP32 HTTP pages / older mobile browsers
  try {
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.left = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);

    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length);

    const ok = document.execCommand("copy");
    document.body.removeChild(ta);

    if (ok) {
      setAiStatus(t.copySuccess, "success");
      return true;
    }

    throw new Error("execCommand copy failed");
  } catch (err) {
    console.error("[Clipboard] Fallback failed:", err);
    setAiStatus("Clipboard copy failed on this browser.", "error");
    return false;
  }
}

/* =========================================================
   GEMINI REQUEST / RESPONSE
   ========================================================= */

function buildGeminiUserPrompt(userText) {
  return `
Translate the following user request into firmware command suggestions.

User request:
${userText}

Return ONLY valid JSON.
`.trim();
}

async function callGeminiTranslate(userText) {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    openApiKeyModal();
    throw new Error("Missing Gemini API key.");
  }

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    encodeURIComponent(GEMINI_MODEL) +
    ":generateContent";

  const payload = {
    systemInstruction: {
      parts: [
        { text: GEMINI_TRANSLATOR_CONTEXT }
      ]
    },
    contents: [
      {
        parts: [
          { text: buildGeminiUserPrompt(userText) }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let errorJson = null;
    let errorText = "";

    try {
      errorJson = await response.json();
    } catch (_) {
      errorText = await response.text().catch(() => "");
    }

    // Handle 429 (quota)
    if (response.status === 429) {
      let retrySeconds = null;

      try {
        const retry = errorJson?.error?.details?.find(
          d => d["@type"]?.includes("RetryInfo")
        );
        if (retry?.retryDelay) {
          retrySeconds = parseInt(retry.retryDelay);
        }
      } catch (_) {}

      const msg = retrySeconds
        ? `Quota reached. Retry in ~${retrySeconds}s.`
        : `Daily quota reached. Try again later.`;

      throw new Error(msg);
    }

    // Handle other API errors
    const apiMessage =
      errorJson?.error?.message ||
      errorText ||
      `HTTP ${response.status}`;

    throw new Error(apiMessage);
  }
  return await response.json();
}

function extractGeminiText(apiResponse) {
  return (
    apiResponse?.candidates?.[0]?.content?.parts
      ?.map(part => part?.text || "")
      .join("")
      .trim() || ""
  );
}

function tryParseJson(text) {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (_) {}

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced && fenced[1]) {
    try {
      return JSON.parse(fenced[1]);
    } catch (_) {}
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(text.slice(firstBrace, lastBrace + 1));
    } catch (_) {}
  }

  return null;
}

function normalizeAiResponse(parsed) {
  const commands = Array.isArray(parsed?.commands) ? parsed.commands : [];

  return {
    user_intent: safeTrim(parsed?.user_intent),
    commands: commands.map(item => {
      const steps = Array.isArray(item?.steps)
        ? item.steps.map(s => safeTrim(s)).filter(Boolean)
        : [];

      const command = safeTrim(item?.command) || (steps.length ? steps.join(" || ") : "");

      return {
        label: safeTrim(item?.label) || "Suggested command",
        command,
        steps,
        description: safeTrim(item?.description)
      };
    }).filter(item => item.command),
    notes: safeTrim(parsed?.notes)
  };
}

async function translateWithAi() {
  const promptEl = byId("ai-prompt");
  const userText = safeTrim(promptEl?.value);

  if (!userText) {
    setAiStatus("Please enter a request first.", "error");
    return;
  }

  setAiStatus("");
  setAiLoading();

  try {
    const apiResponse = await callGeminiTranslate(userText);
    const rawText = extractGeminiText(apiResponse);
    const parsed = tryParseJson(rawText);

    if (!parsed) {
      console.warn("[Gemini] Raw response:", rawText);
      throw new Error("Gemini did not return valid JSON.");
    }

    const normalized = normalizeAiResponse(parsed);
    renderAiResults(normalized);
    setAiStatus("Dịch hoàn tất.", "success");
  } catch (err) {
    console.error(err);
    const results = byId("ai-results");
    if (results) {
      results.innerHTML = `
        <div class="ai-empty">
          ${escapeHtml(err.message || "Dịch thất bại.")}
        </div>
      `;
    }

    setAiStatus(err.message || "Dịch thất bại.", "error");
  }
}

/* =========================================================
   GEMINI RESULT RENDERING
   ========================================================= */

function renderAiResults(data) {
  const resultsEl = byId("ai-results");
  if (!resultsEl) return;
  const t = I18N[currentLang] || I18N.vi;

  const commands = Array.isArray(data?.commands) ? data.commands : [];
  const notes = safeTrim(data?.notes);

  if (!commands.length) {
    let html = `<div class="ai-empty">${t.noCmdSuggestion}</div>`;

    if (notes) {
      html += `<div class="ai-notes"><strong>${t.notesLabel}</strong> ${escapeHtml(notes)}</div>`;
    }

    resultsEl.innerHTML = html;
    return;
  }

  resultsEl.innerHTML = "";

  commands.forEach(item => {
    const card = document.createElement("div");
    card.className = "ai-card";

    const title = document.createElement("div");
    title.className = "ai-card-title";
    title.textContent = item.label || t.suggestedCmd;

    const cmd = document.createElement("div");
    cmd.className = "ai-card-command";
    cmd.textContent = item.command || "";

    card.appendChild(title);
    card.appendChild(cmd);

    if (item.description) {
      const desc = document.createElement("div");
      desc.className = "ai-card-description";
      desc.textContent = item.description;
      card.appendChild(desc);
    }

    if (Array.isArray(item.steps) && item.steps.length > 1) {
      const steps = document.createElement("div");
      steps.className = "ai-card-steps";
      steps.innerHTML = item.steps
        .map((step, i) => `<div><strong>${i + 1}.</strong> ${escapeHtml(step)}</div>`)
        .join("");
      card.appendChild(steps);
    }

    const actions = document.createElement("div");
    actions.className = "ai-card-actions";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.textContent = t.copyBtn;
    copyBtn.onclick = () => copyToClipboard(item.command || "");

    const fillBtn = document.createElement("button");
    fillBtn.type = "button";
    fillBtn.textContent = t.putInputBtn;
    fillBtn.onclick = () => {
      fillCommandInput(item.command || "");
      closeAiPanel();
    };

    const sendBtn = document.createElement("button");
    sendBtn.type = "button";
    sendBtn.textContent = t.sendCmdBtn;
    sendBtn.onclick = () => {
      closeAiPanel();
      sendSingleCommand(item.command || "");
    };

    actions.appendChild(copyBtn);
    actions.appendChild(fillBtn);
    actions.appendChild(sendBtn);

    card.appendChild(actions);
    resultsEl.appendChild(card);
  });

  if (notes) {
    const notesBox = document.createElement("div");
    notesBox.className = "ai-notes";
    notesBox.innerHTML = `<strong>${t.notesLabel}</strong> ${escapeHtml(notes)}`;
    resultsEl.appendChild(notesBox);
  }
}

/* =========================================================
   FILE PANEL
   ========================================================= */

function onOverlayClick(e) {
  if (e.target === filePanelOverlay && !isUploading) {
    closeFilePanel();
  }
}

function openFilePanel() {
  byId("file-panel-overlay").style.display = "block";
  byId("file-panel").style.display = "flex";
  filePanelOverlay.addEventListener("click", onOverlayClick);
  refreshFileList();
}

function closeFilePanel() {
  byId("file-panel-overlay").style.display = "none";
  byId("file-panel").style.display = "none";
}

async function refreshFileList() {
  const listEl = byId("file-list");
  const t = I18N[currentLang] || I18N.vi;
  listEl.innerHTML = `<div class='fp-empty'>${t.fpLoading}</div>`;

  if (isStaticSim) {
    fsTotalBytes = 16 * 1024 * 1024;
    fsUsedBytes = 16384;
    const totalKB = 16384;
    const usedKB = 16;
    byId("fp-space").textContent = t.fpSpace(totalKB, usedKB, 1);
    renderFileList([
      { name: "tv_samsung.ir", size: 1840, isDir: false },
      { name: "gate_remote.sub", size: 3280, isDir: false },
      { name: "weather_station.sub", size: 2150, isDir: false },
      { name: "mesh_beacon.lora", size: 950, isDir: false },
      { name: "eeprom_backup.bin", size: 8192, isDir: false }
    ]);
    return;
  }

  try {
    const r = await fetch("/littlefs/list?dir=/", { cache: "no-store" });
    const j = await r.json();

    fsTotalBytes = Number(j.total) || 0;
    fsUsedBytes = Number(j.used) || 0;

    const totalKB = Math.floor(j.total / 1024);
    const usedKB = Math.floor(j.used / 1024);
    const percent = totalKB > 0 ? Math.round((usedKB / totalKB) * 100) : 0;

    byId("fp-space").textContent = t.fpSpace(totalKB, usedKB, percent);

    const entries = (j && Array.isArray(j.entries)) ? j.entries : [];
    const files = entries.filter(e => !e.isDir);

    if (files.length === 0) {
      listEl.innerHTML = `<div class='fp-empty'>${t.fpNoFiles}</div>`;
    } else {
      renderFileList(files);
    }
  } catch (e) {
    listEl.innerHTML = `<div class='fp-empty'>${t.fpFailed}</div>`;
    console.error(e);
  }
}

function renderFileList(entries) {
  const listEl = byId("file-list");
  listEl.innerHTML = "";
  const t = I18N[currentLang] || I18N.vi;

  if (!Array.isArray(entries) || entries.length === 0) {
    listEl.innerHTML = `<div class='fp-empty'>${t.fpEmptyList}</div>`;
    return;
  }

  entries
    .filter(e => !e.isDir)
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(e => {
      const card = document.createElement("div");
      card.className = "fp-item";

      const icon = document.createElement("div");
      icon.className = "fp-icon";
      icon.textContent = "📄";
      icon.title = e.name;

      const name = document.createElement("div");
      name.className = "fp-name";
      name.textContent = e.name;

      const meta = document.createElement("div");
      meta.className = "fp-meta";
      meta.textContent = humanSize(e.size);

      const actions = document.createElement("div");
      actions.className = "fp-actions";

      const dl = document.createElement("button");
      dl.className = "fp-dl";
      dl.textContent = "💾";
      dl.title = t.dlTitle;
      dl.onclick = (ev) => {
        ev.stopPropagation();
        downloadFile(e.name);
      };

      const del = document.createElement("button");
      del.className = "fp-del";
      del.textContent = "🗑️";
      del.title = t.delTitle;
      del.onclick = async (ev) => {
        ev.stopPropagation();
        await deleteFile(e.name);
      };

      actions.appendChild(dl);
      actions.appendChild(del);

      const topWrap = document.createElement("div");
      topWrap.style.display = "flex";
      topWrap.style.flexDirection = "column";
      topWrap.style.gap = "4px";
      topWrap.appendChild(icon);
      topWrap.appendChild(name);
      topWrap.appendChild(meta);

      card.appendChild(topWrap);
      card.appendChild(actions);
      listEl.appendChild(card);
    });
}

function humanSize(n) {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let s = Number(n);

  while (s >= 1024 && i < units.length - 1) {
    s /= 1024;
    i++;
  }

  return (i === 0 ? s.toString() : s.toFixed(1)) + " " + units[i];
}

/* =========================================================
   FILE UPLOAD / DROP
   ========================================================= */

function onDropOver(e) {
  if (isUploading) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
  byId("dropzone").classList.add("drag");
}

function onDropLeave(e) {
  e.preventDefault();
  byId("dropzone").classList.remove("drag");
}

async function onDrop(e) {
  e.preventDefault();
  if (isUploading) return;

  byId("dropzone").classList.remove("drag");

  const files = e.dataTransfer.files;
  if (!files || !files.length) return;

  await uploadFile(files[0]);
}

async function onFileInput(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;

  await uploadFile(f);
  e.target.value = "";
}

function disableDropArea(disabled) {
  const dz = byId("dropzone");
  const inp = byId("file-input");
  if (!dz || !inp) return;

  if (disabled) {
    dz.classList.add("disabled");
    inp.disabled = true;
  } else {
    dz.classList.remove("disabled");
    inp.disabled = false;
  }
}

async function uploadFile(file) {
  const titleEl = byId("fp-header-title");
  const originalTitle = titleEl.textContent;
  const t = I18N[currentLang] || I18N.vi;

  const FREE_MARGIN = 1024;
  const freeBytes = Math.max(0, fsTotalBytes - fsUsedBytes - FREE_MARGIN);

  if (file.size > freeBytes) {
    const needKB = Math.ceil(file.size / 1024);
    const freeKB = Math.floor(freeBytes / 1024);
    alert(t.notEnoughSpace(needKB, freeKB));
    return;
  }

  try {
    isUploading = true;
    disableDropArea(true);
    titleEl.textContent = t.uploading;

    const r = await fetch("/littlefs/upload?file=" + encodeURIComponent(file.name), {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: file
    });

    if (!r.ok) throw new Error(t.uploadFailed);
    await refreshFileList();
  } catch (e) {
    alert(t.uploadError + e.message);
    console.error(e);
  } finally {
    titleEl.textContent = originalTitle;
    disableDropArea(false);
    isUploading = false;
  }
}

function downloadFile(name) {
  const url = "/littlefs/download?file=" + encodeURIComponent(name);
  window.open(url, "_blank");
}

async function deleteFile(name) {
  const t = I18N[currentLang] || I18N.vi;
  if (!confirm(t.confirmDelete(name))) return;

  try {
    const url = "/littlefs/delete?file=" + encodeURIComponent(name);
    const r = await fetch(url, { method: "DELETE" });
    if (!r.ok) throw new Error(t.deleteFailed);
    await refreshFileList();
  } catch (e) {
    alert(t.deleteError + e.message);
    console.error(e);
  }
}

function sendQuickCmd(cmd) {
  const input = byId("command");
  if (input) input.value = cmd;
  sendSingleCommand(cmd);
}

function clearTerminal() {
  initTerminalBanner();
  const input = byId("command");
  if (input) input.focus();
}

function initTerminalBanner() {
  const output = byId("output");
  if (!output) return;
  const t = I18N[currentLang] || I18N.vi;

  output.value =
`   ___ ____  ____ _____ ____      ___                  _ ____             
  | __/ ___||  _ \\__  /|__  \\    / _ \\ _ __ ___  _ _  (_) __ ) _  _ ___   
  | _|\\___ \\|  _/  / /   / /    | (_) | '  \\ '  \\| ' \\| |  _ \\| || (_-<   
  |___|____/|_|   /___| /___|    \\___/|_|_|_|_|_||_||_|_|____/ \\_,_/__/   

       ${t.bannerVersion}
  ${t.bannerTip}

HIZ> `;
}

function bindTerminalEvents() {
  const input = byId("command");
  const sendBtn = byId("send-btn");
  const filesBtn = byId("files-btn");
  const aiBtn = byId("ai-btn");

  if (sendBtn) {
    sendBtn.addEventListener("click", sendCommand);
  }

  if (filesBtn) {
    filesBtn.addEventListener("click", openFilePanel);
  }

  if (aiBtn) {
    aiBtn.addEventListener("click", openAiPanel);
  }

  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendCommand();
        return;
      }

      if (event.key === "Escape") {
        if (bridgeMode) {
          event.preventDefault();
          socket.send("\x1B");
          return;
        }

        if (aiPanel && aiPanel.style.display !== "none") {
          event.preventDefault();
          closeAiPanel();
          return;
        }

        if (filePanel && filePanel.style.display !== "none" && !isUploading) {
          event.preventDefault();
          closeFilePanel();
          return;
        }
      }

      if (event.ctrlKey && event.key.toLowerCase() === "c") {
        if (bridgeMode) {
          event.preventDefault();
          socket.send("\x03");
        }
        return;
      }

      if (event.key === "Tab") {
        if (bridgeMode) {
          event.preventDefault();
          socket.send("\x09");
        }
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "d") {
        if (bridgeMode) {
          event.preventDefault();
          socket.send("\x04");
        }
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "z") {
        if (bridgeMode) {
          event.preventDefault();
          socket.send("\x1A");
        }
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "x") {
        if (bridgeMode) {
          event.preventDefault();
          socket.send("\x18");
        }
      }
    });
  }
}

function bindAiEvents() {
  const translateBtn = byId("ai-translate-btn");
  const settingsBtn = byId("ai-settings-btn");
  const saveApiKeyBtn = byId("save-api-key-btn");
  const clearApiKeyBtn = byId("clear-api-key-btn");
  const aiPrompt = byId("ai-prompt");
  const apiOverlay = byId("api-key-overlay");
  const apiInput = byId("gemini-api-key");

  if (translateBtn) {
    translateBtn.addEventListener("click", translateWithAi);
  }

  if (settingsBtn) {
    settingsBtn.addEventListener("click", openApiKeyModal);
  }

  if (saveApiKeyBtn) {
    saveApiKeyBtn.addEventListener("click", saveGeminiApiKeyToStorage);
  }

  if (clearApiKeyBtn) {
    clearApiKeyBtn.addEventListener("click", clearGeminiApiKeyFromStorage);
  }

  if (apiOverlay) {
    apiOverlay.addEventListener("click", function (e) {
      if (e.target === apiOverlay) closeApiKeyModal();
    });
  }

  if (apiInput) {
    apiInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        saveGeminiApiKeyToStorage();
      }
    });
  }

  if (aiPrompt) {
    aiPrompt.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        const value = safeTrim(aiPrompt.value);
        if (!value) return;

        translateWithAi();
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeAiPanel();
      }
    });
  }
}

function bindMobileViewportFix() {
  if (!window.visualViewport) return;

  const main = document.querySelector("main");

  function onViewportResize() {
    if (main) {
      main.style.height = window.visualViewport.height + "px";
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }

  window.visualViewport.addEventListener("resize", onViewportResize);
  window.visualViewport.addEventListener("scroll", function () {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  });
}

window.addEventListener("DOMContentLoaded", function () {
  filePanel = byId("file-panel");
  filePanelOverlay = byId("file-panel-overlay");
  aiPanel = byId("ai-panel");
  aiPanelOverlay = byId("ai-panel-overlay");

  updateUiLanguage();
  initTerminalBanner();
  setTimeout(() => {
    byId("command")?.focus();
  }, 0);

  bindTerminalEvents();
  bindAiEvents();
  updateApiKeyStatusDot();
  bindMobileViewportFix();
  clearAiResults();
  connectSocket();
  

  if (hasGeminiApiKey()) {
  } else {
    setAiStatus("No Gemini API key configured yet.", "info");
  }
});
