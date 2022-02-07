const { moduleExpression } = require("@babel/types");


const getRandomGridSquare = (grid) => {
    const x = Math.floor((Math.random() * 10) + 1);
    const y = Math.floor((Math.random() * 10) + 1);

    return {x, y}
}

const getNewShipGridLocations = (startPoint, axis, length) => {
    let shipLocations = [];
  
    const fixedAxis = axis === "horizontal" ? "y" : "x";
    const variableAxis = fixedAxis === "x" ? "y" : "x";
  
    for (
      let i = startPoint[variableAxis];
      i < startPoint[variableAxis] + length;
      i++
    ) {
      shipLocations.push({
        [fixedAxis]: startPoint[fixedAxis],
        [variableAxis]: i,
      });
    }

    return shipLocations;
  };

function shipWithinGrid(shipPosition, grid) {
    console.log (shipPosition)
    console.log (grid)

    return shipPosition.every( (object) => object.y <= grid.length - 1 && object.x <= grid[0].length -1 )

    // shipPosition.forEach(object => {
    //     if (object.y > grid.length - 1 || object.x > grid[0].length -1) return false;
    // });
    // return true;
}

const newShip = (startPoint, axis, length, grid) => {
    //basic variables
    let remainingGridSquares = length;


    //get ship positions on grid
    const shipPositionArray =  getNewShipGridLocations(startPoint, axis, length);
  //check if position fits on grid
    if ( shipWithinGrid (shipPositionArray, grid) === false ) return false;

  //check if position overlaps any other ships

  //update the grid to reference

  //create the ship object

  const hit = () => remainingGridSquares--;
  const isSunk = () => remainingGridSquares < 1;

  return { hit, isSunk, shipPositionArray };
};

module.exports = newShip;