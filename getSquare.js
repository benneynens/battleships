function getSquare(grid, x, y) {
  return grid.array.filter((object) => object.y === y && object.x === x)[0];
}

module.exports = getSquare;
