// generate shuffled deck
export const getShuffledDeck = (nrOfCardGroups, nrOfCardsPerGroup) => {
  let cards = [];
  for (let i = 1; i <= nrOfCardGroups; i++) {
    for (let ii = 0; ii < nrOfCardsPerGroup; ii++) cards.push(i);
  }

  const shuffledDeck = cards
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffledDeck;
}

// find value in array and return array with indices
export const findInArray = (value, arr) => {
  var results = [];
  var index = arr.indexOf(value);
  while (index !== -1) {
      results.push(index);
      index = arr.indexOf(value, index + 1);
  }
  return results;
}
