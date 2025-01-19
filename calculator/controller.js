// buttons controller
function addLetterToTheOperation(letter) {
    document.getElementById('display-area').value += letter;
}

// remove last letter in operation
function eraseLastLetter() {
    var currentOperation = document.getElementById('display-area').value;
    var newOperation = "";
    for(let i = 0 ; i < currentOperation.length - 1 ; i++) {
        newOperation += currentOperation[i];
    }
    document.getElementById('display-area').value = newOperation;
}

// remove all letters in operation
function clearOperation() {
    document.getElementById('display-area').value = '';
}


//get final resulte
function getResulte() {
    var operation = document.getElementById('display-area').value;
    if(checkExpression() == false/* || isTrueOperation() == false*/) {
        alert("You have entered an incorrect operation......");
        return;
    }

    split();
}