document.addEventListener("DOMContentLoaded", () => {
  const chatbotContainer = document.getElementById("chatbot-container");
  const chatbotIcon = document.getElementById("chatbot-icon");
  const closeBtn = document.getElementById("close-btn");
  const sendBtn = document.getElementById("send-btn");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");

  chatbotIcon.onclick = () => {
    chatbotContainer.classList.remove("hidden");
    chatbotIcon.style.display = "none";
  };

  closeBtn.onclick = () => {
    chatbotContainer.classList.add("hidden");
    chatbotIcon.style.display = "flex";
  };

  sendBtn.onclick = sendMessage;

  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;
    appendMessage("user", text);
    chatbotInput.value = "";
    getBotResponse(text);
  }

  function appendMessage(type, text) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.textContent = text;
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  async function getBotResponse(userMessage) {
    const apiKey = "PASTE_YOUR_OPENAI_KEY_HERE";

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }],
          max_tokens: 120,
        }),
      });

      const data = await res.json();
      appendMessage("bot", data.choices[0].message.content);
    } catch (err) {
      appendMessage("bot", "Connection error. Try again.");
    }
  }
});
