class Card {
    constructor() {
        this.suit = "";
        this.visVal = "";
        this.image = "";
    }

}

class Deck {
    constructor() {
        this.deck = [];
        this.reset();
        this.shuffle();
        this.deal();
    }

    reset() {
        this.deck = [];

        const suits = ['H', 'S', 'C', 'D'];
        const visVal = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K',];

        let count = 0;

        for (let suit in suits) {
            for (let value in visVal) {
                var card = new Card();
                card.suit = suits[suit];
                card.visVal = visVal[value];
                card.image = `/cards/${card.visVal}${card.suit}.png`
                // card.image = images[count];
                // count++;
                this.deck.push(card);
            }
        }
    }

    shuffle() {
        const { deck } = this;
        let m = deck.length, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            [deck[m], deck[i]] = [deck[i], deck[m]];
        }

        return this;
    }

    deal() {
        return this.deck.pop();
    }
}

const playingCards = new Deck();
// console.log(playingCards);

module.exports = { playingCards };

