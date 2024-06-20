function bfsShortestPath(start) {
  // if no coordinates in start, return
  if (start === undefined) return;

  // destructuring assignment that extraces row, x, index, and column, y, index from the input array
  const [x, y] = start;

  /* all the possible moves a knight can make from its current position */
  return [
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
    /* .filter applies a function to each element in the array 
  [a, b] destructures each move into its component row, a, and column, b 
  !(a < 0 || a > 7 || b < 0 || b > 7) returns true for moves where both a and b are within the valid range 
  moves outside this range are discarded */
  ].filter(([a, b]) => !(a < 0 || a > 7 || b < 0 || b > 7));
}
