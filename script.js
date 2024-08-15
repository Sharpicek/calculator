let firstNumber = "";
let secondNumber = ""; 
let resultPressed = "no";
let fillOnlySecondNumber = "no";
let operator;
const allButtons = document.querySelectorAll("button");
const display = document.getElementById("display-text");

function operate(firstNumber, operator, secondNumber) {
    let result;
    switch (operator) {
        case " + ":
            result = firstNumber + secondNumber;
            break;
        case " - ":
            result = firstNumber - secondNumber;
            break;
        case " x ":
            result = firstNumber * secondNumber;
            break;
        case " / ":
            result = firstNumber / secondNumber;
            break;
    }
    updateDisplay(result, "result")
    operator = undefined;
    firstNumber = result;
    secondNumber = "";
    resultPressed = "yes";
    fillOnlySecondNumber = "yes";
    console.log(result);
    return result;
};

function updateDisplay(value, type) {
    if (type == "num1") {
        display.textContent = value;        
    } else if (type == "operator") {
        display.textContent += value;
    } else if (type == "num2") {
        display.textContent += getLastDigit(value);
    } else if (type == "result") {
        display.textContent = value;
    } else {
        display.textContent = 0;
    }
};

function storeNumber(num) {
    if (resultPressed == "yes" && fillOnlySecondNumber == "no") {
        clearCalculator();
        firstNumber += num; 
        updateDisplay(num, "num1");
    } else if (operator == undefined && fillOnlySecondNumber == "no") {
        firstNumber += num; 
        updateDisplay(firstNumber, "num1");
    } else {
        secondNumber += num;
        updateDisplay(secondNumber, "num2");
    } 
    console.log(firstNumber);
};

function clearCalculator() {
    firstNumber = "";
    secondNumber = ""; 
    resultPressed = "no";
    fillOnlySecondNumber = "no";
    operator = undefined;
    updateDisplay();
}

for (let i = 0; i < 17; i++) {
allButtons[i].addEventListener("click", (button) => {
    const value = button.target.value;
    if (Number.isFinite(parseInt(value))) {
        storeNumber(value);
    } else if (value == "C") {
        clearCalculator();
    } else if (value == "=") {
        if (secondNumber == "") return; // When = is pressed and second number has no value, do nothing
        operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
    } else if (value == ".") {
        console.log(value)
    } else {
        updateDisplay(value, "operator");
        operator = value;
    }
});
};

function getLastDigit(num) {
    return +(num + '').slice(-1);
};
