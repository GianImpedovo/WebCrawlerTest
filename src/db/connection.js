import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

export const dbconecction = async () => {
    try {
        const conection = await mongoose.connect(process.env.DB_URI);
        console.log("DB Connected");
        return conection;
    } catch (error) {
        console.log(error);
    }
}