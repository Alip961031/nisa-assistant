
// =============================================
// NISA SUPPORT HUB - AI CONNECTION
// This connects your dashboard to your Cloudflare Worker
// =============================================

// Your Worker URL (the brain of NISA)
const WORKER_URL = "https://nisa-deepseek-proxy.kgurun88.workers.dev";

// Session ID (keeps conversations connected)
let sessionId = "hub_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

// =============================================
// SEND MESSAGE TO NISA
// =============================================
async function sendToNISA(message) {
  try {
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
    return "❌ Could not reach NISA. Check your internet connection.";
  }
}

// =============================================
// CONNECT TO AI ASSISTANCE PAGE
// =============================================
document.addEventListener("DOMContentLoaded", function() {

  // Find the AI chat elements in your dashboard
  const findInput = () => {
    return document.querySelector("textarea[placeholder*='message']")
      || document.querySelector("textarea[placeholder*='Message']")
      || document.querySelector("textarea[placeholder*='Ask']")
      || document.querySelector("textarea[placeholder*='ask']")
      || document.querySelector("textarea[placeholder*='Type']")
      || document.querySelector("textarea[placeholder*='type']")
      || document.querySelector(".ai-input textarea")
      || document.querySelector(".ai-chat textarea")
      || document.querySelector("#ai-input");
  };

  // Find the send button
  const findSendBtn = () => {
    const buttons = document.querySelectorAll("button");
    for (let btn of buttons) {
      const text = btn.textContent.trim().toLowerCase();
      if (text === "send" || text.includes("send")) {
        const parent = btn.closest("[data-page='ai']") 
          || btn.closest(".ai-page")
          || btn.closest("#ai-page");
        if (parent) return btn;
      }
    }
    const allSend = [...document.querySelectorAll("button")].filter(b => 
      b.textContent.trim().toLowerCase() === "send"
    );
    return allSend[allSend.length - 1] || null;
  };

  // Find the chat messages area
  const findChatArea = () => {
    return document.querySelector(".ai-messages")
      || document.querySelector(".ai-chat-messages")
      || document.querySelector("[data-ai-messages]")
      || document.querySelector(".chat-messages");
  };

  // =============================================
  // MAIN HANDLER
  // =============================================
  async function handleSendMessage() {
    const input = findInput();
    if (!input) {
      console.log("⚠️ Could not find AI input field");
      return;
    }

    const message = input.value.trim();
    if (!message) return;

    const chatArea = findChatArea();

    // Show your message
    if (chatArea) {
      const userMsg = document.createElement("div");
      userMsg.style.cssText = "text-align:right; margin:10px 0; padding:10px 14px; background:linear-gradient(135deg,#6c5ce7,#a855f7); color:white; border-radius:16px 16px 4px 16px; display:inline-block; max-width:75%; float:right; clear:both; font-size:14px;";
      userMsg.textContent = message;
      chatArea.appendChild(userMsg);
      chatArea.scrollTop = chatArea.scrollHeight;
    }

    // Clear input
    input.value = "";

    // Show "thinking..."
    let thinkingEl = null;
    if (chatArea) {
      thinkingEl = document.createElement("div");
      thinkingEl.style.cssText = "text-align:left; margin:10px 0; padding:10px 14px; color:#a0a0a0; clear:both; font-size:13px; font-style:italic;";
      thinkingEl.textContent = "⏳ NISA is thinking...";
      chatArea.appendChild(thinkingEl);
      chatArea.scrollTop = chatArea.scrollHeight;
    }

    // Send to Worker
    const reply = await sendToNISA(message);

    // Remove thinking
    if (thinkingEl) thinkingEl.remove();

    // Show NISA's reply
    if (chatArea) {
      const aiMsg = document.createElement("div");
      aiMsg.style.cssText = "text-align:left; margin:10px 0; padding:10px 14px; background:#2d3436; color:#dfe6e9; border-radius:16px 16px 16px 4px; display:inline-block; max-width:75%; clear:both; font-size:14px; line-height:1.5;";
      aiMsg.textContent = reply;
      chatArea.appendChild(aiMsg);
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }

  // =============================================
  // CONNECT: Listen for Enter key and Send button
  // =============================================
  let attempts = 0;
  const connectInterval = setInterval(() => {
    attempts++;
    const input = findInput();
    const sendBtn = findSendBtn();

    if (input) {
      clearInterval(connectInterval);
      console.log("✅ NISA Connected! AI Assistance is live.");

      // Enter key
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
        console.log("✅ Send button connected!");
      }
    }

    // Stop trying after 30 seconds
    if (attempts > 30) {
      clearInterval(connectInterval);
      console.log("⚠️ NISA: Could not find AI chat elements after 30s");
    }
  }, 1000);

});

