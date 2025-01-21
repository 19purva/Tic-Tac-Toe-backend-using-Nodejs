import express from 'express';
import { startGame, makeMove, getGameHistory } from '../Controllers/gameController.js';

const router = express.Router();
router.post('/start', startGame);
router.post('/move', makeMove);
router.get('/history/:userId', getGameHistory);

export default router;