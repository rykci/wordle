import wordList from "./wordList.json";

const words = wordList.map((wordObj) => wordObj.word);

export const getRandomWord = () => {
  const index = Math.floor(Math.random() * wordList.length);
  return words[index];
};

export const checkWord = (word) => {
  return words.includes(word.toLowerCase());
};
