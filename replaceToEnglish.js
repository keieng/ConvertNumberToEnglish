import { onesPlaceWord, specialWord, tensPlaceWord } from "./replaceWord";

export const integerToEnglish = (numberArray) => {
  const words = [];
  const commaWords = ["", "thousand", "million", "billion"];
  if (numberArray.length === 1 && numberArray[0] === 0) {
    words.unshift(onesPlaceWord(numberArray[0]));
  } else {
    numberArray.forEach((v, i) => {
      let word = "";
      const commaWordsIndex = Math.floor(i / 3);
      const commaWord = commaWords[commaWordsIndex];
      // commaWordの連続の判定
      if (commaWordsIndex >= 2)
        words[words.length - 1] === commaWords[commaWordsIndex - 1]
          ? words.pop()
          : "";
      switch (i % 3) {
        case 0:
          if (numberArray[i + 1] === 1) {
            word += specialWord(numberArray[i + 1] * 10 + numberArray[i]);
            word += commaWord === "" ? "" : " " + commaWord;
            break;
          }
          if (v !== 0) {
            word += onesPlaceWord(v);
            word += commaWord === "" ? "" : " " + commaWord;
          } else {
            word += commaWord === "" ? "" : commaWord;
          }
          break;
        case 1:
          if (v !== 0) v === 1 ? "" : (word += tensPlaceWord(v));
          break;
        case 2:
          if (v !== 0) word += onesPlaceWord(v) + " hundred";
          break;
        default:
          break;
      }
      // if (word === words[words.length - 1])
      if (word !== "") words.unshift(word);
    });
  }

  return words;
};

export const decimalToEnglish = (numberArray) => {
  const words = [];

  numberArray.forEach((v) => {
    const word = onesPlaceWord(v);
    words.unshift(word);
  });

  return words;
};
