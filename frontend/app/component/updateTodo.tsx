import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, Rootstate } from "../redux/store"
import { updateTodoAction } from "../redux/features/updateTodoSlice"

interface Task {
    id:string
    task:string,
    startDate:string,
    endDate:string
}

interface AddTodoFormProps {
  onClose: () => void,
  task: Task | null
}

interface User {
  id: string
}

const UpdateTodoForm: React.FC<AddTodoFormProps> = ({ onClose,task:newTask }) => {
  const [task, setTask] = useState(newTask?.task)
  const [startDate, setStartDate] = useState(newTask?.startDate)
  const [endDate, setEndDate] = useState(newTask?.endDate)

  const dispatch: AppDispatch = useDispatch()

  const taskId = newTask?.id

  const handleUpdate = (e:React.FormEvent) => {
   e.preventDefault()
   
   const updateTaskInput = {
    taskId:taskId || "",
    task: task || "",
    startDate: startDate || "",
    endDate: endDate || "",
  };

  if(taskId){
    dispatch(
        updateTodoAction({updateTaskInput})
      );
  }

  
}

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-md w-1/3 h-1/2 p-6 relative'>
        {/* Close button in the top-right corner */}
        <p className='absolute top-2 right-2 cursor-pointer' onClick={onClose}>
          x
        </p>
        <h1 className='text-center pt-5 text-xl font-semibold text-black'>
          Update Todo Task
        </h1>
        <form className='p-4' onSubmit={handleUpdate}>
          <div className='mb-4'>
            <label htmlFor='task' className='text-sm font-semibold block mb-1'>
              Task
            </label>
            <input
              id='task'
              className='h-12 w-full px-3 border border-gray-300 rounded-md'
              type='text'
              placeholder='Enter task...'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='startDate'
              className='text-sm font-semibold block mb-1'
            >
              Start Date
            </label>
            <input
              id='startDate'
              className='h-12 w-full px-3 border border-gray-300 rounded-md'
              type='date'
              placeholder='Enter start date...'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='endDate'
              className='text-sm font-semibold block mb-1'
            >
              End Date
            </label>
            <input
              id='endDate'
              className='h-12 w-full px-3 border border-gray-300 rounded-md'
              type='date'
              placeholder='Enter end date...'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <button
             type="submit"
              className='bg-green-500 text-white py-2 px-4 rounded-md'
            >
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTodoForm
