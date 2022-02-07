const app = require("../app");

const player1Grid = app.grid(10,10);

test.skip("ship within limits is allowed", () => {

    const proposedShip1 = app.proposedShip({x: 0, y:0}, 'horizontal', 4);

    expect( player1Grid.checkShipFits(proposedShip1) ).toBeTruthy();
});

test.skip("ship outside limits is not allowed", () => {

    const proposedShip1 = app.proposedShip({x: 9, y:0}, 'horizontal', 4);

    expect( player1Grid.checkShipFits(proposedShip1) ).toBeFalsy();
});

test.skip("clashing ship is rejected", () => {

    const proposedShip1 = app.proposedShip({x: 4, y:0}, 'horizontal', 4);

    player1Grid.addShip(proposedShip1);

    const proposedShip2 = app.proposedShip({x: 2, y:0}, 'horizontal', 4);

    expect( player1Grid.checkShipNoCrash(proposedShip2) ).toBeFalsy();
});

test("non clashing ship is accepted", () => {

    const proposedShip1 = app.proposedShip({x: 4, y:0}, 'horizontal', 4);

    player1Grid.addShip(proposedShip1);

    const proposedShip2 = app.proposedShip({x: 4, y:1}, 'horizontal', 4);

    expect( player1Grid.checkShipNoCrash(proposedShip2) ).toBeTruthy();
});
