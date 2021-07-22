const cardList = document.getElementsByClassName("main__wrapper")[0];

const suits = [
    "diamonds",
    "clubs",
    "spades",
    "hearts"
];

const mature = [
    "J",
    "Q",
    "K"
];

for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 14; ++j) {
        const card = document.createElement("li");
        card.className = `playing-card playing-card--${suits[i]} playing-card--${(j<=10)?j:mature[j-11]}`;
        cardList.append(card);
    }
}