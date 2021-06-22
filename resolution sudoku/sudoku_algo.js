var square_coordinates = [
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9]
]

function get_row(board, row) {
    return board[row]
}

function get_column(board, column) {
    var col = []
    for (let row = 0; row < 9; row++) {
        col.push(board[row][column]);
    }
    return col
}

function get_square(board, square) {
    let cells = []
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (square == square_coordinates[r][c]) {
                cells.push(board[r][c])
            }
        }
    }
    return cells
}

function complete_cell(board, r, c) {
    let used = [...get_row(board, r), ...get_column(board, c), ...get_square(board, square_coordinates[r][c])]
    let possibilities = []
    for (let p = 1; p <= 9; p++) {
        if (!used.includes(p)) {
            possibilities.push(p)
        }
    }
    if (possibilities.length == 1) {
        board[r][c] = possibilities[0]
        return true
    } else {
        board[r][c] = possibilities
        return false
    }
}

function appears_once_only(board, possibilities, segment, r, c) {
    let updated = false
    for (i = 0; i < possibilities.length; i++) {
        let possibility = possibilities[i]
        let counter = 0
        segment.forEach(cell => {
            if (Array.isArray(cell)) {
                if (cell.includes(possibility)) {
                    counter++
                }
            } else {
                if (cell == possibility) {
                    counter++
                }
            }
        })
        if (counter == 1) {
            board[r][c] = possibility
            updated = true
            break
        }
    }
    return updated
}

function compare(expected, actual) {
    let array1 = expected.slice()
    let array2 = actual.slice()
    return array1.length === array2.length && array1.sort().every(function (value, index) { return value === array2.sort()[index] });
}

function is_solved(board) {
    let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let valid = true
    for (r = 0; r < 9 && valid == true; r++) {
        if (!compare(expected, get_row(board, r))) {
            valid = false
        }
    }
    for (c = 0; c < 9 && valid == true; c++) {
        if (!compare(expected, get_column(board, c))) {
            valid = false
        }
    }
    for (q = 1; q < 9 && valid == true; q++) {
        if (!compare(expected, get_square(board, q))) {
            valid = false
        }
    }
    return valid
}

function backtrack_based(orig_board) {
 
    let board = JSON.parse(JSON.stringify(orig_board));

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] == 0) {
                complete_cell(board, r, c)
                if (is_solved(board)) return board;
                let cell = board[r][c]
                if (Array.isArray(cell)) {
                    for (let i = 0; i < cell.length; i++) {
                        let board_2 = JSON.parse(JSON.stringify(board));
                        board_2[r][c] = cell[i]
                        if (completed_board = backtrack_based(board_2)) {
                            return completed_board;
                        }
                    }
                    return false
                }
            }
        }
    }

    return false;

}


function one_value_cell_constraint(board) {

    updated = false

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] == 0) {
                updated = complete_cell(board, r, c) || updated
            }
        }
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (Array.isArray(board[r][c])) {
                let possibilities = board[r][c]
                updated = appears_once_only(board, possibilities, get_row(board, r), r, c) ||
                    appears_once_only(board, possibilities, get_column(board, c), r, c) ||
                    appears_once_only(board, possibilities, get_square(board, square_coordinates[r][c]), r, c) || updated
            }
        }
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (Array.isArray(board[r][c])) {
                board[r][c] = 0
            }
        }
    }

    return updated
}

function solve(board) {

    let updated = true, solved = false

    while (updated && !solved) {
        updated = one_value_cell_constraint(board)
        solved = is_solved(board)
    }

    if (!solved) {
        board = backtrack_based(board)
        solved = is_solved(board)
    }

    return board
}


// FIN DU CODE //


// Exemple de code pour résolution : //

var Arr = [
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

solution = solve(evilGameArr2);