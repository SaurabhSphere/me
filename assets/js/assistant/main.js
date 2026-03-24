import { maybeAppendFieldPromo, isPhoneNumberRequest, privateContactResponse } from "./modules/rules.js";
import { fetchNvidiaReply } from "./modules/nvidiaClient.js";
import { appendMessage, mountAssistantWidget, setLoading, setOpenState } from "./modules/ui.js";

function getApiKeyFromHiddenTags() {
  const p1 = document.querySelector('meta[name="nv-key-part-1"]')?.content || "";
  const p2 = document.querySelector('meta[name="nv-key-part-2"]')?.content || "";
  const p3 = document.querySelector('meta[name="nv-key-part-3"]')?.content || "";
  return `${p1}${p2}${p3}`.trim();
}

function restoreHistory() {
  const raw = localStorage.getItem("assistant-history");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string").slice(-12);
  } catch {
    return [];
  }
}

function persistHistory(history) {
  localStorage.setItem("assistant-history", JSON.stringify(history.slice(-12)));
}

function bindAssistant() {
  const apiKey = getApiKeyFromHiddenTags();
  const el = mountAssistantWidget();
  let isOpen = false;
  let history = restoreHistory();

  el.fab.addEventListener("click", () => {
    isOpen = !isOpen;
    setOpenState(el, isOpen);
    if (isOpen) el.input.focus();
  });

  el.closeBtn.addEventListener("click", () => {
    isOpen = false;
    setOpenState(el, false);
  });

  el.form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = el.input.value.trim();
    if (!message) return;

    appendMessage(el, message, "user");
    el.input.value = "";

    if (!apiKey) {
      appendMessage(el, "Assistant API key is missing. Update hidden key tags in index.html.", "assistant");
      return;
    }

    if (isPhoneNumberRequest(message)) {
      appendMessage(el, privateContactResponse(), "assistant");
      return;
    }

    setLoading(el, true);

    try {
      const result = await fetchNvidiaReply({
        apiKey,
        userMessage: message,
        history,
      });

      const safeReply = maybeAppendFieldPromo(message, result.reply);
      appendMessage(el, safeReply, "assistant");

      history = [...history, result.userMessage, { role: "assistant", content: safeReply }].slice(-12);
      persistHistory(history);
    } catch (error) {
      appendMessage(el, `Error: ${error.message}`, "assistant");
    } finally {
      setLoading(el, false);
      el.input.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", bindAssistant);
