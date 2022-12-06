var lines = [];
var reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
reader.on("line", function (line) {
  lines.push(line);
});
reader.on("close", function () {
  // 入力を受け取る
  const input = lines[0];
  // // 入力を小数点前後で配列に格納
  const inputPointSplit = input.split(".");

  // 小数点以下が存在するかの判定
  const isDecimal = inputPointSplit.length === 2;

  // 整数部分を一文字づつ配列に格納
  const integerTexts = [...inputPointSplit[0]];

  // 整数部分を数値の配列にして格納
  const integerNumbers = [];
  integerTexts.forEach((v) => {
    integerNumbers.push(Number(v));
  });
  // 下の位からの配列にする
  integerNumbers.reverse();
  const integerEnglish = integerToEnglish(integerNumbers);
  integerEnglish.reverse();
  integerEnglish[0] =
    integerEnglish[0].charAt(0).toUpperCase() + integerEnglish[0].slice(1);

  const words = [];
  words.push(...integerEnglish);

  if (isDecimal) {
    // 小数点以下を一文字づつ配列に格納
    const decimalTexts = [...inputPointSplit[1]];
    // 小数点以下を数値の配列にして格納
    const decimalNumbers = [];
    decimalTexts.forEach((v) => {
      decimalNumbers.push(Number(v));
    });
    // 下の位からの配列にする
    decimalNumbers.reverse();

    const decimalEnglish = decimalToEnglish(decimalNumbers);
    decimalEnglish.reverse();
    words.push("point", ...decimalEnglish);
  }

  return console.log(...words);
});

const integerToEnglish = (numberArray) => {
  const words = [];
  const commaWords = ["", "thousand", "million", "billion"];
  if (numberArray.length === 1 && numberArray[0] === 0) {
    words.push(onesPlaceWord(numberArray[0]));
  } else {
    numberArray.forEach((v, i) => {
      let word = "";
      const commaWordsIndex = Math.floor(i / 3);
      const commaWord = commaWords[commaWordsIndex];
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
      if (word !== "") words.push(word);
    });
  }

  return words;
};

const decimalToEnglish = (numberArray) => {
  const words = [];

  numberArray.forEach((v) => {
    const word = onesPlaceWord(v);
    words.push(word);
  });

  return words;
};

/**
 *
 * @param {一の位の数字} number
 * @returns 一の位の数字を英語に変換
 */
const onesPlaceWord = (number) => {
  switch (number) {
    case 0:
      return "zero";
      break;
    case 1:
      return "one";
      break;
    case 2:
      return "two";
      break;
    case 3:
      return "three";
      break;
    case 4:
      return "four";
      break;
    case 5:
      return "five";
      break;
    case 6:
      return "six";
      break;
    case 7:
      return "seven";
      break;
    case 8:
      return "eight";
      break;
    case 9:
      return "nine";
      break;
    default:
      break;
  }
};

/**
 *
 * @param {十の位の数字} number
 * @returns 十の位の数字を英語に変換
 */
const tensPlaceWord = (number) => {
  switch (number) {
    case 2:
      return "twenty";
      break;
    case 3:
      return "thirty";
      break;
    case 4:
      return "forty";
      break;
    case 5:
      return "fifty";
      break;
    case 6:
      return "sixty";
      break;
    case 7:
      return "seventy";
      break;
    case 8:
      return "eighty";
      break;
    case 9:
      return "ninety";
      break;
    default:
      break;
  }
};

/**
 *
 * @param {10~19の数字} number
 * @returns 10~19の数字を英語に変換
 */
const specialWord = (number) => {
  switch (number) {
    case 10:
      return "ten";
      break;
    case 11:
      return "eleven";
      break;
    case 12:
      return "twelve";
      break;
    case 13:
      return "thirteen";
      break;
    case 14:
      return "fourteen";
      break;
    case 15:
      return "fifteen";
      break;
    case 16:
      return "sixteen";
      break;
    case 17:
      return "seventeen";
      break;
    case 18:
      return "eighteen";
      break;
    case 19:
      return "nineteen";
      break;
    default:
      break;
  }
};
