import mongoose from "mongoose";

const useerSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        }
    },
    {
        timestamp:true
    }
)

const User = mongoose.model('User',useerSchema)
export default User