import { useState } from 'react';
import './App.css';
import LayedOutDeck from './components/LayedOutDeck';
import GameConfigForm from './components/GameConfigForm';
import { getShuffledDeck, find } from './utils';

const App = () => {
  const [cardsPerGroup, setCardsPerGroup] = useState(0);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [deckState, setDeckState] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const cardGroups = event.target[0].value;
    const cardsPerGroup = event.target[1].value;
    if (cardGroups <= 0 || cardsPerGroup <= 0) {
      setErrorMessage('Please enter nr of card groups and nr of cards per group');
      return;
    }
    if (cardsPerGroup < 2) {
      setErrorMessage('Nr of cards per group must be at least 2');
      return;
    }
    const shuffledDeck = getShuffledDeck(cardGroups, cardsPerGroup);
    const deckState = Object.keys(shuffledDeck).fill(0);

    setErrorMessage('');
    setCardsPerGroup(cardsPerGroup);
    setShuffledDeck(shuffledDeck);
    setDeckState(deckState);
  };

  const handleCardClick = (i) => {
    let storeDeckState = deckState;
    storeDeckState[i] = 1;
    const found = find(1, storeDeckState);
    if (found.length === cardsPerGroup) {
      // compare
    }
    setDeckState([...storeDeckState]);
  };

  return (
    <div className="App">
      <GameConfigForm handleSubmit={handleSubmit} />
      {errorMessage ? <p>{errorMessage}</p> : <></>}
      {shuffledDeck.length && deckState.length ? (
        <LayedOutDeck shuffledDeck={shuffledDeck} handleCardClick={handleCardClick} deckState={deckState} />
      ) : null}
    </div>
  );
}

export default App;
