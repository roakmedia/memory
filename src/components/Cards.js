import Card from './Card';

const Cards = ({ shuffledDeck, deckState, handleCardClick }) => {
  const cards = shuffledDeck.map((nr, index) => {
    // generate unique key, otherwise card won't rerender
    const cardKey = index.toString()+deckState[index].toString();
    
    return <Card key={cardKey} status={deckState[index]} index={index} nr={nr} handleCardClick={handleCardClick} />;
  });

  return <div className="cards">{cards}</div>
};

export default Cards;