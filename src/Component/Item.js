import "./App.css";

function ItemIcon({ name }) {
  if (name === null) {
    return null;
  }
  return <img src={`icons/${name}.png`} className="item-icon" alt={name} />;
}

function ItemButton({ name, onClick }) {
  return (
    <button
      type="button"
      title={name}
      className="item-button"
      onClick={onClick}
    >
      {name === "all" ? "All" : <ItemIcon name={name} />}
    </button>
  );
}

export { ItemIcon, ItemButton };
