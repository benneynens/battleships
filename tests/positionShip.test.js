const shipPositionNoClash = require("../positionShip");

const existingShipPositions = [
  { x: 1, y: 2 },
  { x: 3, y: 6 },
  { x: 3, y: 7 },
  { x: 3, y: 8 },
  { x: 4, y: 9 },
  { x: 4, y: 10 },
];

test.skip("ship position disallowed when overlapping another ship", () => {
  let thisShipPosition = { x: 4, y: 9 };

  expect(
    shipPositionNoClash(thisShipPosition, existingShipPositions)
  ).toBeFalsy();
});

test.skip("ship position allowed when not overlapping another ship", () => {
  let thisShipPosition = { x: 4, y: 5 };

  expect(
    shipPositionNoClash(thisShipPosition, existingShipPositions)
  ).toBeTruthy();
});

// test("ship position disallowed when it is outside of the grid");

// test(
//   "ship position disallowed when it would result in a ship not on the same line"
// );
