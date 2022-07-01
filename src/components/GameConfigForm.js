const GameConfigForm = ({ handleSubmit }) => {

  return (
    <div className="configForm">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="formRow"><div>Number of card groups:</div><div><input id="nrOfCardGroups" type="number" size="5" /></div></div>
        <div className="formRow"><div>Number of cards per group:</div><div><input id="nrOfCardsPerGroup" type="number" size="5" /></div></div>
        <div><button className="formButton" type="submit">Create new game</button></div>
      </form>
    </div>
  );
};

export default GameConfigForm;