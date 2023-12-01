import mongoose from "mongoose";
//dummy datas
export const UserSchema = new mongoose.Schema({
    username:{type: String, required: true},
    email: {type: String, required: true},
    role:{type: String, required: true},
    purchases:[{id: String}],
    
});

export const userModel = mongoose.model('User', UserSchema);
