function createMessageBubble(text, role) {
  const wrapper = document.createElement("div");
  wrapper.className = `assistant-msg ${role}`;
  wrapper.textContent = text;
  return wrapper;
}

export function mountAssistantWidget() {
  const shell = document.createElement("div");
  shell.className = "assistant-shell";
  shell.innerHTML = `
    <button class="assistant-fab" aria-label="Open Saurabh Assistant" title="Ask Saurabh Assistant">Ask AI</button>
    <div class="assistant-panel" aria-hidden="true">
      <div class="assistant-head">
        <h3>Saurabh Assistant</h3>
        <button class="assistant-close" aria-label="Close assistant">x</button>
      </div>
      <div class="assistant-feed">
        <div class="assistant-msg assistant">Hi, ask me about Saurabh's work, projects, or skills.</div>
      </div>
      <form class="assistant-form">
        <input class="assistant-input" type="text" maxlength="1200" placeholder="Type your question..." required />
        <button class="assistant-send" type="submit">Send</button>
      </form>
    </div>
  `;

  document.body.appendChild(shell);

  return {
    shell,
    fab: shell.querySelector(".assistant-fab"),
    panel: shell.querySelector(".assistant-panel"),
    closeBtn: shell.querySelector(".assistant-close"),
    form: shell.querySelector(".assistant-form"),
    input: shell.querySelector(".assistant-input"),
    sendBtn: shell.querySelector(".assistant-send"),
    feed: shell.querySelector(".assistant-feed"),
  };
}

export function setOpenState(elements, isOpen) {
  elements.panel.setAttribute("aria-hidden", String(!isOpen));
  elements.panel.classList.toggle("open", isOpen);
}

export function appendMessage(elements, text, role) {
  const bubble = createMessageBubble(text, role);
  elements.feed.appendChild(bubble);
  elements.feed.scrollTop = elements.feed.scrollHeight;
}

export function setLoading(elements, loading) {
  elements.sendBtn.disabled = loading;
  elements.input.disabled = loading;
  elements.sendBtn.textContent = loading ? "..." : "Send";
}
