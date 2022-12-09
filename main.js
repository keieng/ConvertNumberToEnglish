import { decimalToEnglish, integerToEnglish } from "./replaceToEnglish";

var lines = [];
var reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
reader.on("line", function (line) {
  lines.push(line);
});
reader.on("close", function () {
  main(lines[0]);
});
export const main = (lineInput) => {
  try {
    // 入力を受け取る
    const line = lineInput;
    if (line == null) throw "nullException";
    const input = line.trim();
    if (input == "") throw "blankException";
    // 0以上の数値以外エラー処理
    const isOverZero = Math.sign(input) === 1 || Math.sign(input) === 0;
    if (!isOverZero) throw "notNumberException";

    // // 入力を小数点前後で配列に格納
    const inputPointSplit = input.split(".");

    // 小数点以下が存在するかの判定
    const isDecimal = inputPointSplit.length === 2;

    // 整数部分を一文字づつ配列に格納
    const integerTexts = [...inputPointSplit[0]];

    // 整数部分を数値の配列にして格納
    const integerNumbers = [];
    integerTexts.forEach((v) => {
      // 下の位からの配列にするため先頭に追加
      integerNumbers.unshift(Number(v));
    });
    // 数値を英語に変換
    const integerEnglish = integerToEnglish(integerNumbers);
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
        // 下の位からの配列にするため先頭に追加
        decimalNumbers.unshift(Number(v));
      });
      // 数値を英語に変換
      const decimalEnglish = decimalToEnglish(decimalNumbers);
      words.push("point", ...decimalEnglish);
    }

    const outputText = words.join(" ");
    // return console.log(outputText);
    return outputText;
  } catch (error) {
    // return console.log(-1);
    return -1;
  }
};
