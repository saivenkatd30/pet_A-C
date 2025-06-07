const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let operator = '';
let firstOperand = '';
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('clear')) {
            currentInput = '';
            operator = '';
            firstOperand = '';
            display.textContent = '0';
            resultDisplayed = false;
        } else if (button.classList.contains('operator')) {
            if (currentInput !== '') {
                if (firstOperand === '') {
                    firstOperand = currentInput;
                    operator = value;
                    currentInput = '';
                } else if (operator && currentInput !== '') {
                    // Chain operations
                    firstOperand = operate(firstOperand, currentInput, operator);
                    operator = value;
                    currentInput = '';
                    display.textContent = firstOperand;
                } else {
                    operator = value;
                }
            } else if (firstOperand !== '') {
                operator = value;
            }
        } else if (button.classList.contains('equal')) {
            if (firstOperand !== '' && operator && currentInput !== '') {
                const result = operate(firstOperand, currentInput, operator);
                display.textContent = result;
                currentInput = '';
                firstOperand = result;
                operator = '';
                resultDisplayed = true;
            }
        } else {
            // Number or dot
            if (resultDisplayed) {
                currentInput = '';
                resultDisplayed = false;
            }
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});

function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return (a + b).toString();
        case '-': return (a - b).toString();
        case '*': return (a * b).toString();
        case '/': return b !== 0 ? (a / b).toString() : 'Error';
        default: return b.toString();
    }
}