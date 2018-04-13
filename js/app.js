// card list holding all cards
 let card = document.getElementsByClassName("card");
 let cards = [...card]
 console.log(cards);

// declares variables
const deck = document.getElementsByClassName("deck");
var openedCards = [];
let moves = 0;
let moveCounter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let matchedCard = document.getElementsByClassName("match");
let starsList = document.querySelectorAll(".stars li");
let closeIcon = document.querySelector(".close");
let modal = document.getElementById("popup1")

// loops over all cards and adds event listeners
for (var i = 0; i < cards.length; i++){
   cards[i].addEventListener("click", displayCard);
};

// displays cards
var displayCard = function (){
   this.classList.toggle("open");
   this.classList.toggle("show");
   this.classList.toggle("disabled");
}

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
    }

// adds opened cards to OpenedCards list and check if cards are match or not
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
    Array.prototype.filter.call(cards, function(card){
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

/*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
