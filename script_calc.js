const tela = document.querySelector(".tela");
let buffer = '0';
let previousOperator = null;
let runningTotal = 0;

function buttonClick(value){
    if(value.length > 1){
        // console.log(`NaN : ${value}`);
        return;
    } else if(isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    console.log(typeof(buffer));
    rerender();
}

function handleNumber(value){
    if (buffer === '0'){
        buffer = value;
    } else {
        buffer += value;
    }
}
function flushOperation (intBuffer){
    switch(previousOperator){
        case '+': 
            runningTotal += intBuffer;
            break;
        case '÷':
            runningTotal /= intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case '×':
            runningTotal *= intBuffer;
            break;
    }
}

function equals (){
    if(previousOperator === null){
        
    } else {
        flushOperation(parseInt(buffer));
    }
    // console.log(runningTotal);
    buffer = `${runningTotal}`;
    // console.log(typeof(buffer));
    runningTotal = 0;
    rerender();
    
}

function handleMath(value){
    if (buffer === '0'){return;}
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

function handleSymbol (value) {
    switch(value){
        case 'C':
            buffer = '0';
            break;
        case '=':
            equals();
            break;
        case '←':
            if(buffer.length === 1 ){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '÷':
        case '+':
        case '-':
        case '×':
            handleMath(value);
            break;
        
    }
}

function rerender() {
    tela.innerText = buffer;
}


function init (){
    document.querySelector('.calc').addEventListener('click', function (event){
        buttonClick(event.target.innerText);
    });
}

init();