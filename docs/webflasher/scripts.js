const flashEl   = document.getElementById("flashEl");   // <esp-web-install-button>
const flashBtn  = document.getElementById("flashBtn");  // slotted button
const flashHint = document.getElementById("flashHint");
const grids = document.querySelectorAll(".boards-grid");
let selected = null;

function getI18nText(key, fallback) {
  const lang = localStorage.getItem("omnibus_lang") || "vi";
  if (typeof OMNIBUS_I18N !== "undefined" && OMNIBUS_I18N[lang] && OMNIBUS_I18N[lang][key]) {
    return OMNIBUS_I18N[lang][key];
  }
  return fallback;
}

function setActiveCard(key) {
  const cards = document.querySelectorAll(".card");
  for (const el of cards) {
    const on = !!key && el.dataset.key === key;
    el.classList.toggle("active", on);
    el.setAttribute("aria-selected", on ? "true" : "false");
  }
}

function setDisabled(state) {
  flashBtn.disabled = state;
  if (state) {
    flashBtn.setAttribute("disabled", "");
  } else {
    flashBtn.removeAttribute("disabled");
  }
}

function updateUI() {
  const lang = localStorage.getItem("omnibus_lang") || "vi";
  const selectHint = lang === "vi" ? "Vui lòng chọn loại bo mạch ở trên." : "Select a board above.";
  const readyHint = lang === "vi" ? "Sẵn sàng: Nhấn nút Nạp Firmware." : "Ready: Click Flash.";
  const flashText = lang === "vi" ? "⚡ Nạp Firmware đã chọn" : "⚡ Flash selected firmware";

  flashBtn.textContent = flashText;

  if (!selected) {
    flashEl.removeAttribute("manifest");
    setDisabled(true);
    flashHint.textContent = selectHint;
    setActiveCard(null);
    return;
  }

  const manifestUrl = `./manifests/${selected}.json`;
  flashEl.setAttribute("manifest", manifestUrl);
  setDisabled(false);
  flashHint.textContent = readyHint;
  setActiveCard(selected);
}

for (const grid of grids) {
  grid.addEventListener("click", (e) => {
    const el = e.target.closest(".card");
    if (!el) return;
    selected = el.dataset.key || null;
    updateUI();
  });
}

// Hook into global language changes
window.onLanguageChange = function() {
  updateUI();
};

// Init
updateUI();