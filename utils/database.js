import mongoose from "mongoose";

let isConnented = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnented) {
        console.log("Already Connected with MongoDB ")
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME
        })
        isConnented = true
        console.log("MongoDB connencted")
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}
