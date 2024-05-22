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

    if (deckID) {
      const getCards = async () => {
        const spades = [];
        const hearts = [];
        const diamonds = [];
        const clubs = [];

        const firstSet = await drawCards(13);
        setFirstSet(firstSet);

        firstSet.forEach((card) => {
          if (card.code[1] === "S") spades.push(card);
          else if (card.code[1] === "H") hearts.push(card);
          else if (card.code[1] === "D") diamonds.push(card);
          else clubs.push(card);
        });

        setHand([spades, hearts, diamonds, clubs]);
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

      <div>
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
    </>
  );
};

export default Card;
