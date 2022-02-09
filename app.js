const { randomNumber } = require("./utilities");

const buildGrid = (height, width) => {
  //create the basic grid array
  let gridArray = [];
  for (let y = 0; y < height; y++) {
    let rowArray = [...Array(width)].map((unused, x) => {
      return { x, y, shipObject: null, bombed: false };
    });
    gridArray = [...gridArray, ...rowArray];
  }

  return { array: gridArray, height, width };
};

const grid = (height, width) => {
  const grid = buildGrid(height, width);
  const ships = [];

  const checkShipFits = (shipWaypoints) => {
    return shipWaypoints.every((position) => position.y < grid.height && position.x < grid.width);
  };
  const checkShipNoCrash = (newShipWaypoints) => {
    return newShipWaypoints.every((waypoint) => {
      let targetGridSquare = getSquare(grid, waypoint.x, waypoint.y);
      return targetGridSquare.shipObject === null;
    });
  };
  const addShip = (newShipWaypoints) => {
    const newShipObject = ship(newShipWaypoints);
    ships.push(newShipObject);
    addShipToGrid(newShipWaypoints, newShipObject, grid);
  };

  const bomb = (x, y) => {
    let targetGridSquare = getSquare(grid, x, y);
    targetGridSquare.bombed = true;
    //hit ship
    if (targetGridSquare.shipObject !== null) {
      targetGridSquare.shipObject.hit();
    }
  };

  const checkSquareBombed = (x, y) => {
    let targetGridSquare = getSquare(grid, x, y);
    return targetGridSquare.bombed;
  };

  const checkRemainingShips = () => ships.filter((ship) => ship.isSunk() === false).length;

  const gridSize = { width: grid.width, height: grid.height };

  return {
    checkShipFits,
    addShip,
    checkShipNoCrash,
    bomb,
    checkRemainingShips,
    gridSize,
    checkSquareBombed,
  };
};

const getSquare = (grid, x, y) => {
  return grid.array.filter((object) => object.y === y && object.x === x)[0];
};

const addShipToGrid = (newShipWaypoints, newShipObject, grid) => {
  newShipWaypoints.forEach((waypoint) => {
    let targetGridSquare = getSquare(grid, waypoint.x, waypoint.y);
    targetGridSquare.shipObject = newShipObject;
  });
};

const ship = (newShipWaypoints) => {
  let remainingLives = newShipWaypoints.length;
  const hit = () => remainingLives--;
  const isSunk = () => remainingLives < 1;

  return { hit, isSunk };
};

const proposedShip = (startPoint, orientation, length) => {
  let shipLocations = [];

  const fixedAxis = orientation === "horizontal" ? "y" : "x";
  const variableAxis = fixedAxis === "x" ? "y" : "x";

  for (let i = startPoint[variableAxis]; i < startPoint[variableAxis] + length; i++) {
    shipLocations.push({
      [fixedAxis]: startPoint[fixedAxis],
      [variableAxis]: i,
    });
  }

  return shipLocations;
};

const player = (name, opponentGrid) => {
  const getName = () => name;

  const launchAttack = (coordinates) => {
    if (coordinates === undefined) {
      let alreadyBombed;
      while (coordinates === undefined || alreadyBombed === true) {
        //generate random coordinates
        coordinates = {
          x: randomNumber(0, opponentGrid.gridSize.width - 1),
          y: randomNumber(0, opponentGrid.gridSize.height - 1),
        };
        //check if the random waypoint has been attacked already
        alreadyBombed = opponentGrid.checkSquareBombed(coordinates.x, coordinates.y);
      }
    }
    //place the attack on the opponents grid
    opponentGrid.bomb(coordinates.x, coordinates.y);
  };
  return { launchAttack };
};

module.exports = { proposedShip, grid, player };
