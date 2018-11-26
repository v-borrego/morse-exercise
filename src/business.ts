import { morseAlphabet } from "./morse-alphabet";

export const validateInputMessage = (message: string): boolean =>
  message && message.length > 0
    ? !message
        .toLowerCase()
        .replace(/ /g, "")
        .split("")
        .some(x => !morseAlphabet[x])
    : false;
