import data from "./generated.js";
import convert from 'color-convert'

let { sources, targets, recipe, order, iconColor } = data;

const itemGrid = [
  ["Rubbish", "Flashbang", "Slime Mold", "Lantern", "Mushroom"],
  ["Blue Fruit", "Bubble Fruit", "Dandelion Peach", "Lillypuck", "Seed"],
  ["Adult Centipede", "Jellyfish", "Hazer", "Bubble Weed", "Glow Weed"],
  ["Spore Puff", "Beehive", "Noodlefly Egg", "Noodlefly", "Eggbug"],
  ["Batnip", "Cherrybomb", "Grenade", "Fire Egg", "Singularity Bomb"],
  ["Karma flower", "Neuron Fly", "Overseer", "Vulture Mask", "Pearl"],
  ["Batfly", "Vulture Grub"]
];


order['color'] =  Object.fromEntries(Object.keys(order.name).map(name => {
    const rgb = iconColor[name] ?? [0, 0, 0];
    const [h, s, l] = convert.rgb.hsl(...rgb);
    console.log(rgb,h,s,l);
    const h_shift = (h + 20) % 360;
    const score = h_shift + (s < 100 * 0.5 ? 1e6 : 0) * l
    return [name, score];
}));

export default { sources, itemGrid, targets, recipe, order };
