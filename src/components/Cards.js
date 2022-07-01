import Card from './Card';

const Cards = ({ shuffledDeck, deckState, handleCardClick }) => {
  const cards = shuffledDeck.map((x, key) => {
    // generate unique key, otherwise card won't rerender
    const cardKey = key.toString()+deckState[key].toString();
    
    return <Card key={cardKey} show={deckState[key]} index={key} nr={x} handleCardClick={handleCardClick} />;
  });

  return <div className="cards">{cards}</div>
};

export default Cards;