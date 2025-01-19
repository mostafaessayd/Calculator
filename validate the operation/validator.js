// check expression regular
function checkExpression() {
    var operation = document.getElementById('display-area').value;
    var value = 0;
    for (let i = 0; i < operation.length; i++) {
        if (operation[i] != '(' && operation[i] != ')') continue;
        if (operation[i] == '(') {
            value++;
        } else {
            value--;
        }

        if (value < 0) {
            console.log(value + ' ' + i + ' ' + 'lll');
            return false;
        }
    }

    return (value == 0);
}

//define valid letters and their Ascii code 
var map = new Map();
var validLetters = "0123456789*/-+.";
for (let i = 0; i < validLetters.length; i++) {
    map.set(validLetters[i], validLetters.charCodeAt(i));
}

// build the automate to check validaty of operation
function buildAutomate() {
    // define automate 
    var automate = [];
    automate.push(0); // initial state
    automate.push(1); // midlle state
    automate.push(2); // finale state
    automate.push(3); // midlle state

    automate[0] = new Array(256).fill(-1);
    automate[1] = new Array(256).fill(-1);
    automate[2] = new Array(256).fill(-1);
    automate[3] = new Array(256).fill(-1);

    // fill the states
    automate[0][map.get('+')] = 1;
    automate[0][map.get('-')] = 1;

    automate[1][map.get('0')] = 2;
    automate[1][map.get('1')] = 2;
    automate[1][map.get('2')] = 2;
    automate[1][map.get('3')] = 2;
    automate[1][map.get('4')] = 2;
    automate[1][map.get('5')] = 2;
    automate[1][map.get('6')] = 2;
    automate[1][map.get('7')] = 2;
    automate[1][map.get('8')] = 2;
    automate[1][map.get('9')] = 2;

    automate[2][map.get('0')] = 2;
    automate[2][map.get('1')] = 2;
    automate[2][map.get('2')] = 2;
    automate[2][map.get('3')] = 2;
    automate[2][map.get('4')] = 2;
    automate[2][map.get('5')] = 2;
    automate[2][map.get('6')] = 2;
    automate[2][map.get('7')] = 2;
    automate[2][map.get('8')] = 2;
    automate[2][map.get('9')] = 2;

    automate[2][map.get('+')] = 3;
    automate[2][map.get('-')] = 3;
    automate[2][map.get('/')] = 3;
    automate[2][map.get('*')] = 3;

    automate[3][map.get('0')] = 2;
    automate[3][map.get('1')] = 2;
    automate[3][map.get('2')] = 2;
    automate[3][map.get('3')] = 2;
    automate[3][map.get('4')] = 2;
    automate[3][map.get('5')] = 2;
    automate[3][map.get('6')] = 2;
    automate[3][map.get('7')] = 2;
    automate[3][map.get('8')] = 2;
    automate[3][map.get('9')] = 2;

    return automate;
}

// check validaty of operation
function isTrueOperation() {
    var operation = document.getElementById('display-area').value;
    if(operation.length == 0) {
        return false;
    }
    if(operation[0] != '-' && operation[0] != '+') {
        operation = "+" + operation;
    }

    var automate = buildAutomate();
    var initialState = 0;
    for(let i = 0 ; i < operation.length ; i++) {
        if(operation[i] == '.' || operation[i] == '(' || operation[i] == ')') {
            continue;
        }

        var nextState = automate[initialState][map.get(operation[i])];
        if(nextState == -1) {
            return false;
        }
        initialState = nextState;
    }
    return (initialState == 2);
}

function f() {
   // console.log(isTrueOperation());
}


