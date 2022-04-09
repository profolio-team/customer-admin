export function toBase64(plainText: string): string {
  const buff = Buffer.from(plainText, "utf-8");
  const base64 = buff.toString("base64");
  return base64;
}

export function fromBase64(base64: string): string {
  const buff = Buffer.from(base64, "base64");
  const plainText = buff.toString("utf-8");
  return plainText;
}
