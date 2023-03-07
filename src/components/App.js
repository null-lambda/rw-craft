import "styles/index.scss";
import { Route, Routes } from "react-router-dom";
import { TabList } from "components/TabList";
import { RecipeDisplay } from "components/RecipeDisplay";
import { Simulator } from "components/Simulator";

export default function App() {
  return (
    <div className="app">
      <nav>
        <TabList>
          <TabList.NavTab to="/recipes">Recipes</TabList.NavTab>
          <TabList.NavTab to="/simulator">Simulator</TabList.NavTab>
        </TabList>
      </nav>
      <main>
        <Routes>
          <Route path="/recipes" element={<RecipeDisplay />} />
          <Route path="/simulator" element={<Simulator />} />
        </Routes>
      </main>
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
