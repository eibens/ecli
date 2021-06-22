import emoji from "../emoji.ts";

export function Emoji(name: keyof typeof emoji) {
  return emoji[name];
}
