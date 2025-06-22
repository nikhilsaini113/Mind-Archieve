export function random(len: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const result = [];
  const randomValues = new Uint32Array(len);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < len; i++) {
    result.push(chars[randomValues[i] % chars.length]);
  }

  return result.join("");
}
