// Selecting elements using jQuery
const $history = $('#history');
const $bar1 = $('#bar1');
const $bar2 = $('#bar2');
const $dis = $('#answer');

// Initializing localStorage
if (!localStorage.getItem('calcHistory')) {
    localStorage.setItem('calcHistory', JSON.stringify([]));
}

// Function to show history
function showHistory() {
    const calcHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];
    const len = calcHistory.length;

    $history.html('');
    $bar1.show(500);
    $bar2.show(500);

    if (len === 0) {
        const historyItem = createHistoryItem("There's no history yet.");
        $history.append(historyItem);
    } else {
        for (let index = len - 1; index >= 0; index--) {
            const element = calcHistory[index];
            const historyItem = createHistoryItem(`${element.op} = <span style="color: ${element.result < 0 ? 'red' : 'green'}">${element.result}</span>`);
            $history.append(historyItem);

            if (index > 0) {
                $history.append('<hr>');
            }
        }
    }
}

// Event handler for history button click
$('#historybutton').on('click', function () {
    showHistory();  // Call the function to display history
    $history.addClass('show');
});

// Event handlers for hiding history bars
$bar1.on('click', function () {
    $bar1.hide(500);
    $bar2.hide(500);
    $history.removeClass('show');
});

$bar2.on('click', function () {
    $bar1.hide(500);
    $bar2.hide(500);
    $history.removeClass('show');
});

// Function to clear all
function clearAll() {
    $dis.val('');
    storArr = [];
    localStorage.setItem('calcHistory', JSON.stringify([]));
}

// Function to delete last entry
function deleteLastEntry() {
    const calcHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];
    if (calcHistory.length > 0) {
        calcHistory.pop();
        localStorage.setItem('calcHistory', JSON.stringify(calcHistory));
    }
}

// Helper function to create a history item
function createHistoryItem(content) {
    const $historyItem = $('<div>').addClass('historyelement').html(content);
    return $historyItem.get(0); // Convert jQuery object to a regular DOM element
}
