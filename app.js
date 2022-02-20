const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
const displayField = document.querySelector("[data-display]");
let currentValue = "";
let nextValue = "";

class Calculator {
  constructor(currentValue, nextValue) {
    this.currentValue = currentValue;
    this.nextValue = nextValue;
    // displayField.value = nextValue;
    this.clear();
  }

  clear = () => {
    displayField.value = "";
    currentValue = "";
    nextValue = "";
    this.operation = undefined;
  };

  appendNumber = (number) => {
    if (number === "." && currentValue.includes(".")) return;
    currentValue += number;
    displayField.value = currentValue;
  };

  chooseOperation = (operation) => {
    if (currentValue === "") return;
    if (currentValue !== "") {
      this.compute();
    }
    this.operation = operation;
    // console.log(currentValue);
    nextValue = currentValue;
    currentValue = "";
    // nextValue = "";
  };

  compute = () => {
    let computation;
    const part2 = parseFloat(currentValue);
    const part1 = parseFloat(nextValue);
    console.log("part 1 " + part1);
    console.log("part 2 " + part2);
    if (isNaN(part1) || isNaN(part2)) return;
    switch (this.operation) {
      case "plus":
        computation = part1 + part2;
        break;
      case "minus":
        computation = part1 - part2;
        break;
      case "multiply":
        computation = part1 * part2;
        break;
      case "division":
        computation = part1 / part2;
        break;
      default:
        return;
    }
    currentValue = computation;
    console.log(currentValue);
    this.operation = undefined;
    nextValue = "";
    this.updateDisplay();
  };

  updateDisplay() {
    displayField.value = this.getDisplayNumber(currentValue);
    if (this.operation != null) {
      currentValue = `${this.getDisplayNumber(currentValue)} ${this.operation}`;
    } else {
      nextValue = "";
    }
  }

  getDisplayNumber(number) {
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return "";
    return floatNumber.toLocaleString("en");
  }
}

const calculator = new Calculator(currentValue, nextValue);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    console.log(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.id);
    // nextValue = currentValue;
    // console.log(nextValue);
    // console.log(currentValue);
    // calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  //   calculator.updateDisplay();
});
