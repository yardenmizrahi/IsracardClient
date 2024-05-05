import React from 'react';
import Card from './card';

const CardList = ({ cards, onCardSelect }) => {
  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <Card key={index} card={card} onSelect={() => onCardSelect(card)} />
      ))}
    </div>
  );
};

export default CardList;
