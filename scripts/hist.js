// Selecting elements
const historybutton = document.getElementById('historybutton');
const history = document.getElementById('history');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const dis = document.getElementById('answer');

// Initializing localStorage
if (!localStorage.getItem("calcHistory")) {
    localStorage.setItem("calcHistory", JSON.stringify([]));
}

// Function to show history
function showHistory() {
    const calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
    const len = calcHistory.length;

    history.innerHTML = '';
    bar1.style.display = 'block';
    bar2.style.display = 'block';

    if (len === 0) {
        const historyItem = createHistoryItem("There's no history yet.");
        history.appendChild(historyItem);
    } else {
        for (let index = len - 1; index >= 0; index--) {
            const element = calcHistory[index];
            const historyItem = createHistoryItem(`${element.op} = <span style="color: ${element.result < 0 ? 'red' : 'green'}">${element.result}</span>`);
            history.appendChild(historyItem);

            if (index > 0) {
                history.appendChild(document.createElement('hr'));
            }
        }
    }

    history.style.display = 'block';
}

// Event listeners
historybutton.addEventListener('click', showHistory);
bar1.addEventListener('click', hide);
bar2.addEventListener('click', hide);

// Function to clear all
function clearAll() {
    dis.value = '';
    localStorage.setItem("calcHistory", JSON.stringify([]));
}

// Function to hide history
function hide() {
    history.style.display = 'none';
    bar1.style.display = 'none';
    bar2.style.display = 'none';
}

// Function to delete last entry
function deleteLastEntry() {
    const calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
    if (calcHistory.length > 0) {
        calcHistory.pop();
        localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
    }
}

// Helper function to create a history item
function createHistoryItem(content) {
    const historyItem = document.createElement('div');
    historyItem.className = 'historyelement';
    historyItem.innerHTML = content;
    return historyItem;
}
