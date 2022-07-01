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

export const find = (needle, haystack) => {
  var results = [];
  var idx = haystack.indexOf(needle);
  while (idx !== -1) {
      results.push(idx);
      idx = haystack.indexOf(needle, idx + 1);
  }
  return results;
}
