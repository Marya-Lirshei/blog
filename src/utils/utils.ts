export function trimText(str: string): string {
  const text = str.slice(0, 40);
  return text + "...";
}
