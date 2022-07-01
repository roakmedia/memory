import { useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import GameConfigForm from './components/GameConfigForm';
import { getShuffledDeck, findInArray } from './utils';

const App = () => {
  const [cardsPerGroup, setCardsPerGroup] = useState(0);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [deckState, setDeckState] = useState([]);
  const [message, setMessage] = useState('');
  const [disabledClicks, setdisabledClicks] = useState(false);

  const handleSubmitConfigForm = (event) => {
    // do not submit form
    event.preventDefault();

    // name the form values
    const cardNumbers = parseInt(event.target[0].value);
    const cardsPerGroup = parseInt(event.target[1].value);

    // validate input
    if (cardNumbers <= 0 || cardsPerGroup <= 0) {
      setMessage('Please enter nr of card groups and nr of cards per group');
      return;
    }
    if (cardsPerGroup < 2) {
      setMessage('Nr of cards per group must be at least 2');
      return;
    }

    // initialize game: shuffle deck and set cards state in deck to 0
    const shuffledDeck = getShuffledDeck(cardNumbers, cardsPerGroup);
    const deckState = Object.keys(shuffledDeck).fill(0);

    // update states
    setMessage('');
    setCardsPerGroup(cardsPerGroup);
    setShuffledDeck(shuffledDeck);
    setDeckState(deckState);
    setdisabledClicks(false);
  };

  const handleCardClick = (i) => {
    // copy deckState to manipulate
    let deckStateCopy = deckState;

    // show card when it's hidden, set status to 1
    if (deckStateCopy[i] === 0) deckStateCopy[i] = 1;

    // check how many cards are shown (status: 1), get indices of shown card(s)
    const shownCards = findInArray(1, deckStateCopy);

    if (shownCards.length === cardsPerGroup) {
      let cardNumbers = [];
      // get card numbers on shown cards from shuffled deck
      for (const value of shownCards) {
        cardNumbers.push(shuffledDeck[value]);
      }
      // check if all card numbers on shown cards are equal
      const foundSameNumbers = findInArray(cardNumbers[0], cardNumbers);

      if (foundSameNumbers.length === cardNumbers.length) { // yes, equal!
        setMessage('Found matching cards!');
        for (let i = 0; i < shownCards.length; i++) {
          deckStateCopy[shownCards[i]] = 2;
        }
      } else { // no, try again! Wait 1 seconds before trying again and disable click
        setdisabledClicks(true);
        setTimeout(() => {
          for (let i = 0; i < shownCards.length; i++) {
            deckStateCopy[shownCards[i]] = 0;
          }
          setDeckState([...deckStateCopy]);
          setdisabledClicks(false);
        }, 1000);
      }
    }

    // check how many cards / groups of cards have been found (status: 2)
    const foundCards = findInArray(2, deckStateCopy);
    if (foundCards.length === deckStateCopy.length) {
      setMessage('Yoohoo! You\'ve won!');
      setdisabledClicks(true);
      return;
    }

    // set deckstate to rerender app
    setDeckState([...deckStateCopy]);
  };

  return (
    <div className="App">
      <h1>Memory</h1>
      <GameConfigForm handleSubmit={handleSubmitConfigForm} />

      {shuffledDeck.length && deckState.length ? (
        <div className={`cardsContainer ${disabledClicks ? 'disabledClicks' : ''}`}>
          <Cards 
            shuffledDeck={shuffledDeck}
            deckState={deckState}
            handleCardClick={handleCardClick}
          />
        </div>
      ) : null}

      {message ? <p>{message}</p> : null}
    </div>
  );
}

export default App;
