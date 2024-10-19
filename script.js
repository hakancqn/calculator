let sum = document.getElementById('sum');
function operation(input) {
    if (sum.value !== '0') {
        console.log('value is not 0');
        sum.value += input;
    } else {
        console.log('value is 0');
        sum.value = input;
    }
    console.log('Sum:', sum.value);
}

function clearOp() {
    console.clear();
    console.log('Summary was cleared.');
    sum.value = 0;
}
function deleteLast() {
    sum.value = sum.value.substring(0, sum.value.length - 1);
    console.log('Sum:', sum.value);
}

document.addEventListener('keydown', function (e) {
    if (!'0123456789=.-+%*/cBackspace'.includes(e.key)) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            sumup();
        }
        console.log('keyCode:', e.keyCode, ', Key:', e.key );
    } else {
        console.log('keyCode:', e.keyCode, ', Key:', e.key );
        if (e.key === '=') {
            sumup();
        } else if (e.key === 'c') {
            clearOp();
        } else if (e.key === 'Backspace' || e.keyCode === 8) {
            deleteLast();
        } else {
            operation(e.key);
        }
    }
});

function sumup() {
    let expression = sum.value;

    while (expression.includes('%')) {
        let percentIndex = expression.indexOf('%');
        let leftPart = expression.substring(0, percentIndex);
        let rightPart = expression.substring(percentIndex + 1);

        // Find the number before %
        let numberBeforePercent = '';
        for (let i = leftPart.length - 1; i >= 0; i--) {
            if (!'0123456789.'.includes(leftPart[i])) break;
            numberBeforePercent = leftPart[i] + numberBeforePercent;
        }

        let percentValue = parseFloat(numberBeforePercent) / 100;

        // Find the number after % (if any)
        let numberAfterPercent = rightPart.match(/^\d+(\.\d+)?/);
        let numberAfterPercentValue = numberAfterPercent ? parseFloat(numberAfterPercent[0]) : 1;

        // Calculate the result of the percentage operation
        let percentResult = percentValue * numberAfterPercentValue;

        // Replace the entire percentage operation in the expression
        let replaceStart = leftPart.length - numberBeforePercent.length;
        let replaceEnd = percentIndex + 1 + (numberAfterPercent ? numberAfterPercent[0].length : 0);
        expression = expression.substring(0, replaceStart) +
            percentResult.toString() +
            expression.substring(replaceEnd);
    }

    // Evaluate the final expression
    try {
        let result = eval(expression);
        console.log(result);
        sum.value = result;
        return result;
    } catch (error) {
        console.log('Error in calculation');
        return 'Error';
    }
}