import CalculatorModel from "../CalculatorModel/index.js";

class CalculatorController {
  getCalculationFromSymbol(event) {
    const node = event.target;
    const symbol = node.dataset.value;

    CalculatorModel.calculateFromSymbol({ symbol });
  }
}

export default new CalculatorController();
