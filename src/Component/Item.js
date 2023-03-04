import "./App.css";

function ItemIcon({ name }) {
  if (name === null) {
    return null;
  }
  return (
    <img
      src={`${process.env.PUBLIC_URL}/icons/${name}.png`}
      className="item-icon"
      alt={name}
    />
  );
}

function CountOverlay({ count }) {
  return <span className="count"> {count} </span>;
}

function ItemButton({ name, count, onClick, className }) {
  return (
    <button
      type="button"
      title={name}
      className={`item-button ${className}`}
      onClick={onClick}
    >
      {name === "all" ? "All" : <ItemIcon name={name} />}
      {!!count && <CountOverlay count={count}></CountOverlay>}
    </button>
  );
}

export { ItemIcon, ItemButton };
