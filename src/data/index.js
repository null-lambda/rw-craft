import convert from "color-convert";
import _ from "lodash";
import preData from "./generated.js";

let { sources, targets, recipe, order, iconColor } = preData;

const items = _([...sources, ...targets])
  .uniq()
  .value();
// order["name"] = Object.fromEntries;

order["color"] = Object.fromEntries(
  Object.keys(order.name).map((name) => {
    const rgb = iconColor[name] ?? [0, 0, 0];
    const [h, s, l] = convert.rgb.hsl(...rgb);
    console.log(rgb, h, s, l);
    const h_shift = (h + 20) % 360;
    const score = h_shift + (s < 100 * 0.5 ? 1e6 : 0) * l;
    return [name, score];
  })
);

const data = { sources, targets, items, recipe, order };
export default data;
