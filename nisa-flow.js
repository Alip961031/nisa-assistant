// NISA FLOW FILE
// Edit chatbot menu/options and flow wording here instead of editing index.html.
window.NISA_FLOW = {
  topicCards: [
    { icon: "📜", title: "Paper Roll", desc: "Request paper rolls" },
    { icon: "📱", title: "Terminal Help", desc: "Setup, errors, support" }
  ],

  // Bottom quick taskbar is intentionally disabled. Use Home button to show topic cards.
  quickReplies: [],

  onboarding: {
    welcome: "Welcome 🙂. I am your personal Chat Service assistant, my name is NISA and I am glad to attend to all your queries.",
    availability: "Our chatbot services are available 24 hours a day.",
    disclaimerHtml: "Disclaimer:<br>By providing my personal data, I hereby declare that I have read, understood and agreed to the terms of the <a href="https://my.nttdatapay.com/en/privacy-notice" target="_blank" rel="noopener noreferrer" style="color:#88ddff;text-decoration:underline;font-weight:700;">Privacy Notice</a>.",
    askPhone: "Before we get started, please enter your phone number so that we have a record.\n\n💡 The phone number should be between 9-11 digits.\nExample: 0121234567",
    askName: "Thanks. May I have your name please?"
  },

  paperRoll: {
    intro: "Sure, I'll need a few details to place your order though.",
    video: "🎥 Need Help? Watch our video tutorial on how to place an order using the chatbot:\nhttps://www.youtube.com/watch?v=kO1Q3Kh854w",
    askSerial: "Before we proceed, can I have your Terminal Serial Number?",
    serialHint: "💡 You can find it at the back of your terminal.\n💡 Please enter only one (1) Terminal Serial Number – no need to type 'SN'.\n💡 Do not enter multiple serial numbers in one request.\nExample: xxx-xxx-xxx or Nxxxxxxxxxx"
  }
};
