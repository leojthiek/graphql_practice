import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {   
        user:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User",
           required:true
        },
        task:{
            type:String,
            required:true
        },
        startDate:{
            type:Date,
            required:true
        },
        endDate:{
            type:Date,
            required:true
        }
    },
    {
        timestamp:true
    }
)

const Todo = mongoose.model('Todo',todoSchema)
export default Todo