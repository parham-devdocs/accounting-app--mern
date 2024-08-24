import mongoose, { Mongoose } from "mongoose";

const db = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB_CONNECTION);
        console.log('db connected')
    } catch (error) {
        console.log('bd connection failed')
    }
}

export default db