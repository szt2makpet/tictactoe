let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

let p1Counter = 1;
let p2Counter = 1;

class Player {
    constructor() {
        this.isTurn = false;
        this.win = false;
    }
}

class Space {
    constructor(id) {
        this.played = false;
        this.id = id;
    }

    addSymbolX(space) {
        $(space).append("<div class='x'>X</div>");
    }

    addSymbolO(space) {
        $(space).append("<div class='o'>O</div>");
    }
}

//create players
const player1 = new Player();
const player2 = new Player();

//create spaces
const spaces = [];

for (let i = 0; i < 9; i++) {
    spaces.push(new Space(i + 1));
}

//switch turns
function switchTurns(one, two) {
    one.isTurn = true;
    two.isTurn = false;
}

// Function to check if a player wins
function checkWin(player, symbol) {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (const combo of winningCombinations) {
        if (combo.every(space => board[Math.floor((space - 1) / 3)][(space - 1) % 3] === symbol)) {
            player.win = true;
            return true;
        }
    }

    return false;
}

//gameplay
player1.isTurn = true;

$('.grid').on('click', (e) => {
    if (player1.win !== true && player2.win !== true) {
        const spaceId = parseInt(e.target.id);
        const space = spaces[spaceId - 1];

        if (!space.played) {
            if (player1.isTurn) {
                space.addSymbolX(e.target);
                board[Math.floor((spaceId - 1) / 3)][(spaceId - 1) % 3] = 'x';
                switchTurns(player2, player1);
                space.played = true;
                if (checkWin(player1, 'x')) {
                    $('.header').text('Player One Wins!');
                    $('.header').css('color', 'tomato');
                    $('.p1').text('Player 1: ' + p1Counter);
                    p1Counter += 1;
                }
            } else {
                space.addSymbolO(e.target);
                board[Math.floor((spaceId - 1) / 3)][(spaceId - 1) % 3] = 'o';
                switchTurns(player1, player2);
                space.played = true;
                if (checkWin(player2, 'o')) {
                    $('.header').text('Player Two Wins!');
                    $('.header').css('color', '#33DBFF');
                    $('.p2').text('Player 2: ' + p2Counter);
                    p2Counter += 1;
                }
            }
        }
    }
});

$('.reset').on('click', () => {
    player1.isTurn = true;
    player2.isTurn = false;
    player1.win = false;
    player2.win = false;
    $('.x').remove();
    $('.o').remove();
    $('.header').text('Tic Tac Toe');
    board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];

    for (const space of spaces) {
        space.played = false;
    }
});
