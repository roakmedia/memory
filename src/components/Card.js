const Card = ({ nr, index, handleCardClick, status }) => {
  let cardClass;
  switch (status) {
    case global.config.cardStatus.shown:
      cardClass = 'show';
      break;
    case global.config.cardStatus.found:
      cardClass = 'found';
      break;
    case global.config.cardStatus.hidden:
    default:
      cardClass = 'hide';
  }

  return (
    <div className={`card card-${cardClass}`} onClick={() => handleCardClick(index)}>
        <div style={{backgroundImage: `url(https://picsum.photos/100/130?rd=${nr})`}} className="front-side">
          <div className="number">{nr}</div>
        </div>
        <div className="back-side"></div>
    </div>
  );
};

export default Card;