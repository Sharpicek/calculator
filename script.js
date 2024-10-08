let firstNumber = "";
let secondNumber = ""; 
let resultPressed = false;
let operator = "";
const allButtons = document.querySelectorAll("button");
const display = document.getElementById("display-text");

function operate(firstNum, operatorChoice, secondNum) {
    let result;
    switch (operatorChoice) {
        case " + ":
            result = firstNum + secondNum;
            break;
        case " - ":
            result = firstNum - secondNum;
            break;
        case " x ":
            result = firstNum * secondNum;
            break;
        case " / ":
            if (secondNum === 0) {
                firstNumber = "";
                secondNumber = ""; 
                resultPressed = false;
                operator = "";
                return updateDisplay(null, "error");
            } else {
                result = firstNum / secondNum
            }
    }
    result = Math.round((result + Number.EPSILON) * 100) / 100;
    if ((result + "").length >= 12) {
        updateDisplay(result, "overflow");
        firstNumber = "";
    } else {
        updateDisplay(result, "result");
        firstNumber = result;
    }
    operator = "";
    secondNumber = "";
    resultPressed = true;
    console.log(result);
    return result;
};

function updateDisplay(value, type) {
    if (type == "num") {
        display.textContent = firstNumber + operator + secondNumber;        
    } else if (type == "result") {
        display.textContent = value;
    } else if (type == "clear") {
        display.textContent = 0;
    } else if (type == "overflow") {
        display.textContent = "OVERFLOW :("
    } else if (type == "error") {
        display.textContent = "BOOM!"
    } else if (display.textContent.length >= 10) {
        display.textContent = "";
        display.textContent = secondNumber;
    } else {
        display.textContent = secondNumber;
    }
};

function checkLength(num) {
    if (display.textContent.length >= 13 && secondNumber != "") return;
    if (resultPressed && operator == "") {
        clearCalculator();
        storeValue(num, "firstNumber");
    } else if (operator == "" && !resultPressed) {
        if (firstNumber.length >= 10) return;
        storeValue(num, "firstNumber");
    } else {
        if (firstNumber.length >= 10) {
            storeValue(num);
        } else {
            storeValue(num, "secondNumber");
        }
    }
};

function storeValue(num, type) {
    if (type == "firstNumber") {
        firstNumber += num; 
        updateDisplay(firstNumber, "num");
    } else if (type == "secondNumber") {
        secondNumber += num;
        updateDisplay(secondNumber, "num");
    } else {
        secondNumber += num;
        updateDisplay(secondNumber);
    }
}

function decimalPoint() {
    const containsDecimal = display.textContent.split("").includes(".");
    if (operator == "" && !containsDecimal) {
        firstNumber += ".";
    } else if (!containsDecimal) {
        secondNumber += ".";
    }
};

function clearCalculator() {
    firstNumber = "";
    secondNumber = ""; 
    resultPressed = false;
    operator = "";
    updateDisplay(null, "clear");
}

for (let i = 0; i < 17; i++) {
allButtons[i].addEventListener("click", (button) => {
    const value = button.target.value;
    if (Number.isFinite(parseInt(value))) {
        checkLength(value);
    } else if (value == "C") {
        clearCalculator();
    } else if (value == "=") {
        if (secondNumber == "") return; // When = is pressed and second number has no value, do nothing
        operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
    } else if (value == ".") {
        decimalPoint();
    } else {
        if (firstNumber == "") return;
        operator = value;
        updateDisplay(value, "num");
    }
});
};
