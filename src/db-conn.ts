import mongoose from "mongoose";

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASS = process.env.MONGODB_PASS;

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0-23rda.mongodb.net/test?retryWrites=true&w=majority`; 

let conn: mongoose.Connection | null = null;

export const getConnection = async (): Promise<mongoose.Connection> => {
    if (conn == null) {
        conn = await mongoose.createConnection(uri, {
            bufferCommands: false, // Disable mongoose buffering
            bufferMaxEntries: 0, // and MongoDB driver buffering
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,            
        });
    }
    return conn;
}