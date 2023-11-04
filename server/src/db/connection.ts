import mongoose from 'mongoose';


export default function mongooseConnection(){
    try{
        mongoose.connect(process.env.MONGO_DATABASE!)
        console.log("connected to database sucessfully!")

    }catch(err){
        console.log('error connecting to db', err)
    }
}

