// get the resulte of operation contain just add and subtract
function getResulteOfFirstType(operation) {

    if (operation[0] != '-' && operation[0] != '+') {
        operation = "+" + operation;
    }

    var res = 0;
    for (let i = 0; i < operation.length;) {
        var op = operation[i];
        i++;
        var nbr = "";
        while (i < operation.length && (!isNaN(operation[i]) || operation[i] == '.')) {
            nbr += operation[i];
            i++;
        }
        if (op == '+') {
            res += parseFloat(nbr);
        } else {
            res -= parseFloat(nbr);
        }
    }

    return res.toString();
}

// get the resulte of operation contain just divid and multibly
function getResulteOfSecondType(operation) {
    var res = 0;
    var nbr = "";
    var i = 0;
    while (i < operation.length && (!isNaN(operation[i]) || operation[i] == '.')) {
        nbr += operation[i];
        i++;
    }

    res = nbr.toString();
    for (; i < operation.length;) {
        var op = operation[i];
        i++;
        nbr = "";
        while (i < operation.length && (!isNaN(operation[i]) || operation[i] == '.')) {
            nbr += operation[i];
            i++;
        }

        if (op == '*') {
            res *= parseFloat(nbr);
        } else {
            res /= parseFloat(nbr);
        }
    }

    return res.toString();
}

// check if the operation has tokens
function checkToken(operation) {
    for (let i = 0; i < operation.length; i++) {
        if (operation[i] == '(' || operation[i] == ')') {
            return false;
        }
    }

    return true;
}

// get the substring start from l into r from string s
function getSubString(word, l, r) {
    var res = "";
    for (let i = l ; i <= r; i++) {
        res += word[i];
    }
    return res;
}

// remove substring start from l into r from string
function eraseSubstring(word, newSubstring, l, r) {
    var res = "";
    for (let i = 0; i < l; i++) {
        res += word[i];
    }

    res += newSubstring;

    for (let i = r + 1; i < word.length; i++) {
        res += word[i];
    }

    return res;
}

// remove extra brackets
function removeExtraBrackets(operation) {
    var listOfExtraBrackets = [];
    for (let i = 0; i < operation.length; i++) {
        if (operation[i] == '(') {
            let j = i + 1;
            var isNumber = true;
            while (j < operation.length && operation[j] != ')') {
                isNumber &= (operation[j] == '.' || !isNaN(operation[j]));
                j++;
            }
            if (j < operation.length && operation[j] == ')' && isNumber) {
                listOfExtraBrackets.push(i);
                listOfExtraBrackets.push(j);
            }
        }
    }

    var newOperation = "";
    for (let i = 0; i < operation.length; i++) {
        if (listOfExtraBrackets.includes(i)) {
            continue;
        }
        newOperation += operation[i];
    }

    return newOperation;
}

// funcion to split operations
function split() {
    var operation = document.getElementById('display-area').value;
    while (!checkToken(operation)) {
        operation = removeExtraBrackets(operation);
        for (let i = 0; i < operation.length - 1; i++) {
            if (operation[i] == '(') {
                var j = i + 1;
                while (j < operation.length && operation[j] != '(' && operation[j] != ')') {
                    j++;
                }
                if (operation[j] == ')') {
                    var op = getSubString(operation, i + 1 , j - 1);
                    operation = eraseSubstring(operation, getResulteOf(op), i, j);
                }
            }
        }
    }

    operation = getResulteOf(operation);
    return operation;
}

// check string is operation or not
function isOperation(operation) {
    var hasToken = false;
    for (let i = 0; i < operation.length; i++) {
        hasToken |= (operation[i] == '-' || operation[i] == '+' || operation[i] == '*' || operation[i] == '/');
    }

    if(!hasToken) {
        return false;
    }
    return !isNaN(operation[0]) && !isNaN(operation[operation.length - 1]);
}

// get resulte of operation
function getResulteOf(operation) {
    var n = operation.length;
    for(let i = 0 ; i < n ; ) {
        if(!isNaN(operation[i])) {
            let j = i;
            var op = "";
            while(j < n && (!isNaN(operation[j]) || operation[j] == '.') || operation[j] == '/' || operation[j] == '*') {
                op += operation[j];
                j++;
            }

            if(isOperation(op)) {
                var x = operation;
                operation = eraseSubstring(operation , getResulteOfSecondType(op) , i , j - 1);
                n = operation.length;
                i = 0;
            } else {
                i++;
            }
        } else {
            i++;
        }
    }

    operation = getResulteOfFirstType(operation);

    return operation.toString();
}

// get final resulte
function getFinalRes() {
    if(!checkExpression() || !isTrueOperation()) {
        alert('The entered operation is incorrect');
        return;
    }
    var operation = split();
    document.getElementById('display-area').value = operation;
}
