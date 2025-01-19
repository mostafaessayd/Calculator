// Insert the letter at the given position
function insertLetterAtPosition(word, letter, position) {
    return word.slice(0, position) + letter + word.slice(position);
}

// add parenthesses to the operation
function addParenthesses() {
    var operation = document.getElementById('display-area').value;
    for (let i = 0; i < operation.length; ) {
        console.log(i);
        if (!isNaN(operation[i])) {
            var j = i;
            var isDigit = true;
            while (j < operation.length && operation[j] != '+' && operation[j] != '-') {
                isDigit &= (!isNaN(operation[j]));
                j++;
            }
            if (!isDigit) {
                operation = insertLetterAtPosition(operation , '(' , i);
                operation = insertLetterAtPosition(operation , ')' , j + 1);
                i = j + 3;
            } else {
               // i = j;
            }
        }
    }

    document.getElementById('display-area').value = operation;

    //getResulteOfSecondType(operation);
}

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
        while (i < operation.length && !isNaN(operation[i])) {
            nbr += operation[i];
            i++;
        }
        if (op == '+') {
            res += parseInt(nbr);
        } else {
            res -= parseInt(nbr);
        }
    }

    document.getElementById('display-area').value = res.toString();
    return res.toString();
}

// get the resulte of operation contain just divid and multibly
function getResulteOfSecondType(operation) {
    var res = 0;
    var nbr = "";
    var i = 0;
    while (i < operation.length && !isNaN(operation[i])) {
        nbr += operation[i];
        i++;
    }

    res = nbr.toString();
    for (; i < operation.length;) {
        var op = operation[i];
        i++;
        nbr = "";
        while (i < operation.length && !isNaN(operation[i])) {
            nbr += operation[i];
            i++;
        }

        if (op == '*') {
            res *= parseInt(nbr);
        } else {
            res /= parseInt(nbr);
        }
    }

    document.getElementById('display-area').value = res.toString();
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
    for (let i = l + 1; i < r; i++) {
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

    for (let i = r + 1 ; i < word.length ; i++) {
        res += word[i];
    }

    return res;
}

// get type of operation
function getTypeOfOperation(operation) {
    var first = false;
    for (let i = 0; i < operation.length; i++) {
        first |= (operation[i] == '+' || operation[i] == '-');
    }

    return (first ? 1 : 2);
}

// funcion to split operations
function split() {
    var operation = document.getElementById('display-area').value;
    while (!checkToken(operation)) {
        for (let i = 0; i < operation.length - 1; i++) {
            if (operation[i] == '(') {
                var j = i + 1;
                while (j < operation.length && operation[j] != '(' && operation[j] != ')') {
                    j++;
                }
                if (operation[j] == ')') {
                    var op = getSubString(operation, i, j);
                    var res = "";
                    if (getTypeOfOperation(op) == 1) {
                        res = getResulteOfFirstType(op);
                    } else {
                        res = getResulteOfSecondType(op);
                    }
                    console.log(op + ' ' + res);
                    operation = eraseSubstring(operation, res, i, j);
                }
            }
        }
        console.log(checkToken(operation));
    }
    
    operation = getResulteOfFirstType(operation);
    document.getElementById('display-area').value = operation;
}