const newShip = require("./newShip");

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
        return { xAxis: x, yAxis: y, gridSquare: newGridSquare() };
      });
      gridArray = [...gridArray, ...rowArray]
  }

  return gridArray;
};

const getTargetGridSquare = (gridArray, xAxis, yAxis) => {
    return gridArray.filter( object => object.y === gridLocation.yAxis && object.x === gridLocation.xAxis)[0];
}

const gameBoard = (height, width) => {
    const gridArray = newEmptyGrid(height, width);

    const getGridArray = () => gridArray;

    const addShip = (startPoint, axis, length) => {
        let newShipObject = newShip(startPoint, axis, length, gridArray);
        //action for if the ship can't be built
        if (newShipObject === false) {
            console.log ('can not add this ship')
            return;
        }
        //add the new ShipObject to the Grid
        newShipObject.shipPositionArray.forEach( (gridLocation) => {
            let targetGridSquare = getTargetGridSquare(gridArray, gridLocation.xAxis, gridLocation.yAxis);
            console.log (targetGridSquare);
            targetGridSquare.occupy(newShipObject);
        } );
    }

    const receiveAttack = (coordinates) => {
        //update the gridArray

        //update the Ship
    }

    return {getGridArray, addShip, receiveAttack}

}

module.exports = gameBoard