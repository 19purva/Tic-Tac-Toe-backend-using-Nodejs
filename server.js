
import app from './app.js';
import readline from 'readline';
import { User } from './Models/User.js';
import { connection } from './database/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios'; // For API calls to start the game

// Initialize readline for console input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Tic-Tac-Toe Game Logic
let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];
let currentPlayer = 'X'; // 'X' starts the game

// Function to display the board
const displayBoard = () => {
    console.clear();
    console.log('Tic-Tac-Toe');
    console.log('-------------');
    board.forEach(row => {
        console.log(row.join(' | '));
        console.log('-------------');
    });
};

// Function to handle player move
const makeMove = (player, row, col) => {
    if (board[row][col] !== ' ') {
        console.log('This spot is already taken, try again!');
        return false;
    }
    board[row][col] = player;
    return true;
};

// Function to check for a winner
const checkWinner = () => {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') return board[i][0];
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ') return board[0][i];
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') return board[0][0];
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') return board[0][2];

    // Check for a tie
    if (board.every(row => row.every(cell => cell !== ' '))) return 'Tie';
    return null;
};

// Function to handle user login
const loginUserFromConsole = () => {
    rl.question('Enter username for login: ', async (username) => {
        rl.question('Enter password for login: ', async (password) => {
            try {
                const user = await User.findOne({ username });
                if (!user || !(await bcrypt.compare(password, user.password))) {
                    console.log('Invalid credentials');
                    promptForRegistration();
                } else {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    console.log(`Login successful! Token: ${token}`);
                    promptForGameStart(user);
                }
            } catch (error) {
                console.error('Error logging in:', error.message);
            }
        });
    });
};

// Function to handle user registration
const registerUserFromConsole = () => {
    rl.question('Enter username for registration: ', (username) => {
        rl.question('Enter password for registration: ', async (password) => {
            try {
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    console.log('Username already exists');
                    promptForLogin();
                } else {
                    const user = new User({ username, password });
                    await user.save();
                    console.log(`User registered successfully with Username: ${username}`);
                    promptForGameStart(user);
                }
            } catch (error) {
                console.error('Error registering user:', error.message);
            }
        });
    });
};

// Prompt user to register if not logged in
const promptForRegistration = () => {
    rl.question('Would you like to register a new user? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            registerUserFromConsole();
        } else {
            rl.close();
        }
    });
};

// Prompt user for game start (take player names)
const promptForGameStart = async (user) => {
    rl.question('Enter Player 1 name: ', (player1Name) => {
        rl.question('Enter Player 2 name: ', async (player2Name) => {
            try {
                // Look up players by name
                const player1 = await User.findOne({ username: player1Name });
                const player2 = await User.findOne({ username: player2Name });

                if (!player1 || !player2) {
                    console.log('One or both players not found!');
                    rl.close();
                    return;
                }

                // Start Tic-Tac-Toe Game
                console.log('Game is starting...');
                displayBoard();
                startTicTacToe(player1, player2);
            } catch (error) {
                console.error('Error starting game:', error.message);
                rl.close();
            }
        });
    });
};

// Function to start the Tic-Tac-Toe game
const startTicTacToe = async (player1, player2) => {
    const players = [player1, player2];
    let currentTurn = 0; // 0 = player1's turn, 1 = player2's turn

    const playTurn = () => {
        const currentPlayer = players[currentTurn];
        const currentSymbol = currentTurn === 0 ? 'X' : 'O';

        rl.question(`${currentPlayer.username}'s (${currentSymbol}) move (row, col): `, (move) => {
            const [row, col] = move.split(',').map(num => parseInt(num.trim()));
            if (makeMove(currentSymbol, row, col)) {
                displayBoard();
                const winner = checkWinner();
                if (winner) {
                    if (winner === 'Tie') {
                        console.log('The game is a tie!');
                    } else {
                        // Display winner's name
                        const winningPlayer = winner === 'X' ? player1 : player2;
                        console.log(`${winningPlayer.username} wins the game!`);  // Display winner's name
                    }
                    rl.close();
                    return;
                }
                currentTurn = (currentTurn + 1) % 2; // Switch player turn
                playTurn(); // Recursively call playTurn to continue the game
            } else {
                playTurn(); // Retry if the move is invalid
            }
        });
    };

    playTurn(); // Start the game
};

// Start the application
const startServer = async () => {
    try {
        await connection(); // Ensure database is connected first
        console.log('Connected to MongoDB');

        app.listen(process.env.PORT, () => {
            console.log(`Server is listening at port ${process.env.PORT}`);
            promptForLogin(); // Prompt for login first
        });
    } catch (error) {
        console.error('Error starting the server:', error.message);
    }
};

// Prompt for login if the server is running
const promptForLogin = () => {
    rl.question('Do you already have an account? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            loginUserFromConsole();
        } else {
            registerUserFromConsole();
        }
    });
};

startServer();
