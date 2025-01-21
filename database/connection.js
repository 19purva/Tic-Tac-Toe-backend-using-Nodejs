import mongoose from "mongoose";

export const connection=()=>{
    mongoose.connect(process.env.MONGO_URI,
        {
        dbName:"Tic-Tac-Toe"
        }).then(()=>{
            console.log("connected to database");
        }).catch((err)=>{
            console.log(`connection error :${err}`);
        })
}
