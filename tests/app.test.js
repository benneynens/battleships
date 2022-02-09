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

test.skip("non clashing ship is accepted", () => {

    const proposedShip1 = app.proposedShip({x: 4, y:0}, 'horizontal', 4);

    player1Grid.addShip(proposedShip1);

    const proposedShip2 = app.proposedShip({x: 4, y:1}, 'horizontal', 4);

    expect( player1Grid.checkShipNoCrash(proposedShip2) ).toBeTruthy();
});

test.skip('game over accurate when all ships of player are sunk', () => {
    const proposedShip1 = app.proposedShip({x: 0, y:0}, 'horizontal', 2);

    player1Grid.addShip(proposedShip1);

    player1Grid.bomb(0,0);

    player1Grid.bomb(1,0);

    expect(player1Grid.checkRemainingShips()).toBe(0);
})

test.skip('game over accurate when ship/s remain unsunk', () => {
    const proposedShip1 = app.proposedShip({x: 0, y:0}, 'horizontal', 2);

    player1Grid.addShip(proposedShip1);

    player1Grid.bomb(2,2);

    player1Grid.bomb(4,5);

    expect(player1Grid.checkRemainingShips()).toBeGreaterThan(0);
})

test('status of opponents grid square changes after bombing', () => {
    const player2Grid = app.grid(10,10);

    const player1 = app.player('P1', player2Grid );

    // const player2 = app.player('P2', player1Grid);

    player1.launchAttack({x: 0,y: 0});

    expect(player2Grid.checkSquareBombed(0,0)).toBeTruthy();
})