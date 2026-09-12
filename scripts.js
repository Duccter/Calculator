let btn = document.querySelector(".keyboard");

btn.addEventListener("click", (event) => {
    let target = event.target;

    if (target.id === "CE" && lastOperator !== "enter" && !isArithmeticOperator(lastInput)) {
        secondNumber = secondNumber.substring(0, secondNumber.length - 1);
        display.textContent = display.textContent.substring(0, secondNumber.length - 1);;
        return;
    }

    if (isArithmeticOperator(lastInput) && isArithmeticOperator(target.id)) return;

    else if  (lastInput === "enter" && target.id == "enter") return;

    else if (lastOperator === "enter" && isNumDot(target.id)) reset(target);

    else if (isNumDot(target.id)) {
        if (target.id === "decimal" && secondNumber.includes(".")) return;

        numberDot = target.textContent

        secondNumber += numberDot;
        display.textContent += numberDot;

    } else if (isArithmeticOperator(target.id)) {
        firstNumber = operate(currentOperator, firstNumber, +secondNumber);

        display.textContent = firstNumber;

        currentOperator = target.textContent;

        display.textContent += currentOperator;

        secondNumber = "";
        lastOperator = target.id;

    } else if (target.id == "enter") {
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

function reset(target) {
    firstNumber = 0;
    secondNumber = target.textContent;
    lastOperator = null;
    lastInput = null;
    currentOperator = "+";
    
    display.textContent = secondNumber;
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