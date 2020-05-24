self.addEventListener("message", ({ data: { first, second, op } }) => {
  const resultFactory = {
    "+": (first, second) => +first + +second,
    "-": (first, second) => +first - +second,
    "*": (first, second) => +first * +second,
    "/": (first, second) => +first / +second,
    "^": (first, second) => Math.pow(+first, +second),
    to2: (first) => {
      const firstNum = +first;
      return firstNum.toString(2);
    },
    to10: (first) => +parseInt(first, 2),
  };

  const result = resultFactory[op](first, second);
  const operationString = `${first} ${op} ${second || ""} = ${result}`;

  console.log(operationString);
  console.log(result);
  self.postMessage({ result, operationString });
});
