import Card from './Card';

const LayedOutDeck = ({ shuffledDeck, handleCardClick, deckState }) => {
  const layedOutDeck = shuffledDeck.map((x, key) => {
    const cardKey = key.toString()+deckState[key].toString();
    
    return <Card key={cardKey} show={deckState[key]} index={key} nr={x} handleCardClick={handleCardClick} />;
  });

  return <div className="layedOutDeck">{layedOutDeck}</div>
};

export default LayedOutDeck;