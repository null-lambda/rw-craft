import "styles/index.scss";
import { useId } from "react";

function Button({ children, ...props }) {
  return (
    <label>
      <input type="button" className="button input-box" {...props} />
      {children}
    </label>
  );
}

function Checkbox({ children, ...props }) {
  return (
    <label>
      <input type="checkbox" className="checkbox input-box" {...props} />
      {children}
    </label>
  );
}

function Radio({ children, ...props }) {
  return (
    <label className="radio">
      <input type="radio" className="radio__input appearance-none" {...props} />
      <div className="input-box input-box--30">{children}</div>
    </label>
  );
}

export { Button, Checkbox, Radio };
