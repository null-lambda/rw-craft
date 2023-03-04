import _ from "lodash";
import data from "../data";
import { ItemButton } from "./Item";

export function ItemTray({ onClick }) {
  let items = _.uniq([...data.sources, ...data.targets]);
  items = _.difference(items, ["Food"]);
  // items = _.sortBy(items, x => data.order.name[x]);
  items = _.sortBy(items, (x) => data.order.color[x]);

  const options = ["all", ...items];
  const grid = [options];

  return (
    <div className="item-tray">
      {grid.map((row, i) => (
        <div key={i} className="item-tray-row">
          {row.map((name) => (
            <ItemButton
              className={"border"}
              key={name}
              name={name}
              onClick={() => {
                onClick(name);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
