import mongoose from 'mongoose';
import 'dotenv/config'
const dbUrl = process.env.MONGO_DATABASE || '';
export default async function mongooseConnection (){
    try{
        await mongoose.connect(dbUrl).then((data:any)=>{
            console.log("connected to database sucessfully!");
        })

    }catch(err){
        console.log(`error connecting to db${err}`)
    }
}

