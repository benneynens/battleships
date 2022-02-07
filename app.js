const buildGrid = (height, width) => {
  //create the basic grid array
  let gridArray = [];
  for (let y = 0; y < height; y++) {
    let rowArray = [...Array(width)].map((unused, x) => {
      return { x, y, shipObject: null };
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

  const bomb = (x, y) => {};

  const checkRemainingShips = () => {};

  const returnGrid = () => grid;

  return { checkShipFits, addShip, returnGrid /*temp*/, checkShipNoCrash };
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

module.exports = { proposedShip, grid };
