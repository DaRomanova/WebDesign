import CalculatorModel from "../CalculatorModel/index.js";
import CalculatorController from "../CalculatorController/index.js";

export class CalculatorView {
  constructor() {
    this.buttons = document.querySelectorAll("button.calc-btn");
    this.input = document.getElementById("field");
    this.history = document.getElementById("history");
    this.initHandleBtnClick();
    CalculatorModel.setInput({ input: this.input });
    CalculatorModel.setRenderHistory({ render: this.renderHistory });
  }

  renderHistory({ history: historyContent }) {
    console.log(this.history);
    document.getElementById("history").innerHTML = historyContent.join("<br>");
  }

  initHandleBtnClick() {
    this.buttons.forEach((btn) =>
      btn.addEventListener(
        "click",
        CalculatorController.getCalculationFromSymbol
      )
    );
  }
}
