// card list holding all cards
 let card = document.getElementsByClassName("card");
 let cards = [...card]
 console.log(cards);

// declares variables
const deck = document.getElementsByClassName("deck");
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let matchedCard = document.getElementsByClassName("match");
let starsList = document.querySelectorAll(".stars li");
let closeIcon = document.querySelector(".close");
let modal = document.getElementById("popup1");
var openedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};
// shuffles cards at start of game and displays them on the board
document.body.onload = init();

function init() {
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // resets moves
    moves = 0;
    counter.innerHTML = moves;
    // resets rating
    for (var i= 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    // resets timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

// displays cards
var displayCard = function (){
   this.classList.toggle("open");
   this.classList.toggle("show");
   this.classList.toggle("disabled");
}

// adds opened cards to OpenedCards list and checks if cards match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2) {
        moveCounter();
        if(openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
};

// deals with matched cards
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// deals with unmatched cards
function unmatched() {
  openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    },1100);
}

// temporarily disables cards
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

// enables cards and disables matched cards
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

// counts users's moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // rates user based on moves
    if (moves > 8 && moves < 12) {
        for(i = 0; i < 3; i++) {
            if(i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13) {
        for(i = 0; i < 3; i++) {
            if(i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// times user's gameplay
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if(second == 60) {
            minute++;
            second = 0;
        }
        if(minute == 60) {
            hour++;
            minute = 0;
        }
    },1000);
}

// displays congratulations modal
function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        // declares star rating variable
        var starRating = document.querySelector(".stars").innerHTML;
        // displays moves, rating and time on modal
        document.getElementsByClassName("finalMove").innerHTML = moves;
        document.getElementsByClassName("starRating").innerHTML = starRating;
        document.getElementsByClassName("totalTime").innerHTML = finalTime;
        // displays close icon on modal
        closeModal();
    };
}

// enables close icon functionality
function closeModal() {
    closeicon.addEventListener("click", function(e) {
        modal.classList.remove("show");
        init();
    });
}

// enables Play Again button functionality
function playAgain() {
    modal.classList.remove("show");
    init();
}

// loops over all cards and adds event listeners
for (var i = 0; i < cards.length; i++) {
   card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};
