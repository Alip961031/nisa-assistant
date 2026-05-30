
// NISA FLOW FILE
// Put this file in the same folder as index.html
// Images should also be in the same folder unless you change the paths below.

window.NISA_FLOW = {
  topicCards: [
    {
      icon: "📜",
      title: "Paper Roll",
      desc: "Request paper rolls"
    },
    {
      icon: "📱",
      title: "Terminal Help",
      desc: "General terminal guidance"
    },
    {
      icon: "💬",
      title: "General Inquiries",
      desc: "Ask about PAYSYS services or payment terminals"
    }
  ],

  quickReplies: [],

  paperRoll: {
    intro: "Sure 😊 I can help with your paper roll request. I'll just need a few details first.",
    askSerial: "First, may I have your Terminal Serial Number?",

    serialHints: [
      "💡 You can find it at the back of your terminal.",
      "💡 Please enter only one Terminal Serial Number.",
      "💡 No need to type 'SN'.",
      "Example: xxx-xxx-xxx or Nxxxxxxxxxx"
    ],

    // Main setup for 2 side-by-side downloadable guide images
    downloadAssets: [
      {
        title: "Guide 1",
        file: "./serial-number-guide-1.png",
        downloadName: "serial-number-guide-1.png",
        label: "Download"
      },
      {
        title: "Guide 2",
        file: "./serial-number-guide-2.png",
        downloadName: "serial-number-guide-2.png",
        label: "Download"
      }
    ],

    // Fallback single image if downloadAssets is empty or removed
    serialGuideImage: "./serial-number-guide-1.png"
  },

  terminalHelp: {
    intro: "I can provide general terminal guidance. For account-specific terminal checks, refund, settlement, void, reversal, transaction status, or terminal replacement, please use Live Chat."
  },

  generalInquiries: {
    intro: "Sure. Please ask your question about PAYSYS services, payment terminals, or merchant payment topics.",
    scope: "I can help with general PAYSYS, payment terminals, merchant payments, and chatbot navigation. I cannot perform refunds, settlement checks, transaction checks, void/reversal, chargeback, or account changes. For those, please use Live Chat."
  }
};
