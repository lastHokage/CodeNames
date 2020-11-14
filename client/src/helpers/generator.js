export function generator() {
  const redCardsPosition = [];
  const blueCardsPosition = [];
  const civiliansCardsPosition = [];
  while (redCardsPosition.length < 8) {
    const randomRed = Math.floor(Math.random() * 25);
    if (redCardsPosition.indexOf(randomRed) === -1)
      redCardsPosition.push(randomRed);
  }
  while (blueCardsPosition.length < 9) {
    const randomBlue = Math.floor(Math.random() * 25);

    if (
      redCardsPosition.indexOf(randomBlue) === -1 &&
      blueCardsPosition.indexOf(randomBlue) === -1
    )
      blueCardsPosition.push(randomBlue);
  }
  while (civiliansCardsPosition.length < 7) {
    const randomCivil = Math.floor(Math.random() * 25);

    if (
      redCardsPosition.indexOf(randomCivil) === -1 &&
      blueCardsPosition.indexOf(randomCivil) === -1 &&
      civiliansCardsPosition.indexOf(randomCivil) === -1
    )
      civiliansCardsPosition.push(randomCivil);
  }
  const all = Array.from({ length: 25 }, (v, i) => i);
  const assassinCardPosition = all.filter(
    (ex) =>
      ![
        ...redCardsPosition,
        ...blueCardsPosition,
        ...civiliansCardsPosition,
      ].includes(ex)
  )[0];

  return {
    redCardsPosition,
    blueCardsPosition,
    assassinCardPosition,
    civiliansCardsPosition,
  };
}
