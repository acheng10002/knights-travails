// each position is a node with three attributes
class Position {
  constructor(value = null, parent = null, moveCount = 0) {
    // value ex. [2, 1], array with the x and y indices of the position
    this.value = value;
    // parent ex. [0, 0], array of the x and y indices of the position prior to this one
    this.parent = parent;
    // number of moves taken to reach this position from the start
    this.moveCount = moveCount;
  }
}

// uses a breadth-first search algorithm to find the shortest path between two chess positions
function knightMoves(start, end) {
  if (!start || !end) {
    return null;
  }
  // INITIALIZATION- start position is an instance of Position; start position has no parent, so parent is null by default
  let startPosition = new Position(start, null, 0);

  // use an array as the queue and add the start position to it; the queue manages positions to visit in a FIFO order
  let queue = [startPosition];

  // set object stores unique values of any time, add the same value to a Set does not increase the Set's size or affect the Set's contents
  let moveTo = new Set();

  /* JS objects are compared by reference not by value, so two objects or two arrays with identical contents are considered
  different if they do not reference the exact same instance 
  this way, positions added to moveTo can be compared to positions already in moveTo, and there won't be duplicates */
  moveTo.add(start.toString());

  // TRAVERSAL/REPETITION
  // continue as long as there are possible moves, ensures all possible moves from the start position are visited
  while (queue.length > 0) {
    // dequeues a position from the start of the queue, and it will now be processed
    let currentPosition = queue.shift();

    // if the currentPosition's x (.value[0]) and y (.value[1]) match the endPosition's x and y value
    if (
      currentPosition.value[0] === end[0] &&
      currentPosition.value[1] === end[1]
    ) {
      console.log(
        `=> You made it in ${currentPosition.moveCount} move(s)! Here's your path:`
      );
      /* COMPLETION - log the path that got to the end position; at the end of the BFS I have a map of positions that tell me the shortest path in terms of 
      number of edges/moves from the start position to the end position */
      reconstructPath(currentPosition);
      return;
    }

    // generate and process all possible moves from this position, passing in the position as an array
    let moves = generateMoves(currentPosition.value);

    // iterate over each possible next position from the current position
    moves.forEach((move) => {
      // if the next position hasn't been marked as visited
      if (!moveTo.has(move.toString())) {
        // mark it as visited
        moveTo.add(move.toString());
        // instantiate the move as a position with Position.value of move, Position.parent of currentPosition, and increments Position.moveCount
        let nextPosition = new Position(
          move,
          currentPosition,
          currentPosition.moveCount + 1
        );
        // enqueue the move/next position and repeat the process until the queue is empty, indicating that all possible moves have been visited
        queue.push(nextPosition);
      }
    });
  }
}

// returns all possible moves from a start position
function generateMoves(start) {
  // if no coordinates in start, log an error and return an empty array
  if (!Array.isArray(start) || start.length !== 2) {
    console.error("Invalid start position provided.");
    return [];
  }

  // destructuring assignment that extraces row, x, index, and column, y, index from the input array
  const [x, y] = start;

  /* all the possible moves a knight can make from its current position */
  const moves = [
    // move two squares along the x axis and one square along the y axis
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    // move one square along the x axis and two squares along the y axis
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y - 2],
    // filter out moves that fall below 0 or above 7
    /* .filter applies a function to each element in the array; [a, b] destructures each move into its component row, a, and column, b 
  !(a < 0 || a > 7 || b < 0 || b > 7) returns true for moves where both a and b are within the valid range 
  moves outside this range are discarded */
  ];
  return moves.filter(([a, b]) => !(a < 0 || a > 7 || b < 0 || b > 7));
}

// reconstructs the shortest path from the start position to the end position and logs it
function reconstructPath(endPosition) {
  let current = endPosition;
  let path = [];

  // trace the path from end position back to the start position
  while (current) {
    // add each position to the front, so that when positions are logged, they're logged from start to end
    path.unshift(current.value);
    // traverse backward on the path back to the start position
    current = current.parent;
  }
  // for each position added to the path, log the positions from the front to the back
  path.forEach((position, index) => {
    console.log(`[${position[0]}], [${position[1]}]`);
  });
}
knightMoves([0, 0], [2, 1]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
