"use client"

import { AppDispatch, Rootstate } from "@/app/redux/store"
import React from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { logoutAction } from "@/app/redux/features/userLoginSlice"
import AddTodoForm from "@/app/component/createTodo"
import { getTodoListAction } from "@/app/redux/features/getTodoList"
import { deleteTodoAction } from "@/app/redux/features/deleteTodoSlice"
import UpdateTodoForm from "@/app/component/updateTodo"

interface User {
  id: string
  name: string
  email: string
}

interface Task {
  id: string
  task: string
  startDate: string
  endDate: string
}

export default function TodoPage() {
  const router = useRouter()
  const [isAddTodoFormVisible, setIsTodoFormVisible] = React.useState(false)
  const [isUpdateFormVisible, setIsUpdateFormVisible] = React.useState(false)
  const [selectedTaskForUpdate, seetSelectedTaskForUpdate] = React.useState<Task | null>(null)


  const dispatch: AppDispatch = useDispatch()

  const userLogin = useSelector<
    Rootstate,
    { user: User | null; loading: boolean; error: unknown }
  >((state) => state.userLogin)
  const { user, loading, error } = userLogin

  const userId = user?.id

  const getTodo = useSelector<
    Rootstate,
    { task: [] | Task[]; error: unknown; loading: boolean }
  >((state) => state.getTodo)
  const { task, error: taskError, loading: taskLoading } = getTodo

  const createTodo = useSelector((state: Rootstate) => state.createTodo)
  const { task: createTask } = createTodo

  const deleteTodo = useSelector((state: Rootstate) => state.deleteTodo)
  const { deletedTask } = deleteTodo

  const updateTask = useSelector((state:Rootstate)=> state.updateTask)
  const {updateTodo} = updateTask

  React.useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  React.useEffect(() => {
    if (user && userId) {
      dispatch(getTodoListAction(userId))
    }
  }, [user, dispatch, userId, createTask, deletedTask,updateTodo])

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  const handleToggleAddTodoForm = () => {
    setIsTodoFormVisible(!isAddTodoFormVisible)
  }

  const handleDelete = (taskId: string) => {
    dispatch(deleteTodoAction({ id: taskId }))
  }

  const handleUpdateForm = (data:Task) => {
    seetSelectedTaskForUpdate(data)
    setIsUpdateFormVisible(true)
  }

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className='p-4'>
          <div className='pt-5 bg-gray-200 flex justify-between'>
            <div>
              <h1 className=' font-bold pl-3'>
                Name: <span>{user?.name}</span>
              </h1>
              <h1 className='font-bold pb-5 pl-3'>
                Email: <span>{user?.email}</span>
              </h1>
            </div>
            <div className=' pr-4'>
              <button
                className=' bg-red-600 pt-1 pb-1 pr-2 pl-2 text-white'
                type='button'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <div className='flex justify-between pt-6 pb-6'>
            <h1 className=' font-serif text-xl font-bold pl-2'>
              Todo Task List
            </h1>
            <button
              className=' bg-green-600 border pl-2 pr-2 pt-1 pb-1 text-white rounded-md font-serif'
              onClick={handleToggleAddTodoForm}
            >
              + Add todo
            </button>
          </div>

          <div className=' overflow-x-auto'>
            <table className='min-w-full border rounded-lg overflow-auto'>
              <thead>
                <tr className='bg-gray-200 text-left'>
                  <th className='py-2 px-3 border'>Task</th>
                  <th className='py-2 px-3 border whitespace-nowrap'>
                    Start Date
                  </th>
                  <th className='py-2 px-3 border'>End Date</th>
                  <th className='py-2 px-3 border'></th>
                </tr>
              </thead>
              {task.map((data) => (
                <tbody>
                  <tr className='text-left bg-white' key={data.id}>
                    <td className='py-2 px-3 border whitespace-nowrap'>
                      {data.task}
                    </td>
                    <td className='py-2 px-3 border'>
                      {new Date(parseInt(data.startDate)).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td className='py-2 px-3 border'>
                      {new Date(parseInt(data.endDate)).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td className='py-2 px-3 border flex'>
                      <button
                        className='text-white bg-blue-500 py-1 px-3 rounded-lg mr-2'
                        type='button'
                        onClick={()=> handleUpdateForm(data)}
                      >
                        Edit
                      </button>
                      <button
                        className='text-white bg-red-500 py-1 px-3 rounded-lg'
                        type='button'
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          {isAddTodoFormVisible && (
            <AddTodoForm onClose={handleToggleAddTodoForm} />
          )}
          {isUpdateFormVisible && <UpdateTodoForm onClose={()=> setIsUpdateFormVisible(false)} task={selectedTaskForUpdate}/>}
        </div>
      )}
    </>
  )
}
