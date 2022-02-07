const shipPositionNoClash = (newPositionCoordinates, existingShipPositions) => {
  for (let i = 0; i < existingShipPositions.length; i++) {
    if (
      existingShipPositions[i].x === newPositionCoordinates.x &&
      existingShipPositions[i].y === newPositionCoordinates.y
    )
      return false;
  }
  return true;
};

module.exports = shipPositionNoClash;
