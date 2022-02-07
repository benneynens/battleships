const newShip = require("./newShip");
const getSquare = require("./getSquare");

const newGridSquare = () => {
  let bombed = false;
  let ship = null;

  const bomb = () => (bombed = true);
  const occupy = (object) => (ship = object);

  const bombedStatus = () => bombed;
  const occupiedStatus = () => ship;

  return { bomb, occupy, bombedStatus, occupiedStatus };
};

const newEmptyGrid = (height, width) => {
  //create the basic grid array
  let gridArray = [];
  for (let y = 0; y < height; y++) {
    let rowArray = [...Array(width)].map((unused, x) => {
      return { x, y, gridSquare: newGridSquare() };
    });
    gridArray = [...gridArray, ...rowArray];
  }

  return { array: gridArray, height, width };
};

const gameBoard = (height, width) => {
  const grid = newEmptyGrid(height, width);

  const getGrid = () => grid;

  const addShip = (startPoint, axis, length) => {
    let newShipObject = newShip(startPoint, axis, length, grid);
    //action for if the ship can't be built
    if (newShipObject === false) {
      console.log("can not add this ship");
      return;
    }
    //add the new ShipObject to the Grid
    newShipObject.shipPositionArray.forEach((position) => {
      let target = getSquare(grid, position.x, position.y);
      target.gridSquare.occupy(newShipObject);
    });
  };

  const receiveAttack = (coordinates) => {
    //update the gridArray
    //update the Ship
  };

  return { getGrid, getSquare, addShip, receiveAttack };
};

module.exports = gameBoard;
