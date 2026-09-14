let btn = document.querySelector(".keyboard");

btn.addEventListener("click", (event) => {
    let target = event.target;

    if (!(isArithmeticOperator(target.id) || isNumDot(target.id) || target.id == "AC" || target.id == "CE" || target.id == "enter")) return;

    if (target.id === "AC") {
        reset();
        display.textContent = "";
        return;
    }

    if (target.id === "CE") {
        if (isArithmeticOperator(lastInput)) {
            secondNumber = String(firstNumber);
            firstNumber = 0;
            currentOperator = "+";
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);
            
        } else {
            lastInput = secondNumber.at(-1);
            secondNumber = secondNumber.substring(0, secondNumber.length - 1);
            display.textContent = display.textContent.substring(0, display.textContent.length - 1);

        }
        lastInput = display.textContent.at(-1);
        return;
    }

    if  (target.id === "enter" && lastInput === "enter") return;

    if (lastInput === "enter" && isNumDot(target.id)) {
        reset();
        secondNumber = target.textContent;
        display.textContent = secondNumber;
    }

    else if (isNumDot(target.id)) {
        if (target.id === "decimal" && secondNumber.includes(".")) return;

        let numberDot = target.textContent;

        secondNumber += numberDot;
        display.textContent += numberDot;

    } else if (isArithmeticOperator(target.id)) {

        if (isArithmeticOperator(lastInput)) return;

        firstNumber = operate(currentOperator, firstNumber, +secondNumber);

        display.textContent = firstNumber;
        currentOperator = target.textContent;
        display.textContent += currentOperator;

        secondNumber = "";
        lastOperator = target.id;

    } else if (target.id == "enter" && !isArithmeticOperator(lastInput)) {
        secondNumber = String(operate(currentOperator, firstNumber, +secondNumber));
        firstNumber = 0;
        
        display.textContent = secondNumber;

        currentOperator = "+";
        lastOperator = target.id;
    } 
    
    lastInput = target.id;
});

function operate(operator, firstNum, secondNum) {
    let res
    switch (operator) {
        case "+":
            res = firstNum + secondNum;
            break;
        case "-":
            res = firstNum - secondNum;
            break;
        case "x":
            res = firstNum * secondNum;
            break;
        case "/":
            res = firstNum / secondNum;
            break;
        default:
            res = "How Did You Get Here?";
            break;
    }

    if (String(res).includes(".")) res = Math.round(res * 10) / 10;

    return res;
}

function reset() {
    firstNumber = 0;
    secondNumber = "";
    lastOperator = null;
    lastInput = null;
    currentOperator = "+";
}

function isNumDot(item) {
    return numericaldot.includes(item);
}

function isArithmeticOperator(item) {
    return ArithmeticOperators.includes(item);
}

let firstNumber = 0;
let secondNumber = "";
let currentOperator = "+";
let lastOperator = null;
let lastInput = null;
let display = document.querySelector(".screen");
let numericaldot = "1234567890decimal";
let ArithmeticOperators = "+-x/";