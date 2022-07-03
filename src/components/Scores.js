const Scores = ({ scores }) => {
  return (
    <div className="scores">
      <div className="tries">Tries: {scores.tries}</div>
      <div className="score">Score: {scores.score}</div>
      <div className="high-score">High score: {scores.highScore}</div>
    </div>
  );
};

export default Scores;