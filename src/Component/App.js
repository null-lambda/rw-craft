import "./App.css";
import { RecipeDisplay } from "./RecipeDisplay";

export default function App() {
  return (
    <div className="app">
      {/* <nav>Recipe / Simulation</nav> */}
      <section>
        <RecipeDisplay />
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
