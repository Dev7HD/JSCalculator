let historybutton = document.getElementById('historybutton');
let history = document.getElementById('history');
let bar1 = document.getElementById('bar1');
let bar2 = document.getElementById('bar2');
let dis=document.getElementById('answer');
localStorage.setItem("calcHistory", JSON.stringify([]))
function showHistory() {
    if (localStorage.getItem("calcHistory") == null) {
        localStorage.setItem("calcHistory", JSON.stringify([]))
    }
    let calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
    let len = calcHistory.length;

    history.innerHTML = '';

    bar1.style.display = 'block';
    bar2.style.display = 'block';
    if (len === 0) {
        let historyItem = document.createElement('div');
        historyItem.innerHTML = "There's no history yet.";
        historyItem.className = 'historyelement his';
        historyItem.style.fontSize = '25px';
        history.appendChild(historyItem);
    } else {
        for (let index = len-1; index >=0; index--) {
            const element = calcHistory[index];
            let historyItem = document.createElement('div');
            historyItem.className = 'historyelement';
            historyItem.innerHTML = `${element.op} = <span style="color: ${element.result < 0 ? 'red' : 'green'}">${element.result}</span>`;//it makes red color in the history section .............
            history.appendChild(historyItem);
            if (index > 0) history.appendChild(document.createElement('hr'));
        }
    }

    history.style.display = 'block';
}

historybutton.addEventListener('click', showHistory);

function clearAll(){
    dis.value=''
    storArr = [];
    localStorage.setItem("calcHistory", JSON.stringify([]))
}

function hide(){
    history.style.display = 'none';
    bar1.style.display = 'none';
    bar2.style.display = 'none';
}
function deleteLastEntry() {
    let calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
    if (calcHistory.length > 0) {
      calcHistory.pop(); 
      localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
    }
  }



bar1.addEventListener('click', hide);
bar2.addEventListener('click', hide);
