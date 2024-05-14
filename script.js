const result = document.querySelector(".result")
const buttons = document.querySelectorAll(".buttons button")

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateresult(originClear = false) { //por padrão o argumento é passado implicitamente como (originClear = false), caso queira que seja true, é necessário passar explicitamente
    if (originClear == false) {//se for false (não é clear) apenas troca . e ,
        result.innerText = currentNumber.replace(".", ",");
    } else { // se for true (é clear) é 0
        result.innerText = 0
    }
}

function addDigit(digit) {
    //primeiro faz o chech se é o mesmo tipo, nesse caso string, e se é uma virgula. Também checa se já existe uma virgula e se não é o valor atual 
    if (digit === "," && (currentNumber.includes(",") || !currentNumber))
        return;// apenas sai da função caso não cumpra os requisitos
    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit //concatena um número no outro
    }
    updateresult();
}

function setOperator(newOperator) {
    if (currentNumber) {
        calculate();

        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }
    operator = newOperator;
}

function calculate() {
    if (operator === null || firstOperand === null) return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break;
        case "x":
            resultValue = firstOperand * secondOperand;
            break
        case "/":
            resultValue = firstOperand / secondOperand;
            break;
        default: return;
    }

    if (resultValue.toString().split(".")[1]?.lenght > 5) { //o número não pode ser maior que 5 casas decimais
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }
    operator = null;
    firstOperand = null;
    restart = true;
    percentageValue = null;
    updateresult();
}

function clearCalculator() {
    currentNumber = "";
    firstOperand = null;
    operator = null;
    updateresult(true);

}

function setPorcentage(){
let result = parseFloat(currentNumber)/100;

if (["+", "-"].includes(operator)){
    result = result *(firstOperand || 1);
}
if (result.toString().split(".")[1]?.length>5){
    result = result.toFixed(5).toString();
}

currentNumber = result.toString();
updateresult();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;

        if (/^[0-9,]+$/.test(buttonText)) { // se o botão de for de 0 à 9 ou virgula, add o digito no resultado
            addDigit(buttonText)
        } else if (["+", "-", "x", "/"].includes(buttonText)) {//verifica se o botão pressionado é um operator
            setOperator(buttonText)
        } else if (buttonText === "=") {
            calculate();
        } else if (buttonText === "C") {
            clearCalculator()
        } else if (buttonText === "+-") {
            currentNumber = (parseFloat(currentNumber || firstOperand) * -1).toString();
            updateresult();
        } else if (buttonText === "%") {
            setPorcentage();
        }
    })
})

