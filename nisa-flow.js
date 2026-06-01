// NISA FLOW FILE
// Put this file in the same folder as index.html.
// Images should also be in the same folder unless you change the paths below.
//
// AI-worker-only alignment:
// - The frontend should not invent business/chat replies.
// - Normal conversation should be handled by the Worker AI controller.
// - Live Chat is only for restricted or account-specific actions.
window.NISA_FLOW = {
  topicCards: [
    {
      icon: "📜",
      title: "Paper Roll",
      desc: "Request paper rolls and ask questions without losing progress"
    },
    {
      icon: "📱",
      title: "Terminal Help",
      desc: "AI-assisted terminal troubleshooting and error message help"
    },
    {
      icon: "💬",
      title: "General Inquiries",
      desc: "Ask about PAYSYS services, payments, or chatbot help"
    }
  ],

  quickReplies: [],

  aiBehavior: {
    // Main alignment with index_NISA_AI_WORKER_ONLY_FIXED_v2.html
    // and worker_NISA_LAST_WORKING_AI_CONTROLLER_FIXED.js
    preferWorkerForReplies: true,
    preferDeepSeekAssistance: true,
    aiControllerOnly: true,
    noFrontendFakeReply: true,
    workerMustReturnReply: true,
    workerAction: "chat",
    requireWorkerDiagnostic: true,

    // Flow behavior
    allowFlowInterventionAnytime: true,
    clarifyIfUnclear: true,
    preserveFlowProgressOnQuestions: true,
    preserveUserWordingIfUnclear: true,
    takeoverTerminalHelp: true,
    takeoverPaperRollWhenHelpIsNeeded: true,

    // These flags are copied into context by the fixed index/Worker path.
    contextFlags: [
      "worker_priority=true",
      "ai_controller=true",
      "ai_must_answer=true",
      "no_frontend_fake_reply=true",
      "ask_clarify_if_unclear=true",
      "preserve_user_wording_if_unclear=true"
    ]
  },

  paperRoll: {
    intro: "Sure 😊 I can help with your paper roll request. I'll just need a few details first, and you can also ask me questions during the request without losing your progress.",
    askSerial: "First, may I have your Terminal Serial Number? If you are unsure where to find it, just ask and I will guide you.",
    actionHint: "If the merchant asks a follow-up question, gets confused, or needs clarification, continue helping inside the paper roll request and keep the request progress active.",
    clarifyHint: "If the merchant's answer is unclear, ask one short clarification question instead of assuming.",
    serialHints: [
      "💡 You can find it at the back of your terminal.",
      "💡 Please enter only one Terminal Serial Number.",
      "💡 No need to type 'SN'.",
      "Example: xxx-xxx-xxx or Nxxxxxxxxxx"
    ],
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
    serialGuideImage: "./serial-number-guide-1.png"
  },

  terminalHelp: {
    takeover: true,
    preferDeepSeek: true,
    aiControllerOnly: true,
    allowFollowUpQuestions: true,
    clarifyIfUnclear: true,
    preserveProgress: true,
    intro: "Sure. I can help directly with terminal issues here. Please describe the problem on the terminal, any error message shown, and what the merchant was trying to do. I should continue helping within Terminal Help instead of saying the flow is not ready.",
    actionHint: "If the merchant asks a follow-up question, is confused, or gives partial information, continue helping inside Terminal Help and ask one focused clarification question when needed.",
    examples: [
      "Terminal not powering on",
      "Battery or charging issue",
      "No line / network / SIM problem",
      "Printer or paper issue",
      "Card not detecting",
      "Settlement menu cannot be found",
      "Specific terminal error message troubleshooting"
    ],
    restrictedEscalations: [
      "refund",
      "settlement check",
      "void",
      "reversal",
      "transaction status",
      "chargeback",
      "account-specific check",
      "terminal replacement"
    ],
    escalationMessage: "Use Live Chat only for restricted or account-specific actions such as refund, settlement checking, void/reversal, transaction status, chargeback, account-specific confirmation, or terminal replacement."
  },

  generalInquiries: {
    aiControllerOnly: true,
    intro: "Sure. Please ask your question about PAYSYS services, payment terminals, or merchant payment topics. If your request is unclear, I will ask a short clarification question instead of assuming.",
    scope: "I can help with general PAYSYS, payment terminals, merchant payments, and chatbot navigation. I cannot perform refunds, settlement checks, transaction checks, void/reversal, chargeback, or account changes. For those, please use Live Chat. If your question is ambiguous, I should ask one focused clarification question before giving steps.",
    actionHint: "If the merchant is already in a running flow, continue helping within that flow first before redirecting to a different topic."
  }
};
