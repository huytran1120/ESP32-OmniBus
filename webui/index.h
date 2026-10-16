#pragma once

inline const char* index_html = R"rawliteral(
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>ESP32 OmniBus - Multi-Protocol Analyzer</title>
  <link rel="stylesheet" href="/style.css">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%230f172a' stroke='%2300ffcc' stroke-width='4'/%3E%3Cpath d='M32 10 L44 28 L35 28 L40 54 L22 34 L30 34 Z' fill='%2300ffcc'/%3E%3C/svg%3E">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, interactive-widget=resizes-content">
</head>
<body>

  <!-- Main Container -->
  <main>
    <!-- Top Bar with Branding & Language Switcher -->
    <header class="top-bar">
      <div class="top-brand">
        <div class="brand-icon">⚡</div>
        <div class="brand-text">
          <span class="brand-name">ESP32 OmniBus</span>
          <span class="brand-badge" id="conn-badge">READY</span>
        </div>
      </div>
      <div class="lang-switch">
        <button id="lang-vi-btn" type="button" class="lang-btn active" onclick="setLanguage('vi')">🇻🇳 Tiếng Việt</button>
        <button id="lang-en-btn" type="button" class="lang-btn" onclick="setLanguage('en')">🇬🇧 English</button>
      </div>
    </header>

    <!-- Terminal Output Screen -->
    <div class="terminal-container">
      <textarea id="output" readonly spellcheck="false"></textarea>
    </div>

    <!-- Quick Command Bar -->
    <div class="quick-bar" id="quick-bar">
      <button type="button" class="quick-btn" onclick="sendQuickCmd('help')">❓ help</button>
      <button type="button" class="quick-btn" onclick="sendQuickCmd('mode')">🔄 mode</button>
      <button type="button" class="quick-btn" onclick="sendQuickCmd('status')">📊 status</button>
      <button type="button" class="quick-btn" onclick="sendQuickCmd('scan')">🔍 scan</button>
      <button type="button" class="quick-btn" onclick="sendQuickCmd('pins')">📌 pins</button>
      <button type="button" class="quick-btn" onclick="sendQuickCmd('mode i2c')">⚡ i2c</button>
      <button type="button" class="quick-btn" onclick="sendQuickCmd('mode spi')">💾 spi</button>
      <button type="button" class="quick-btn" onclick="sendQuickCmd('mode wifi')">📶 wifi</button>
      <button type="button" class="quick-btn quick-clear" onclick="clearTerminal()">🧹 clear</button>
    </div>

    <!-- Interactive Input Bar -->
    <div class="input-area">
      <div class="input-wrap">
        <input
          type="text"
          id="command"
          placeholder="Nhập lệnh (vd: help, mode, scan...)"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false">
        <button id="ai-btn" type="button" title="Mở Trợ lý Omni AI">✨ AI</button>
        <button id="files-btn" type="button" title="Quản lý tệp tin">📁 <span id="files-btn-text">Tệp tin</span></button>
      </div>
      <div class="actions">
        <button id="send-btn" type="button">📨 <span id="send-btn-text">Gửi</span></button>
      </div>
    </div>

    <div id="history" class="history-area"></div>
  </main>

  <!-- WebSocket Lost Overlay -->
  <div id="ws-lost-popup" class="popup" style="display: none;">
    <div class="popup-main">
      <span id="ws-lost-text" class="popup-text">Mất kết nối với thiết bị.</span>
      <a id="ws-lost-refresh" href="#" onclick="location.reload()">Tải lại</a>
    </div>
    <div id="ws-lost-hint" class="popup-hint">Chỉ hỗ trợ một phiên kết nối tại một thời điểm</div>
  </div>

  <!-- Omni AI Assistant Panel -->
  <div id="ai-panel-overlay" class="ai-overlay" style="display:none;"></div>
  <aside id="ai-panel" class="ai-panel" style="display:none;">
    <div class="ai-panel-header">
      <div>
        <h2 id="ai-header-title">⚡ Trợ lý OmniBus AI</h2>
      </div>
      <button id="ai-close-btn" class="ai-close" type="button" aria-label="Đóng" onclick="closeAiPanel()">×</button>
    </div>

    <div class="ai-block">
      <label id="ai-prompt-label" class="ai-label" for="ai-prompt">Bạn muốn phân tích hoặc điều khiển giao thức gì?</label>
      <textarea
        id="ai-prompt"
        placeholder="Ví dụ: Làm sao để đọc dữ liệu từ chip nhớ EEPROM I2C?"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"></textarea>
    </div>

    <div class="ai-actions">
      <button id="ai-translate-btn" type="button">Dịch sang lệnh</button>
      <button id="ai-settings-btn">
        <span id="ai-settings-text">Khóa API</span>
        <span id="api-status-dot"></span>
      </button>
    </div>

    <div id="ai-results" class="ai-results">
      <div id="ai-empty-msg" class="ai-empty">Chưa có câu lệnh gợi ý nào.</div>
    </div>
  </aside>

  <!-- Gemini API Key Modal -->
  <div id="api-key-overlay" class="modal-overlay" style="display:none;"></div>
  <div id="api-key-modal" class="modal" style="display:none;">
    <div class="modal-header">
      <h2 id="api-key-modal-title">Cấu hình Khóa Gemini API</h2>
      <button id="api-key-close-btn" class="modal-close" type="button" aria-label="Đóng" onclick="closeApiKeyModal()">×</button>
    </div>

    <div class="modal-body">
      <p id="api-key-modal-text" class="modal-text">
        Vui lòng cung cấp khóa API Google Gemini của bạn. Khóa được lưu an toàn trực tiếp trên trình duyệt của bạn. Xem <a href="https://ai.google.dev/gemini-api/docs/quickstart" target="_blank">Hướng dẫn lấy Gemini API</a>.
      </p>

      <label id="api-key-label" class="ai-label" for="gemini-api-key">Khóa API</label>
      <input
        type="password"
        id="gemini-api-key"
        placeholder="Dán khóa API Gemini vào đây"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false">

      <div class="modal-actions">
        <button id="save-api-key-btn" type="button">Lưu cấu hình</button>
        <button id="clear-api-key-btn" type="button">Xóa</button>
      </div>
    </div>
  </div>

  <!-- LittleFS File Manager Panel -->
  <div id="file-panel-overlay" class="fp-overlay" style="display:none;"></div>
  <div id="file-panel" class="fp" style="display:none;"
       ondragover="onDropOver(event)"
       ondragleave="onDropLeave(event)"
       ondrop="onDrop(event)">
    <div class="fp-header">
      <h2 id="fp-header-title">📁 LittleFS Storage</h2>
      <button id="fp-close-btn" class="fp-close" type="button" aria-label="Đóng" onclick="closeFilePanel()">×</button>
    </div>

    <div id="dropzone" class="fp-drop"
         ondragover="onDropOver(event)"
         ondragleave="onDropLeave(event)"
         ondrop="onDrop(event)">
      <p id="dropzone-text">Kéo & thả tệp vào đây, hoặc</p>
      <label class="fp-upload-btn">
        <input id="file-input" type="file" onchange="onFileInput(event)" />
        <span id="choose-file-text">Chọn tệp</span>
      </label>
    </div>

    <div class="fp-list-header">
      <span id="fp-space">Đang tải dung lượng...</span>
    </div>
    <div id="file-list" class="fp-list"></div>
  </div>

  <script src="/scripts.js"></script>
</body>
</html>
)rawliteral";