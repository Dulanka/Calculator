document.addEventListener('DOMContentLoaded', function() {
    const screen = document.querySelector('.screen');
    const buttons = document.querySelectorAll('.calc-button');

    let currentOperand = '';
    let previousOperand = '';
    let operation = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleInput(button.textContent.trim());
        });
    });

    function handleInput(input) {
        if (input === 'c') {
            clear();
        } else if (input === '=') {
            compute();
        } else {
            if (isOperation(input)) {
                if (currentOperand !== '') {
                    compute();
                }
                operation = input;
                previousOperand = currentOperand;
                currentOperand = '';
            } else {
                currentOperand += input;
            }
            updateScreen();
        }
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operation = '';
        updateScreen();
    }

    function compute() {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            result = 'Error';
        } else {
            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        result = 'Error';
                    } else {
                        result = prev / current;
                    }
                    break;
                default:
                    result = 'Error';
            }
        }
        currentOperand = result.toString();
        previousOperand = '';
        operation = '';
        updateScreen();
    }

    function updateScreen() {
        screen.textContent = currentOperand || '0';
    }

    function isOperation(input) {
        return ['+', '-', '*', '/'].includes(input);
    }
});
