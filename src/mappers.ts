import {
  morseAlphabet,
  LAMP_CODE_SEPARATOR,
  LAMP_WORD_SEPARATOR,
  LAMP_CHARACTER_SEPARATOR
} from "./morse-alphabet";

import { LampState, morseCode } from "./model";

const mapCharacterToMorse = (character: string): morseCode[] =>
  (morseAlphabet[character] || "").split("");

const mapWordToMorse = (word: string): string[][] =>
  word.split("").map(mapCharacterToMorse);

const mapMessageToMorseArray = (message: string): string[][][] =>
  message
    .toLowerCase()
    .trim()
    .replace(/  +/g, " ")
    .split(" ")
    .map(mapWordToMorse);

const mapCodeToLampState = (code: morseCode): LampState[] => [
  {
    state: 1,
    time_units: code === "." ? 1 : 3
  }
];

const mapMorseCharactersToLampState = (character: string[]): LampState[] =>
  character.map(mapCodeToLampState).reduce(reducerCodeSeparator);

const mapMorseWordsToLampState = (words: string[][]): LampState[] =>
  words.map(mapMorseCharactersToLampState).reduce(reducerCharacterSeparator);

const mapMorseArrayToLampStateArray = (
  morseMessage: string[][][]
): LampState[] =>
  morseMessage.map(mapMorseWordsToLampState).reduce(reducerWordSeparator);

const reducer = (intercalateLamp: LampState) => (x, y) => [
  ...x,
  intercalateLamp,
  ...y
];

const reducerCodeSeparator = reducer(LAMP_CODE_SEPARATOR);
const reducerWordSeparator = reducer(LAMP_WORD_SEPARATOR);
const reducerCharacterSeparator = reducer(LAMP_CHARACTER_SEPARATOR);

const mapMessageToLampStateArray = (message: string): LampState[] =>
  mapMorseArrayToLampStateArray(mapMessageToMorseArray(message));

export { mapMessageToLampStateArray };
