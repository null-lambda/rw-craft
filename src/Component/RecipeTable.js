import "./App.css";
import { ItemIcon, ItemButton } from "./Item";
import data from "../data";
import { connectedComponents, maxTwoColorableSubgraphs } from "../graph";
import _ from "lodash";
import React from "react";

// Todo: Resolve prop drilling

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

function RecipeTable({ rowHeader, colHeader, filterFn, onClick }) {
  const inner = colHeader.map((c) => rowHeader.map((r) => data.recipe[r][c]));
  if (inner.length === 0) {
    return null;
  }

  const CellData = ({ name }) => {
    if (name === null) {
      return "-";
    }
    if (name.includes("Food")) {
      const count = name.split("-")[1];
      return (
        <span>
          <ItemIcon name="Food" />
          {count}
        </span>
      );
    }
    return <ItemIcon name={name} />;
  };

  const HeaderRow = () => (
    <tr>
      <th key="0">
        <span style={{ fontSize: "20px" }}>+</span>
      </th>
      {rowHeader.map((name) => (
        <th key={name}>
          <ItemButton name={name} onClick={() => onClick(name)} />
        </th>
      ))}
    </tr>
  );

  const Row = ({ idx }) => (
    <tr>
      <th key={-1}>
        <ItemButton
          name={colHeader[idx]}
          onClick={() => onClick(colHeader[idx])}
        />
      </th>
      {inner[idx].map((name, j) => (
        <td key={j} className={!filterFn(name) ? "fade" : undefined}>
          <CellData name={name} />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="wrapper">
      <table>
        <tbody>
          <HeaderRow />
          {colHeader.map((_, i) => (
            <Row key={i} idx={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SourceTables({ onClick, targets }) {
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
    <div className="recipe-table">
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

function DestTable({ onClick, targets }) {
  if (targets.length > 1) {
    return null;
  }

  let rowHeader = data.sources;
  let colHeader = _.intersection(targets, data.sources);

  return (
    <RecipeTable
      rowHeader={rowHeader}
      colHeader={colHeader}
      filterFn={(_) => true}
      onClick={onClick}
    />
  );
}

export function RecipeDisplay({ onClick, targets }) {
  return (
    <>
      <SourceTables onClick={onClick} targets={targets} />
      {/* <DestTable onClick={onClick} targets={targets} /> */}
    </>
  );
}
