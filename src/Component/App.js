import "./App.css";
import data from "../data";
import _ from "lodash";
import { Component } from "react";
import { ItemIcon, ItemButton } from "./Item.js";
import { RecipeDisplay } from "./RecipeTable";

function ItemTray({ onClick }) {
  let items = _.uniq([...data.sources, ...data.targets]);
  items = _.difference(items, ["Food"]);
  // items = _.sortBy(items, x => data.order.name[x]);
  items = _.sortBy(items, x => data.order.color[x]);

  const options = ['all', ...items];
  const grid = [options];

  return (
    <div className="item-tray">
      {grid.map((row, i) => (
        <div key={i} className="item-tray-row">
          {row.map((name) => (
            <ItemButton
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // source: [],
      target: null,
    };
  }

  render() {
    const setTarget = (name) => {
      this.setState({ target: name });
    };

    const targets =
      this.state.target === null
        ? []
        : this.state.target === "all"
        ? [...data.targets, "Food-3", "Food-4", "Food-5"]
        : [this.state.target];

    return (
      <div className="app">
        <section>
          <div>
            <ItemTray onClick={setTarget} />
          </div>
          <div>
            {this.state.target !== "all" && (
              <>
                <h2>{this.state.target}</h2>
                <p>
                  <ItemIcon name={this.state.target} />
                </p>
              </>
            )}
            <RecipeDisplay onClick={setTarget} targets={targets} />
          </div>
        </section>
        <footer>
          <p>
            <a href="https://rainworldgame.com/">Rain World</a> {" © "}
            <a href="https://videocultmedia.com/">Videocult</a>
          </p>
          <p>
            Table content originally sourced from{" "}
            <a href="https://rainworld.miraheze.org/wiki/Gourmand">
              Rain World Official Wiki
            </a>{" "}
            and licensed under{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
              CC-BY-SA 4.0
            </a>
            .
          </p>
        </footer>
      </div>
    );
  }
}
