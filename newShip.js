// const getRandomGridSquare = (grid) => {
//   const x = Math.floor(Math.random() * 10 + 1);
//   const y = Math.floor(Math.random() * 10 + 1);

//   return { x, y };
// };

const getNewShipGridLocations = (startPoint, axis, length) => {
  let shipLocations = [];

  const fixedAxis = axis === "horizontal" ? "y" : "x";
  const variableAxis = fixedAxis === "x" ? "y" : "x";

  for (let i = startPoint[variableAxis]; i < startPoint[variableAxis] + length; i++) {
    shipLocations.push({
      [fixedAxis]: startPoint[fixedAxis],
      [variableAxis]: i,
    });
  }

  return shipLocations;
};

function shipWithinGrid(shipPositionArray, grid) {
  return shipPositionArray.every((position) => position.y < grid.height && position.x < grid.width);
}

// const noShipClashes = (shipPositionArray, grid) => {
//   const noShipClashes = shipPositionArray.every( (position) => {
//     let square = getSquare(grid, position.x, position.y);
//     console.log (square)
//   });

//   return noShipClashes;
// }

const newShip = (startPoint, axis, length, grid) => {
  //basic variables
  let remainingGridSquares = length;

  //get ship positions on grid
  const shipPositionArray = getNewShipGridLocations(startPoint, axis, length);
  //check if position fits on grid
  if (shipWithinGrid(shipPositionArray, grid) === false) return false;

  //check if position overlaps any other ships

  //update the grid to reference

  //create the ship object

  const hit = () => remainingGridSquares--;
  const isSunk = () => remainingGridSquares < 1;

  return { hit, isSunk, shipPositionArray };
};

module.exports = newShip;
