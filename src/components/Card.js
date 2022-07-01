const Card = ({ nr, index, handleCardClick, show }) => {
  let cardClass;
  switch (show) {
    case 1: 
      cardClass = 'show';
      break;
    case 2: 
      cardClass = 'found';
      break;
    case 0:
    default:
      cardClass = 'hide';
  }

  return (
    <div className={`card card-${cardClass}`} onClick={() => handleCardClick(index)}>
      <div className="number">
        {nr}
      </div>
    </div>
  );
};

export default Card;