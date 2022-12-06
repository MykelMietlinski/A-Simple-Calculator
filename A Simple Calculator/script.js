class Calculator 
{

    constructor(lastOperandTextElement, currentOperandTextElement) 
    {
        this.lastOperandTextElement = lastOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() 
    {
        this.currentOperand = ''
        this.lastOperand = ''
        this.operation = undefined
    }
    delete() 
    {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number)
    {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }   
    chooseOperation(operation)
    {
        if(this.currentOperand === '') return
        if(this.lastOperand !== '')
        {
            this.compute()
         }
        this.operation = operation
        this.lastOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute()
    {
        let computation
        const last = parseFloat(this.lastOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(last) || isNaN(current)) return
        switch(this.operation) 
        {
            case '+':
                computation = last + current
                break
            case '-':
                computation = last - current
                break
            case '*':
                computation = last * current
                break
            case '÷':
                computation = last / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.lastOperand = ''
    }
    getDisplayNumber(number)
    {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) 
        {
            integerDisplay = ''
        }
        else
        {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null)
        {
            return `${integerDisplay}.${decimalDigits}`        
        }
        else
        {
            return integerDisplay
        }
    }
    updateDisplay()
    {
       this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
       if (this.operation != null)
       {
           this.lastOperandTextElement.innerText = `${this.getDisplayNumber(this.lastOperand)} ${this.operation}`
       } 
       else
       {
           this.lastOperandTextElement.innerText = ''
       }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const lastOperandTextElement = document.querySelector('[data-last-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const calculator = new Calculator(lastOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => 
{
    button.addEventListener('click', () => 
    {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => 
{
    button.addEventListener('click', () => 
    {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})    
    
equalsButton.addEventListener('click',button => 
{
        calculator.compute()
        calculator.updateDisplay()
})

allClearButton.addEventListener('click',button => 
{
        calculator.clear()
        calculator.updateDisplay()
})

deleteButtons.addEventListener('click',button => 
{
        calculator.delete()
        calculator.updateDisplay()
})