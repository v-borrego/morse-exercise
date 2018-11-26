import { morseAlphabet } from "./morse-alphabet";
import { LampState } from "./model";

type morseCode = "." | "-";

const mapCharacterToMorse = (character: string): morseCode[] =>
  (morseAlphabet[character] || "").split("");

const mapWordToMorse = (word: string): string[][] =>
  word.split("").map(mapCharacterToMorse);

const mapMessageToMorse = (message: string): string[][][] =>
  message
    .toLowerCase()
    .replace(/  +/g, " ")
    .split(" ")
    .map(mapWordToMorse);

const mapCodeToLampState = (code: morseCode): LampState[] => [
  {
    state: 1,
    time_units: code === "." ? 1 : 3
  }
];

const CODE_SEPARATOR: LampState = {
  state: 0,
  time_units: 1
};

const CHARACTER_SEPARATOR: LampState = {
  state: 0,
  time_units: 3
};

const WORD_SEPARATOR: LampState = {
  state: 0,
  time_units: 7
};

const mapMorseMessageToLampStateArray = (
  morseMessage: string[][][]
): LampState[] => {
  const result = morseMessage
    .map(words => {
      return words
        .map(character => {
          return character.map(mapCodeToLampState).reduce(reducerCodes);
        })
        .reduce(reducerCharacters);
    })
    .reduce(reducerWords);

  return result;
};

const reducer = (intercalateLamp: LampState) => (x, y) => [
  ...x,
  intercalateLamp,
  ...y
];

const reducerCodes = reducer(CODE_SEPARATOR);
const reducerWords = reducer(WORD_SEPARATOR);
const reducerCharacters = reducer(CHARACTER_SEPARATOR);

const mapMessageToLampStateArray = (message: string): LampState[] =>
  mapMorseMessageToLampStateArray(mapMessageToMorse(message));

const validateInputMessage = (message: string): boolean =>
  message && message.length > 0
    ? !message
        .toLowerCase()
        .replace(/ /g, "")
        .split("")
        .some(x => !morseAlphabet[x])
    : false;

export { mapMessageToMorse, mapMessageToLampStateArray, validateInputMessage };
