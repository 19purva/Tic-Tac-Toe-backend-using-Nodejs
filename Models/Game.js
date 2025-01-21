import mongoose from "mongoose";
const gameSchema = new mongoose.Schema({
    players: 
    [
        { type: mongoose.Schema.Types.ObjectId,
         ref: 'User' }
    ],
    moves: 
    [{
        player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        position: { type: Number, required: true },
    }],
    result: 
    { type: String,
     enum: ['win', 'loss', 'draw'], 
     default: null 
    },
    turn: { 
       type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    status: { 
        type: String, 
        enum: ['ongoing', 'completed'], 
        default: 'ongoing'
     },
}, 
{ 
    timestamps: true
 });

export const Game = mongoose.model('Game', gameSchema);