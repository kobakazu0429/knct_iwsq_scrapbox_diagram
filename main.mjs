import fs from "node:fs/promises";
import Viz from "viz.js"
import { Module, render } from "viz.js/full.render.js";

const dirBoth = (dot) => {
  const regex = /n(\d+)\s->\sn(\d+)/
  const notNodes = dot.split("\n").filter(line => !regex.exec(line));
  const nodes = dot.split("\n").map(line => regex.exec(line)).filter(Boolean)

  const map = {}
  for (const [_, n1, n2] of nodes) {
    if (!map[n1]) map[n1] = new Set();
    map[n1].add(n2)
  }

  const oneWayNodes = [];
  const twoWayNodes = [];

  Object.keys(map).forEach(n1 => {
    for (const n2 of map[n1]) {
      if (map[n2] && map[n2].has(n1)) {
        twoWayNodes.push([n1, n2])
        map[n2].delete(n1);
      } else {
        oneWayNodes.push([n1, n2])
      }
    }
  });

  const result = [
    notNodes.slice(0, -2),
    oneWayNodes.map(([n1, n2]) => `  n${n1} -> n${n2}`),
    twoWayNodes.map(([n1, n2]) => `  n${n1} -> n${n2}[dir="both"]`),
    "}"
  ];
  return result.flat().join("\n")
}


const main = async () => {
  let dot = await fs.readFile("./_work/iwsq.dot", "utf8");
  dot = dirBoth(dot)

  const viz = new Viz({ Module, render });
  const result = await viz.renderString(dot)
  // console.log(result)
  await fs.writeFile("iwsq.svg", result, "utf8");
}

main()
