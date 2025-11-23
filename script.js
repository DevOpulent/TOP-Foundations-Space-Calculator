//Object Values
const calculator = {
    displayValue: '0',
    firstOperand: null,
    WaitingForSecondOperand: false,
    operator: null,
};

const updateDisplay = () => {
    const display = document.querySelector('.screen')
    display.value = calculator.displayValue
};
updateDisplay();

//Handle Key Press
const keys = document.querySelector('.keys')
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

//Input Digit
const inputDigit = (digit) => {
    const {displayValue, WaitingForSecondOperand} = calculator;

    if(WaitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.WaitingForSecondOperand = false 
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
};

// Input Decimal
const inputDecimal = (dot) => {
    if(calculator.WaitingForSecondOperand === true) {
        calculator.displayValue ='0.';
        calculator.WaitingForSecondOperand = false;
        return;
    }
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
};

//Handle Operators
const handleOperator = (nextOperator) => {
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue)

    if(operator && calculator.WaitingForSecondOperand) {
        calculator.operator = nextOperator;
        return
    }
    if(firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator)

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.WaitingForSecondOperand = true;
    calculator.operator = nextOperator;
};

// Calculator logic
const calculate = (firstOperand, secondOperand, operator) => {
    if(operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand;
};

// Reset calculator (AC)
const resetCalculator = () => {
    calculator.displayValue ='0';
    calculator.firstOperand = null;
    calculator.WaitingForSecondOperand = false;
    calculator.operator = null;
};



