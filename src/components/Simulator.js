import "styles/index.scss";
import { ItemTray } from "./ItemTray";

export function Simulator() {
  return (
    <>
      <div>
        {/* <p>Add Source</p> */}
        <ItemTray onClick={undefined}></ItemTray>
      </div>
      <div>
        <p>Select Target</p>
        <ItemTray onClick={undefined} />
      </div>
      <div>
        <p>Combinations</p>
        <p>
          (Todo: List all possible combinations, and potential combinations
          here)
        </p>
      </div>
    </>
  );
}
