import React, { useState, useEffect } from "react";
import "./Card.css";

const baseURL =
  "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

const Card = () => {
  const [deckID, setDeckID] = useState("");
  const [firstSet, setFirstSet] = useState([]);
  const [hand, setHand] = useState([]);

  const valueOrder = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];
  const suitOrder = ["Clubs", "Diamonds", "Hearts", "Spades"];

  useEffect(() => {
    const getDeck = async () => {
      try {
        const response = await fetch(baseURL);

        if (!response.ok) {
          throw new Error("Failed to get deck!");
        }

        const result = await response.json();
        setDeckID(result.deck_id);
      } catch (error) {
        console.error(error);
      }
    };

    getDeck();
  }, []);

  useEffect(() => {
    const drawCards = async (count) => {
      try {
        const res = await fetch(
          `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=${count}`
        );

        if (!res.ok) {
          throw new Error("Failed to draw cards!");
        }

        const cardResult = await res.json();
        return cardResult.cards;
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const sortCards = (cards) => {
      const card = cards.sort(
        (a, b) => valueOrder.indexOf(a.value) - valueOrder.indexOf(b.value)
      );

      return card;
    };

    if (deckID) {
      const getCards = async () => {
        const spades = [];
        const hearts = [];
        const diamonds = [];
        const clubs = [];

        const firstSet = await drawCards(13);
        setFirstSet(firstSet);

        firstSet.forEach((card) => {
          if (card.suit === "SPADES") spades.push(card);
          else if (card.suit === "HEARTS") hearts.push(card);
          else if (card.suit === "DIAMONDS") diamonds.push(card);
          else clubs.push(card);
        });

        setHand([
          sortCards(spades),
          sortCards(hearts),
          sortCards(diamonds),
          sortCards(clubs),
        ]);

        // if (spades[0].value[0] === "J") {
        //   spades.push(spades.shift(i));
        // }

        // if (spades[0].value[0] === "Q") {
        //   spades.push();
        //   // spades.shift();
        // }

        // if (spades[0].value[0] === "K") {
        //   spades.push();
        //   spades.shift();
        // }

        // if (spades[0].value[0] === "A") {
        //   spades.push();
        //   spades.shift();
        // }

        for (let i = 0; i < spades.length; i++) {
          if (spades[i].value[0] === "J") {
            console.log(spades);
            spades.push(spades.shift());
            console.log(spades);
          } else if (spades[i].value[0] === "Q") {
            console.log(spades);
            spades.push(spades.shift());
            console.log(spades);
          } else if (spades[i].value[0] === "K") {
            console.log(spades);
            spades.push(spades.shift());
            console.log(spades);
          } else if (spades[i].value[0] === "A") {
            spades.push(spades.shift());
          }
        }

        // console.log(spades);

        // while (spades[0].code === 'J' || spades[0].code === 'Q' || spades[0].code === 'K' || spades[0].code === 'A') {
        //   if (spades.code[0] )
        // }

        // if (spades[0] === "")
      };

      getCards();
    }
  }, [deckID]);

  return (
    <>
      <div className="container">
        <h2 className="heading">First Set of Cards</h2>
        <div className="card-set">
          {firstSet.map((card) => (
            <img
              className="cards"
              key={`first-${card.code}`}
              src={card.image}
              alt={card.value + " of " + card.suit}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <h2 className="heading">Sorted by suit</h2>
        <div className="card-set">
          {hand.map((suitSet, index) => (
            <div key={index}>
              {suitSet.map((card) => (
                <img
                  className="cards"
                  key={`hand-${card.code}`}
                  src={card.image}
                  alt={card.value + " of " + card.suit}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
