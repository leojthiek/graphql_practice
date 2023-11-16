import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../redux/store";
import { createTodoAction } from "../redux/features/createTodoSlice";

interface AddTodoFormProps {
  onClose: () => void;
}

interface User{
  id:string
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onClose }) => {
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch:AppDispatch = useDispatch()

  const loginUser = useSelector<Rootstate,{user:User | null}>((state)=>state.userLogin)
  const {user} = loginUser

  const userId = user?.id

   


  const handleSubmit = (e:React.FormEvent)=>{
     e.preventDefault()

     const formData = {
      task,
      startDate,
      endDate,
      user:userId ? userId : ""
     }

     dispatch(createTodoAction(formData))

     setTask("")
     setStartDate("")
     setEndDate("")

  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-md w-1/3 h-1/2 p-6 relative">
        {/* Close button in the top-right corner */}
        <p className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
          x
        </p>
        <h1 className="text-center pt-5 text-xl font-semibold text-black">
          Create a New List
        </h1>
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="task" className="text-sm font-semibold block mb-1">
              Task
            </label>
            <input
              id="task"
              className="h-12 w-full px-3 border border-gray-300 rounded-md"
              type="text"
              placeholder="Enter task..."
              value={task}
              onChange={(e)=> setTask(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="text-sm font-semibold block mb-1">
              Start Date
            </label>
            <input
              id="startDate"
              className="h-12 w-full px-3 border border-gray-300 rounded-md"
              type="date"
              placeholder="Enter start date..."
              value={startDate}
              onChange={(e)=> setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="text-sm font-semibold block mb-1">
              End Date
            </label>
            <input
              id="endDate"
              className="h-12 w-full px-3 border border-gray-300 rounded-md"
              type="date"
              placeholder="Enter end date..."
              value={endDate}
              onChange={(e)=> setEndDate(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoForm;
