import { Game } from '../Models/Game.js';

export const startGame = async (req, res) => {
    try {
        const { player1, player2 } = req.body;
        const game = new Game({ players: [player1, player2], turn: player1 });
        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const makeMove = async (req, res) => {
    try {
        const { gameId, playerId, position } = req.body;
        const game = await Game.findById(gameId);
        if (!game || game.status !== 'ongoing') {
            return res.status(400).json({ message: 'Invalid game' });
        }
        if (!game.turn.equals(playerId)) {
            return res.status(400).json({ message: 'Not your turn' });
        }
        game.moves.push({ player: playerId, position });
        // Logic for checking game result goes here
        game.turn = game.players.find(p => !p.equals(playerId));
        await game.save();
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getGameHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const games = await Game.find({ players: userId }).populate('players moves.player');
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
