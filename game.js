
var millisecLabel = document.getElementById('ms');
var secondslabel = document.getElementById('sec');
let Btseclabel = document.getElementById('bt.sec'),
    Btmillilabel = document.getElementById('bt.ms');
var msec = 0,
    sec = 0;
var ss, sm, str;
let show = document.querySelector('.result');
let score = [];
var s = [];
localStorage.setItem('board', 0);

function reset() {
    a = 1;
    msec = 00;
    sec = 0;
    clearInterval(sm);
    clearInterval(ss);
    disp.style.display = 'none';
    timeleft = 3;
    document.getElementById('game').style.border = '0px';
    document.querySelector('.count').style.display = 'flex';
    millisecLabel.innerHTML = msec;
    secondslabel.innerHTML = sec;
    show.style.display = 'none';
    document.querySelector('.count').textContent = timeleft;
}
function createbutton() {
    for (let i = 1; i <= 16; i++) {
        var bt = document.createElement('button');
        disp.appendChild(bt);
        bt.className = 'play';
        bt.value = i;
        bt.innerHTML = i;
    }
    disp.style.display = 'none';
}


function setTime() {
    msec++;
    millisecLabel.innerHTML = pad(msec % 100);
}

class Rec {
    constructor(second, milli) {
        this.second = second;
        this.milli = milli;
    }
}

let n = undefined;
next = new Rec(1000, 1000);

function best(next, k) {
    if (next.second < k.second) {
        k.second = next.second;
        k.milli = next.milli;

    }
    if (next.second == k.second) {
        if (next.milli < k.milli) {
            k.second = next.second;
            k.milli = next.milli;
        }
    }

}


function stop(ss, sm) {
    clearInterval(ss);
    clearInterval(sm);
    best(next, k);
    Btseclabel.innerHTML = k.second;
    Btmillilabel.innerHTML = k.milli;
    show.style.display='grid';
    if (n == 1)
        show.firstElementChild.innerHTML = `Your Time is ${k.second}.${k.milli}`;
    else
        show.firstElementChild.innerHTML = `Your Time is ${next.second}.${next.milli}`;
}

function setsec() {
    sec++;
    secondslabel.innerHTML = sec;
}

function pad(val) {
    var valstring = val + '';
    if (valstring.length < 2) {
        return "0" + valstring;
    } else {
        return valstring;
    }
}

function starttimer() {
    sm = setInterval(setTime, 1);
    ss = setInterval(setsec, 1000);

}

var count = 17,
    correct = 1;
let disp = document.querySelector('.Grid');

function clicked(n) {
    if (n.value == correct) {
        if (count <= 32) {
            n.value = count;
            n.innerHTML = count;
            count++;
        } else if (count <= 48) {
            n.value = count;
            n.innerHTML = '';
            count++;
        }
        correct++;
    }

}
let a = 1;

function playgame() {
    
let btn = document.querySelectorAll('#game .play');
    ranNum(Randomnumbers,btn);
    starttimer();
    Array.from(btn).forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            clicked(e.target);
            if (count > 48) {
                disp.style.display = 'none';
                if (n == 1) {
                    k = new Rec(sec, msec % 100);
                    if (a == 1) {
                        str = k.second + '.' + k.milli;
                        score.push(parseFloat(str));
                        localStorage.setItem('board', JSON.stringify(score));
                        a++;
                    }

                } else {
                    next = new Rec(sec, msec % 100);
                    if (a == 1) {
                        str = next.second + '.' + next.milli;
                        score.push(parseFloat(str));
                        localStorage.setItem('board', JSON.stringify(score));
                        a++;
                    }
                }
                stop(ss, sm);
            }
        })
    })
}
var timeleft = 3;

function countdown() {
    var downloadTimer = setInterval(function() {
        timeleft--;
        document.querySelector('.count').textContent = timeleft;
        if (timeleft <= 0) {
            document.querySelector('.count').style.display = 'done';
            clearInterval(downloadTimer);
            disp.style.display = 'none';
            playgame();
        }
    }, 1000)
}

let Randomnumbers = [];

let numberGenerator = function(arr) {
    if (arr.length >= 16) return;
    let newNumber = Math.floor(Math.random() * 16) + 1;
    if (arr.indexOf(newNumber) < 0) {
        arr.push(newNumber);
    }
    numberGenerator(arr);
};

function ranNum(RandomNumbers,btn) {
    numberGenerator(RandomNumbers);
    Array.from(btn).forEach(function(btn) {
        btn.value = Randomnumbers.pop();
        btn.innerHTML = btn.value;
    })
    count = 17, correct = 1;
}
reset();

function startgame() {
    if (n === undefined) {
        n = 1;
        createbutton();
    } else
        n++;
    document.getElementById('highest').style.visibility = 'hidden';
    reset();
    countdown();
}

function restart() {
    document.getElementById('highest').style.visibility = 'hidden';
    n++;
    reset();
    countdown();

}
var child = document.querySelectorAll('li');



function scoreB() {
    let i = 0
    s = JSON.parse(localStorage.getItem('board'));
    s.sort(function(a, b) { return a - b; });
    document.getElementById('highest').style.visibility = 'visible';
    if (s.length <= 5) {
        for (; i < s.length; i++) {
            child[i].innerHTML = (i + 1) + '. ' + s[i];
            child[i].style.borderBottom = '2px green dotted';
        }
    } else {
        for (; i < 5; i++) {
            child[i].innerHTML = (i + 1) + '. ' + s[i];
            child[i].style.borderBottom = '2px green dotted';
        }
    }
}
