// =============================================
// NISA SUPPORT HUB - LIVE CHAT CONNECTION
// Connects your Live Chat page to your Cloudflare Worker
// =============================================

// Your Worker URL (the brain of NISA)
// IMPORTANT: This MUST start with https://
const WORKER_URL = "https" + "://" + "nisa-deepseek-proxy.kgurun88.workers.dev";

// Session ID (keeps conversations connected)
let sessionId = "hub_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

// =============================================
// SEND MESSAGE TO NISA WORKER
// =============================================
async function sendToNISA(message) {
  try {
    console.log("Sending to:", WORKER_URL);
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message,
        sessionId: sessionId
      })
    });
    const data = await response.json();
    return data.reply || data.response || data.message || "No response received";
  } catch (error) {
    console.error("NISA Connection Error:", error);
    return "Could not reach NISA. Check your internet connection.";
  }
}

// =============================================
// CONNECT TO LIVE CHAT PAGE
// =============================================
document.addEventListener("DOMContentLoaded", function() {

  // Find Live Chat elements
  function findLiveChatInput() {
    // Look for textarea or input in the live chat / agent chat area
    const selectors = [
      ".chat-input textarea",
      ".chat-input input",
      "textarea[placeholder*='Reply']",
      "textarea[placeholder*='reply']",
      "textarea[placeholder*='Type']",
      "textarea[placeholder*='type']",
      "textarea[placeholder*='message']",
      "textarea[placeholder*='Message']",
      "#chat-input",
      ".agent-chat textarea",
      ".agent-chat input"
    ];
    for (let sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    // Last resort: find any textarea on page
    return document.querySelector("textarea");
  }

  function findLiveChatSendBtn() {
    // Look for Send buttons
    const buttons = document.querySelectorAll("button");
    for (let btn of buttons) {
      const text = btn.textContent.trim().toLowerCase();
      if (text === "send") return btn;
    }
    return null;
  }

  function findChatMessages() {
    // Look for the chat messages container
    const selectors = [
      ".chat-messages",
      ".messages-area",
      ".conversation-area",
      "#chat-messages",
      ".agent-chat-messages"
    ];
    for (let sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  // =============================================
  // HANDLE SENDING A MESSAGE
  // =============================================
  async function handleSendMessage() {
    const input = findLiveChatInput();
    if (!input) {
      console.log("Could not find Live Chat input field");
      return;
    }

    const message = input.value.trim();
    if (!message) return;

    const chatArea = findChatMessages();

    // Show agent message in chat area
    if (chatArea) {
      const agentMsg = document.createElement("div");
      agentMsg.style.cssText = "text-align:right; margin:10px 0; padding:10px 14px; background:linear-gradient(135deg,#6c5ce7,#a855f7); color:white; border-radius:16px 16px 4px 16px; display:inline-block; max-width:75%; float:right; clear:both; font-size:14px;";
      agentMsg.textContent = message;
      chatArea.appendChild(agentMsg);
      chatArea.scrollTop = chatArea.scrollHeight;
    }

    // Clear input
    input.value = "";

    // Show typing indicator
    let thinkingEl = null;
    if (chatArea) {
      thinkingEl = document.createElement("div");
      thinkingEl.style.cssText = "text-align:left; margin:10px 0; padding:10px 14px; color:#a0a0a0; clear:both; font-size:13px; font-style:italic;";
      thinkingEl.textContent = "NISA is processing...";
      chatArea.appendChild(thinkingEl);
      chatArea.scrollTop = chatArea.scrollHeight;
    }

    // Send to Worker
    const reply = await sendToNISA(message);

    // Remove typing indicator
    if (thinkingEl) thinkingEl.remove();

    // Show NISA reply
    if (chatArea) {
      const nisaMsg = document.createElement("div");
      nisaMsg.style.cssText = "text-align:left; margin:10px 0; padding:10px 14px; background:#2d3436; color:#dfe6e9; border-radius:16px 16px 16px 4px; display:inline-block; max-width:75%; clear:both; font-size:14px; line-height:1.5;";
      nisaMsg.textContent = reply;
      chatArea.appendChild(nisaMsg);
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }

  // =============================================
  // CONNECT EVENTS
  // =============================================
  let attempts = 0;
  const connectInterval = setInterval(() => {
    attempts++;
    const input = findLiveChatInput();
    const sendBtn = findLiveChatSendBtn();

    if (input) {
      clearInterval(connectInterval);
      console.log("NISA Connected! Live Chat is active.");

      // Enter key sends message
      input.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      });

      // Send button
      if (sendBtn) {
        sendBtn.addEventListener("click", function(e) {
          e.preventDefault();
          handleSendMessage();
        });
        console.log("Send button connected!");
      }
    }

    // Stop after 30 seconds
    if (attempts > 30) {
      clearInterval(connectInterval);
      console.log("NISA: Could not find Live Chat elements after 30s");
    }
  }, 1000);

});
