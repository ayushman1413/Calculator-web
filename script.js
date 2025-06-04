class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }
  // Calculator reset karne ke liye method
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }
  // Last digit delete karne ke liye method
    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }
  // Number ya dot add karne ke liye method
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number;
        }
    }
 // Operation select karne ke liye method (+, -, ×, ÷)
    chooseOperation(operation) {
        if (this.currentOperand === '0') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }
   // Actual calculation karne ka method
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
            // Operation ke hisaab se computation
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
                // Agar kuch match nahi hua to return
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }
  // Display number ko format karne ka method (comma ke sath)
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '0';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
 // Display update karne ke liye method
    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}
// DOM load hone ke baad event listeners attach karne ke liye
document.addEventListener('DOMContentLoaded', () => {
    const previousOperandElement = document.querySelector('.previous-operand');
    const currentOperandElement = document.querySelector('.current-operand');
    const numberButtons = document.querySelectorAll('.number');
    const operationButtons = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('.equals');
    const deleteButton = document.querySelector('.delete');
    const clearButton = document.querySelector('.clear');
   // Calculator object banaya
    const calculator = new Calculator(previousOperandElement, currentOperandElement);

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        });
    });

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
        });
    });

    equalsButton.addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
    });

    clearButton.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    });

    deleteButton.addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
    });

    document.addEventListener('keydown', event => {
        if (/[0-9]/.test(event.key)) {
            calculator.appendNumber(event.key);
        } else if (event.key === '.') {
            calculator.appendNumber('.');
        } else if (event.key === '+') {
            calculator.chooseOperation('+');
        } else if (event.key === '-') {
            calculator.chooseOperation('-');
        } else if (event.key === '*') {
            calculator.chooseOperation('×');
        } else if (event.key === '/') {
            calculator.chooseOperation('÷');
        } else if (event.key === 'Enter' || event.key === '=') {
            calculator.compute();
        } else if (event.key === 'Backspace') {
            calculator.delete();
        } else if (event.key === 'Escape') {
            calculator.clear();
        }
        calculator.updateDisplay();
    });
});