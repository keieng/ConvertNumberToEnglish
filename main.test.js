const main = require("./main");

test("整数のテスト", () => {
  expect(main("123")).toBe("One hundred twenty three");
});

test("小数点のテスト", () => {
  expect(main("12.12")).toBe("Twelve point one two");
});

test("数値以外のテスト", () => {
  expect(main("abc")).toBe(-1);
});

test("空文字のテスト", () => {
  expect(main("")).toBe(-1);
});

// 0が続く
test("0が続く", () => {
  expect(main("100000000")).toBe("One hundred million");
});

test("0が続く", () => {
  expect(main("100000000000")).toBe("One hundred billion");
});
