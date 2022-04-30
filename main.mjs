import fs from "node:fs/promises";
import Viz from "viz.js"
import { Module, render } from "viz.js/full.render.js";

async function main() {
  const dot = await fs.readFile("./_work/iwsq.dot", "utf8");
  const viz = new Viz({ Module, render });
  const result = await viz.renderString(dot)
  // console.log(result)
  await fs.writeFile("iwsq.svg", result, "utf8");
}

main()
