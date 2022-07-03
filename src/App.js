import { useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Scores from './components/Scores';
import GameConfigForm from './components/GameConfigForm';
import Confetti from 'react-confetti';
import { getShuffledDeck, findInArray } from './utils';

const App = () => {
  const [cardsPerGroup, setCardsPerGroup] = useState(0);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [deckState, setDeckState] = useState([]);
  const [message, setMessage] = useState('');
  const [disabledClicks, setDisabledClicks] = useState(false);
  const [scores, setScores] = useState({tries: 0, score: 0, highScore: 0});
  const [confetti, setConfetti] = useState(false);

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
    const deckState = Object.keys(shuffledDeck).fill(global.config.cardStatus.hidden);

    // update states
    setMessage('');
    setCardsPerGroup(cardsPerGroup);
    setShuffledDeck(shuffledDeck);
    setDeckState(deckState);
    setDisabledClicks(false);
    setScores(prevState => ({ ...prevState, tries: 0, score: 0 }));
    setConfetti(false);
  };

  const handleCardClick = (cardIndex) => {
    // clear message
    setMessage('');

    // copy deckState to manipulate
    let deckStateCopy = deckState;

    // show card when it's hidden, set status to 1
    if (deckStateCopy[cardIndex] === 0) deckStateCopy[cardIndex] = global.config.cardStatus.shown;

    // check how many cards are shown (status: 1), get indices of shown card(s)
    const shownCards = findInArray(global.config.cardStatus.shown, deckStateCopy);

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
          deckStateCopy[shownCards[i]] = global.config.cardStatus.found;
        }
        const score = scores.score + 10;
        let highScore = scores.highScore;
        if (score > scores.highScore) {
          highScore = score;
        }
        setScores(prevState => ({ ...prevState, tries: scores.tries++, score, highScore }));
      } else { // no, try again! Wait 1 second before trying again and disable click
        setDisabledClicks(true);
        setScores(prevState => ({ ...prevState, tries: scores.tries++, score: scores.score-1 }));
        setTimeout(() => {
          for (let i = 0; i < shownCards.length; i++) {
            // hide shown cards again
            deckStateCopy[shownCards[i]] = global.config.cardStatus.hidden;
          }
          setDeckState([...deckStateCopy]);
          setDisabledClicks(false);
        }, 1000);
      }
    }

    // check how many cards / groups of cards have been found (status: 2)
    const foundCards = findInArray(global.config.cardStatus.found, deckStateCopy);
    if (foundCards.length === deckStateCopy.length) {
      setMessage('Yoohoo! You\'ve won!');
      setDisabledClicks(true);
      setConfetti(true);
      return;
    }

    // set deckstate to rerender app
    setDeckState([...deckStateCopy]);
  };

  return (
    <div className="App">
      <h1>Memory</h1>
      <div className="header">
        <GameConfigForm handleSubmit={handleSubmitConfigForm} />
        <Scores scores={scores} />
      </div>

      {shuffledDeck.length && deckState.length ? (
        <div className={`cards-container${disabledClicks ? ' disabled-clicks' : ''}`}>
          <Cards 
            shuffledDeck={shuffledDeck}
            deckState={deckState}
            handleCardClick={handleCardClick}
          />
        </div>
      ) : (
        <p>Press the <i>Create new game</i> button to start a new game</p>
      )}

      {message ? <p>{message}</p> : null}
      {confetti && <Confetti />}
    </div>
  );
}

export default App;
