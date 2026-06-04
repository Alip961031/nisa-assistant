// NISA Support HUB dashboard config
// Upload this file beside hub/index.html and update WORKER_URL if your Worker route changes.
window.NISA_HUB_CONFIG = {
  WORKER_URL: "https://nisa-deepseek-proxy.kgurun88.workers.dev",
  DASHBOARD_TITLE: "NISA Support HUB",
  LIVECHAT_PROVIDER: "Cloudflare",
  POWERED_BY: "DeepSeek AI and Cloudflare",
  AUTO_INIT_TABLES: true,
  POLL_LIVECHAT_MS: 4000,
  POLL_TEAM_MS: 8000,
  DEFAULT_AGENT_ID: "minifid-a",
  DEFAULT_AGENT_NAME: "MINIFID-A",
  DEFAULT_AGENT_LANGUAGE: "English",
  ENABLE_WORKER_BRIDGE: true,
  ENABLE_AI_BUTTONS: true,
  ENABLE_LIVECHAT_POLLING: true,
  ENABLE_DASHBOARD_BOOTSTRAP: true
};
