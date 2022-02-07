const gameBoard = require("../buildGrid");
const newShip = require("../newShip");

const gameboard = gameBoard(10, 10);
const grid = gameboard.getGrid();


test.skip('console log', () => {
  gameboard.addShip({ x: 4, y: 5 }, "horizontal", 4);

  console.log (getSquare(gameboard.getGrid(), 7,5).gridSquare.occupiedStatus() )

});



test("ship outside grid disallowed", () => {
  let startPoint = { x: 9, y: 0 };

  expect(newShip(startPoint, "horizontal", 4, grid)).toBeFalsy();
});

test("ship inside grid is allowed", () => {
  let startPoint = { x: 4, y: 0 };

  expect(newShip(startPoint, "horizontal", 4, grid)).toBeTruthy();
});

test.skip("occupied grid cells contain a ship object", () => {
  gameboard.addShip({ x: 4, y: 5 }, "horizontal", 4);

  expect(gameboard.getGridArray()[5][4].occupiedStatus()).toBeTruthy();
});

test.skip("unoccupied cells return false when no ship", () => {
  // gameboard.addShip( { x: 4, y: 5 }, "horizontal", 4 );

    // console.log (gameboard.getGridArray())

  expect(gameboard.getGridArray()[0][3].occupiedStatus()).toBeFalsy();
});

test.skip("can not add ship over the top of an existing ship", () => {
  gameboard.addShip({ x: 4, y: 5 }, "horizontal", 4);

  expect(gameboard.addShip({ x: 4, y: 3 }, "vertical", 4)).toBeFalsy();
});

test.skip("can add ship when it does not overlap another ship", () => {
  gameboard.addShip({ x: 4, y: 5 }, "horizontal", 4);

  gameboard.addShip({ x: 8, y: 0 }, "vertical", 4);

  expect( gameboard.getGridArray()[0][8].occupiedStatus() ).toBeTruthy();
});
