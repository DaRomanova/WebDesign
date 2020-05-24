class CalculatorModel {
  constructor() {
    this.firstNumber = "";
    this.secondNumber = "";
    this.operation = "";

    this.operationHistory = [];
    this.calculateWorker = new Worker("./js/calculateWorker.js");
    this.input = null;
    this.calculateWorker.addEventListener(
      "message",
      ({ data: { result, operationString } }) => {
        this.input.value = result;
        this.firstNumber = this.input.value;
        this.secondNumber = "";
        this.operation = "";

        this.operationHistory.push(operationString);
        this.renderHistory({ history: this.operationHistory });
      }
    );
    this.resultFactory = {
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
  }

  setInput({ input }) {
    this.input = input;
  }

  setRenderHistory({ render }) {
    this.renderHistory = render;
  }
  calculateFromSymbol({ symbol }) {
    switch (symbol) {
      case "c":
        this.input.value = "";
        break;
      case "+":
        this.firstNumber = this.input.value;
        this.input.value = "";
        this.operation = "+";
        break;
      case "-":
        this.firstNumber = this.input.value;
        this.input.value = "";
        this.operation = "-";
        break;
      case "/":
        this.firstNumber = this.input.value;
        this.input.value = "";
        this.operation = "/";
        break;
      case "*":
        this.firstNumber = this.input.value;
        this.input.value = "";
        this.operation = "*";
        break;
      case "^":
        this.firstNumber = this.input.value;
        this.input.value = "";
        this.operation = "^";
        break;
      case "=":
        this.secondNumber = this.input.value;
        this.calculateWorker.postMessage({
          first: this.firstNumber,
          second: this.secondNumber,
          op: this.operation,
        });
        break;
      case "to2":
        this.firstNumber = this.input.value;
        this.operation = "to2";
        this.calculateWorker.postMessage({
          first: this.firstNumber,
          op: this.operation,
        });
        break;
      case "to10":
        this.firstNumber = this.input.value;
        this.operation = "to10";
        this.calculateWorker.postMessage({
          first: this.firstNumber,
          op: this.operation,
        });
        break;
      default:
        this.input.value += symbol;
    }
  }
}

export default new CalculatorModel();
