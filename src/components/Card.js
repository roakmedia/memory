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
        <div style={{backgroundImage: 'url(https://picsum.photos/100/130?rd='+nr+')'}} className="front-side">
          <div className="number">{nr}</div>
        </div>
        <div className="back-side"></div>
    </div>
  );
};

export default Card;