// NISA FLOW FILE
// Edit topic cards and paper roll wording here.
// Main step handling remains in index.html. This file is safe for wording/config only.

window.NISA_FLOW = {
  topicCards: [
    { icon: "📜", title: "Paper Roll", desc: "Request paper rolls" },
    { icon: "📱", title: "Terminal Help", desc: "No automated flow yet" },
    { icon: "💬", title: "General Inquiries", desc: "Ask about PAYSYS services or payment terminals" }
  ],

  quickReplies: [],

  paperRoll: {
    serialGuideImage: "./serial-number-guide.png",

    intro: "Sure 😊 I can help with your paper roll request. I’ll just need a few details first.",

    askSerial: "First, may I have your Terminal Serial Number?",

    // Multiple bubbles
    serialHints: [
      "💡 You can find it at the back of your terminal.",
      "💡 Please enter only one Terminal Serial Number.",
      "💡 No need to type 'SN'.",
      "Example: xxx-xxx-xxx or Nxxxxxxxxxx"
    ]
  }
};
