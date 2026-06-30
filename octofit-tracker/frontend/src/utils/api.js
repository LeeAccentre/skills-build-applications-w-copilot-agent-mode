export function getApiBaseUrl() {
  if (import.meta.env.DEV) {
    return '';
  }

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return window.location.origin;
}
