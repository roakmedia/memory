const GameConfigForm = ({ handleSubmit }) => {

  return (
    <div className="config-form">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-row">
          <div>Number of matching card groups:</div>
          <div><input type="number" defaultValue="10" /></div>
        </div>
        <div className="form-row">
          <div>Number of cards per group:</div>
          <div><input type="number" defaultValue="2" /></div>
        </div>
        <div>
          <button className="form-button" type="submit">Create new game</button>
        </div>
      </form>
    </div>
  );
};

export default GameConfigForm;