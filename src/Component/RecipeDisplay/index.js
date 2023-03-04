import _ from "lodash";
import { ItemIcon } from "../Item";
import data from "../../data";
import React, { useState } from "react";
import { ItemTray } from "../ItemTray";
import { connectedComponents, maxTwoColorableSubgraphs } from "../../graph";
import { RecipeTable } from "./RecipeTable";

function decomposeHeader(filterFn, header) {
  const graph = header.map((r) =>
    header.map((c) => filterFn(data.recipe[r][c]))
  );
  const components = connectedComponents(graph)
    .filter((vs) => vs.length >= 2)
    .map((component) => component.sort((a, b) => a - b));
  return components.map((idx) => idx.map((i) => header[i]));
}

// Remove all rows and columns holding duplicate infos, for better readability.
function removeDuplicateHeaders(filterFn, header) {
  const graph = header.map((r) =>
    header.map((c) => filterFn(data.recipe[r][c]))
  );

  let coloredSubgraphs = maxTwoColorableSubgraphs(
    graph,
    graph.map((_, i) => i)
  );
  coloredSubgraphs = [
    ...coloredSubgraphs,
    ...coloredSubgraphs.map(([vs1, vs2]) => [vs2, vs1]),
  ];

  const count = graph.map((row) => _.sumBy(row, (b) => Number(b)));
  let [idx1, idx2] = _.maxBy(coloredSubgraphs, ([vs1, vs2]) => {
    const rest = _.difference(
      graph.map((_, i) => i),
      vs1,
      vs2
    );
    const score1 = _.sum(rest.map((r) => -count[r]));
    const score2 = vs1.length;
    // const score2 = -vs1.length;
    return score1 * 1000 + score2;
  });

  idx1.sort((a, b) => a - b);
  idx2.sort((a, b) => a - b);

  const score1 = (i) => -_.sum(graph[i].map((b) => Number(b)));
  idx1 = _.sortBy(idx1, score1);
  idx2 = _.sortBy(idx2, score1);

  const rest = _.difference(
    graph.map((_, i) => i),
    idx1,
    idx2
  );
  let rowHeader = [...rest, ...idx1].map((i) => header[i]);
  let colHeader = [...rest, ...idx2].map((i) => header[i]);

  return { rowHeader, colHeader };
}

function SourceDisplay({ onClick, targets }) {
  let headers = [data.sources];
  let header = data.sources;

  const targets_ = new Set(targets);
  const filterFn = (name) => targets_.has(name);

  // Filter table row and column
  header = header.filter((r) =>
    header.some((c) => filterFn(data.recipe[r][c]))
  );
  if (header.length === 0) {
    return null;
  }

  headers = decomposeHeader(filterFn, [...header]);

  headers = headers.map((header) => {
    // header = _.sortBy(header, x => data.order.color[x]);
    let { rowHeader, colHeader } = removeDuplicateHeaders(filterFn, [
      ...header,
    ]);
    return { rowHeader, colHeader };
  });

  return (
    <div className="source-display">
      {headers.map((props, idx) => (
        <RecipeTable
          key={idx}
          {...props}
          filterFn={filterFn}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

function DestDisplay({ onClick, targets }) {
  if (targets.length !== 1) {
    return null;
  }
  const target = [targets];

  let rowHeader = data.sources;
  let colHeader = _.intersection(targets, data.sources);

  rowHeader = rowHeader.filter((src) => data.recipe[src][target] !== null);
  rowHeader = _(rowHeader)
    .sortBy((src) => data.order.color[data.recipe[src][target]])
    .value();
  // console.log(_(rowHeader).groupBy());

  return (
    <div className="dest-display">
      <RecipeTable
        rowHeader={rowHeader}
        colHeader={colHeader}
        filterFn={(_) => true}
        onClick={onClick}
      />
    </div>
  );
}

export function RecipeDisplay() {
  const [target, setTarget] = useState(null);
  const targets = (() =>
    target === null
      ? []
      : target === "all"
      ? [...data.targets, "Food-3", "Food-4", "Food-5"]
      : [target])();

  const onClick = (name) => {
    setTarget(name);
  };

  return (
    <>
      <div>
        <ItemTray onClick={setTarget} />
      </div>
      <div>
        {target !== "all" && (
          <>
            <h2>{target}</h2>
            <p>
              <ItemIcon name={target} />
            </p>
          </>
        )}
      </div>
      <SourceDisplay onClick={onClick} targets={targets} />
      <DestDisplay onClick={onClick} targets={targets} />
    </>
  );
}
