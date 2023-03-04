// Todo: Resolve prop drilling
import { filter } from "lodash";
import data from "../../data";
import { ItemButton, ItemIcon } from "../Item";

export function RecipeTable({ rowHeader, colHeader, filterFn, onClick }) {
  const cells = colHeader.map((c) => rowHeader.map((r) => data.recipe[r][c]));

  const hasData = cells.flat().some((cell) => filterFn(cell));
  if (!hasData) {
    return null;
  }

  const Cell = ({ name, onClick }) => {
    if (name === null) {
      return "-";
    }
    if (name.includes("Food")) {
      const count = name.split("-")[1];
      return <ItemButton name="Food" count={count} />;
    }
    // if (filterFn(name)) {
    //   return <ItemIcon name={name} />;
    // }
    return <ItemButton name={name} onClick={onClick} />;
  };

  const HeaderRow = () => (
    <tr className="header-row">
      <th key="0">
        <span className="header-cell">+</span>
      </th>
      {rowHeader.map((name) => (
        <th key={name}>
          <ItemButton name={name} onClick={() => onClick(name)} />
        </th>
      ))}
    </tr>
  );

  const Row = ({ idx }) => (
    <tr>
      <th key={-1}>
        <ItemButton
          name={colHeader[idx]}
          onClick={() => onClick(colHeader[idx])}
        />
      </th>
      {cells[idx].map((name, j) => (
        <td key={j} className={!filterFn(name) ? "fade" : undefined}>
          <Cell name={name} onClick={() => onClick(name)} />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="recipe-table-wrapper">
      <table className="recipe-table">
        <tbody>
          <HeaderRow />
          {colHeader.map((_, i) => (
            <Row key={i} idx={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
