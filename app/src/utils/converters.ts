export function toBase64(plainText: string) {
  return window.btoa(plainText);
}

export function fromBase64(base64: string) {
  return window.atob(base64);
}
