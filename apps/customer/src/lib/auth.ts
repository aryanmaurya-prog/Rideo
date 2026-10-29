export const AUTH_STATE_EVENT = 'rideo-auth-change';

export function notifyAuthStateChanged() {
  window.dispatchEvent(new Event(AUTH_STATE_EVENT));
}
