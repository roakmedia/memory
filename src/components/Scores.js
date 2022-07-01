const Scores = ({ tries, score }) => {
  return (
    <div className="scores">
      <div className="tries">Tries: {tries}</div>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default Scores;