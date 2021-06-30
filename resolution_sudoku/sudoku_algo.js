const square_coordinates = [
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9]
];


function get_row(board, row) {
    return board[row];
}

function get_column(board, column) {
    const col = [];
    for (let row = 0; row < 9; row++) {
        col.push(board[row][column]);
    }
    return col;
}

function get_square(board, square) {
    const cells = [];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (square === square_coordinates[r][c]) {
                cells.push(board[r][c]);
            }
        }
    }
    return cells;
}

function complete_cell(board, r, c) {
    const used = [...get_row(board, r), ...get_column(board, c), ...get_square(board, square_coordinates[r][c])];
    const possibilities = [];
    for (let p = 1; p <= 9; p++) {
        if (!used.includes(p)) {
            possibilities.push(p);
        }
    }
    if (possibilities.length === 1) {
        board[r][c] = possibilities[0];
        return true;
    } 
        board[r][c] = possibilities;
        return false;
    
}

function appears_once_only(board, possibilities, segment, r, c) {
    let updated = false;
    for (let i = 0; i < possibilities.length; i++) {
        const possibility = possibilities[i];
        let counter = 0;
        segment.forEach(cell => {
            if (Array.isArray(cell)) {
                if (cell.includes(possibility)) {
                    counter++;
                }
            } else if (cell === possibility) {
                    counter++;
                }
        });
        if (counter === 1) {
            board[r][c] = possibility;
            updated = true;
            break;
        }
    }
    return updated;
}

function compare(expected, actual) {
    const array1 = expected.slice();
    const array2 = actual.slice();
    return array1.length === array2.length && array1.sort().every((value, index) => value === array2.sort()[index]);
}

// true si board (complété) est valide, false sinon
export function is_solved(board) {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let valid = true;
    for (let r = 0; r < 9 && valid === true; r++) {
        if (!compare(expected, get_row(board, r))) {
            valid = false;
        }
    }
    for (let c = 0; c < 9 && valid === true; c++) {
        if (!compare(expected, get_column(board, c))) {
            valid = false;
        }
    }
    for (let q = 1; q < 9 && valid === true; q++) {
        if (!compare(expected, get_square(board, q))) {
            valid = false;
        }
    }
    return valid;
}

export function is_completed (board) {
    let valid = true;
    for (let r = 0; r < 9 && valid === true; r++) {
        for (let c = 0; c < 9 && valid === true; c++) {
            valid = (board[r][c] !== 0);
        };
    };
    return valid;
}

function backtrack_based(orig_board) {
 
    const board = JSON.parse(JSON.stringify(orig_board));

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) {
                complete_cell(board, r, c);
                if (is_solved(board)) return board;
                const cell = board[r][c];
                if (Array.isArray(cell)) {
                    for (let i = 0; i < cell.length; i++) {
                        const board_2 = JSON.parse(JSON.stringify(board));
                        board_2[r][c] = cell[i];
                        const completed_board = backtrack_based(board_2);
                        if (completed_board) return completed_board;
                    }
                    return false;
                }
            }
        }
    }

    return false;

}


function one_value_cell_constraint(board) {

    let updated = false;

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) {
                updated = complete_cell(board, r, c) || updated;
            }
        }
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (Array.isArray(board[r][c])) {
                const possibilities = board[r][c];
                updated = appears_once_only(board, possibilities, get_row(board, r), r, c) ||
                    appears_once_only(board, possibilities, get_column(board, c), r, c) ||
                    appears_once_only(board, possibilities, get_square(board, square_coordinates[r][c]), r, c) || updated;
            }
        }
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (Array.isArray(board[r][c])) {
                board[r][c] = 0;
            }
        }
    }

    return updated;
}

// renvoie un array contenant le board complété
export default function solve(board) {

    let updated = true; let solved = false;

    while (updated && !solved) {
        updated = one_value_cell_constraint(board);
        solved = is_solved(board);
    }

    if (!solved) {
        board = backtrack_based(board);
        solved = is_solved(board);
    }

    return board;
}


// FIN DU CODE //


// Exemple de code pour résolution : //

/* const Arr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 8, 5],
    [0, 0, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 7, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 1, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 7, 3],
    [0, 0, 2, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 9]
];

solution = solve(evilGameArr2); */
