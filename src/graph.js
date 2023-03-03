import _ from "lodash";

// Edge-complementation of a graph. assume there is no self-edges.
export function complement(graph, vertices) {
  const clone = graph.map((row) => [...row]);
  for (const i of vertices)
    for (const j of vertices) clone[i][j] = i !== j && !clone[i][j];
  return clone;
}

// Convert adjacency matrix of a graph to adjacency list.
export function adjMatrixToList(graph) {
  return graph.map((row) =>
    row.reduce((acc, b, i) => {
      if (b) {
        acc.push(i);
      }
      return acc;
    }, [])
  );
}

export function connectedComponents(graph) {
  const vertices = _.range(graph.length);
  const components = [];
  const visited = new Set();

  for (const start of vertices) {
    if (!visited.has(start)) {
      visited.add(start);
      const component = [];
      const dfs_visit = (v) => {
        visited.add(v);
        component.push(v);
        for (const u of vertices) {
          if (graph[v][u] && !visited.has(u)) {
            dfs_visit(u);
          }
        }
      };
      dfs_visit(start);
      components.push(component);
    }
  }

  return components;
}

// Bron-Kerbosch algorithm
// find all maximal cliques of a connected graph
// https://en.wikipedia.org/wiki/Bron%E2%80%93Kerbosch_algorithm
export function bronKerbosch(graph, vertices) {
  const maximal_cliques = [];
  const neighbors = adjMatrixToList(graph).map((xs) => new Set(xs));

  const intersection = (a, b) => new Set([...a].filter((x) => b.has(x)));
  // const difference = (a, b) => new Set([...a].filter(x => !b.has(x)));
  const rec = (candidate, remained, banned) => {
    if (remained.size === 0) {
      if (banned.size === 0) {
        maximal_cliques.push(candidate);
      }
      return;
    }

    // Choose any point to reduce the number of the recursion
    const pivot = remained.values().next().value;
    for (const v of remained) {
      if (!neighbors[pivot].has(v)) {
        rec(
          [...candidate, v],
          intersection(remained, neighbors[v]),
          intersection(banned, neighbors[v])
        );
        remained.delete(v);
        banned.add(v);
      }
    }
  };

  // Todo: apply degeneracy ordering on initial vertices for speedup
  vertices = _.sortBy(vertices, (v) => _.sumBy(neighbors[v], (b) => Number(b)));

  rec([], new Set(vertices), new Set());
  return maximal_cliques;
}

// Maximum independent subset of a graph
export function maxIndependentSubset(graph, vertices) {
  // vertices ??= _.range(graph.length);
  const maximal_cliques = bronKerbosch(complement(graph, vertices), vertices);
  const maximum_clique =
    _.maxBy(maximal_cliques, (clique) => clique.length) ?? [];

  return maximum_clique;
}

// List all induced subgraphs with 2-coloring, which has maximum number of vertex cardinality
export function maxTwoColorableSubgraphs(graph, vertices) {
  const cliques1 = bronKerbosch(complement(graph, vertices), vertices);
  let colorings = [[[], []]];
  for (const vs1 of cliques1) {
    const vertices_rest = _.difference(vertices, vs1);
    let cliques2 = bronKerbosch(
      complement(graph, vertices_rest),
      vertices_rest
    );

    const k = Math.max(0, ...cliques2.map((vs) => vs.length));
    cliques2 = cliques2.filter((vs) => vs.length === k);

    if (k > 0) {
      colorings.push(...cliques2.map((vs2) => [vs1, vs2]));
    }

    for (const clique2 in cliques2) {
      console.assert(_.intersection(vs1, clique2).length === 0);
    }
  }

  const keys = colorings.map(([vs1, vs2]) => vs1.length + vs2.length);
  const m = Math.max(...keys);
  colorings = colorings.filter((_, i) => keys[i] === m);

  return colorings;
}
