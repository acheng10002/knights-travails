/* graph - data structure used to represent relationships between pairs of objects 
vertex - points in the graph ex. u or v
edge - line connecting vertices ex. edge connecting u and v is (u, v) 
undirected graph - edges connecting vertices in either direction are the same 
    incident - how an edge between two vertices is in an undirected graph
    adjacent/neighbors - how vertices that are connected by an edge are in an undirected graph
    degree - the number of edges incident on a vertex
path - distance between two non-adjacent vertices
shortest path - path between two vertices with the fewest edges
cycle - when a path goes from a particular vertex back to itself
sometimes, numeric values are put on edges 
ex. a road map is an undirected graph
    cities are vertices
    roads are edges
    values on edges indivating distance of each road
weight - number that is put on an edge, making the graph a weighted graph
    if I want to find the shortest route between two locations, I'm looking for a path between 
    two vertices with minimum sum of edge weights over all paths between the two vertices 

directed graph - relationships between vertices don't necessarily go both ways 
directed acyclic graph (dag) - directed graphs with no cycles 
weighted directed graphs ex. road maps with one-way streets and road distances
in a directed graph,
    edges are directed
    a directed edge leaves one vertex and enters another
    a directed edge that leaves vertex u and enters vertex v is denoted by (u, v) and their order matters
out-degree - number of edges leaving a vertex
in-degree - number of edges entering a vertex 
V - vertex set
E - edge set 
|| notation to denote the size of a set 
theta(|V|) - running time that is linear in the number of vertices 

3 ways to represent graphs
3 criteria:
1. how much memory or space I need in each representation
2. how long it takes to determine whether a given edge is in the graph
3. how long it takes to find the neighbors of a given vertex

typically, vertices are numbered, |V| vertices from 0 to |V| - 1

3 graph representations
1. edge list - array
   ex. one edge = array of 2 vertices
       array of objects containing the vertex numbers of the vertices that the edges are incident on
       (if edges have weights, add either a third element to the array or more info to the object, fiving the edge's weight)
total space for an edge list is theta |E|  
   ex. [ [0,1], [0,6], [0,8], [1,4], [1,6], [1,9], [2,4], [2,6], [3,4], [3,5], [3,8], [4,5], [4,9], [7,8], [7,9] ]

2. adjacency matrices
adjacency matric - |V| x |V| matrix of 0s and 1s, where the entry in row i and column j is 1 if and only if the edge (i, j) is in the graph 
    to indicate an edge weight, put it in the row i, column j entry
    reserve a special value, maybe null, to indicate an absent edge

[ [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 0] ]

total time to find the edge is constant because I'm just looking up the entry
total space for an adjacency matrix is theta (V^2)
another disadvantage, if I want to find out which vertices are adjacent to a given vertex i, I have to look at all |V| entries in row i, 
even if only a small number of vertices are adjacent to vertex i 

ex. adjacency matrix is named graph
    look at graph [i][j] to query whether edge is in the graph

adjacency matrix for an undirected graph is symmetric: row i, column j entry is 1 if and only if the row j, column i entry is 1

3. adjacency lists
for each vertex i, store an array of the vertices adjacent to it
usually have an array of |V| adjacency lists, one adjacency list per vertex
[ [1, 6, 8],
  [0, 4, 6, 9],
  [4, 6],
  [4, 5, 8],
  [1, 2, 3, 5, 9],
  [3, 4],
  [0, 1, 2],
  [8, 9],
  [0, 3, 7],
  [1, 4, 7] ]

  vertex numbers in an adjacency list are not required to appear in order, though it's convenient to list them in increasing order
  total time to find the edge is constant, because I just have to index into an array
    go to i's adjacency list, look for j in i's adjacency list
    in the worse case, it takes theta (d) where d is the degree of vertex i (degree is the number of edges incident on a vertex
        degree of vertex i could be as high as |V| - 1 (if i is adjacent to all the other |V| - 1 vertices, or as low as 0, if i is isolated with no incident edges)
    in an undirected graph, vertex j is in vertex i's adjacency list if and only if i is in j's adjacency list
  if the graph is weight, each item in each adjacency list is either a two-item array or an object, giving the vertex number and the edge weight
  total space for adjacency list, the adjacency lists for an undirected graph contain 2|E| elements
    because each edge (i, j) appears exactly twice in the adjacenecy lists, once in i's list and once in j's list and there are |E| edges
  total space for adjacency lists for a directed graph is 2|E|

I can use a for-loop to iterate through the vertices in an adjacency list
I have an adjacency-list representation of a graph in the variable graph,
    graph[i] is an array containing the neighbors of vertex i
    // calls doStuff on each vertex adjacent to vertex i
    for (let j = 0; j < graph[i].length; j++) {
        doStuff(graph[i][j]);

    OR

    let vertex = graph[i];
    for (let j; j < vertex.length; j++) {
        doStuff(vertex[j]);

  */

/* graph is an adjacency list where each node maps to a list of neighbors the knight can move to */
function bfs(graph, startNode) {
  // INITIALIZATION
  // queue will manage nodes to visit/review in a FIFO order, enqueues the startNode/source node
  let queue = [startNode];

  // initializes a distances object to store the distance (number of edges from the startNode to each node)
  let distances = {};

  // set the startNode's distance from the startNode as 0
  distances[startNode] = 0;

  // REPETITION
  // as long as there are nodes in the queue, ensures all nodes reachable from the startNode are visited
  while (queue.length > 0) {
    // TRAVERSAL
    // dequeue a node from the front of the queue and assigns it to currentNode, the active node being processed
    let currentNode = queue.shift();

    // mark the node as being visited, traces the order of node visits during BFS traversal
    console.log(`Currently visiting node: ${currentNode}`);

    /* iterates over each neighbor of the currentNode
    neighbors are retrieved from the adjacency list, graph[currentNode] */
    graph[currentNode].forEach((neighbor) => {
      /* checks if a neighbor has not been visited by seeing if it's absent in the distances object,
      undefined entry means the neighbor hasn't been visited */
      if (distances[neighbor] === undefined) {
        /* assigns the distance to the neighbor, it's one more than the distance to the currentNode, 
        counting the number of edges from the startNode */
        distances[neighbor] = distances[currentNode] + 1;

        // adds the neighbor to the queue for subsequent processing
        queue.push(neighbor);
      }
    });
  }
  /* returns the distances object, which contains the shortest paths from the startNode to about its reachable nodes
  distances object is a map of node distances */
  return distances;
}

const graph = {
  A: ["B", "C", "D"],
  B: ["E"],
  C: ["B", "E", "F"],
  D: ["G", "H"],
  E: ["I"],
  F: [],
  G: ["J"],
  H: [],
  I: [],
  J: [],
};

const startNode = "A";
const nodeDistances = bfs(graph, startNode);
console.log("Shortest path distances from node A:", nodeDistances);

/* 
let graph = {
  '(0, 0)': ['(1, 2)', '(2, 1)'], 
  '(0, 1)': ['(1, 3)', '(2, 0)', '(2, 2)'],
  '(0, 2)': ['(1, 0)', '(1, 4)', '(2, 1)', '(2, 3)']
};
*/

function bfsShortestPath([x, y]) {
  let start = [x, y];
  return [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y - 2],
  ].filter(([a, b]) => !(a < 0 || a > 7 || b < 0 || b > 7));
}
