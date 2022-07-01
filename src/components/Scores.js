const Scores = ({ tries, score, highScore }) => {
  return (
    <div className="scores">
      <div className="tries">Tries: {tries}</div>
      <div className="score">Score: {score}</div>
      <div className="high-score">High score: {highScore}</div>
    </div>
  );
};

export default Scores;