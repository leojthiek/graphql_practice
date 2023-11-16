"use client"

import Link from "next/link"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, Rootstate } from "./redux/store"
import { loginUserAction } from "./redux/features/userLoginSlice"
import {useRouter} from "next/navigation"

export default function Home() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)

  const router = useRouter()
  const dispatch:AppDispatch = useDispatch()

  const userLogin = useSelector<
    Rootstate,
    { user: null; error: unknown; loading: boolean }
  >((state) => state.userLogin)
  const { user, error, loading } = userLogin

  React.useEffect(()=>{
    if(user){
      router.push('/pages/TodoPage')
    }
  },[user])



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginUserAction({ email, password }))
    setPassword("")
    
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-100'>
      <div className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-4 sm:p-6 rounded-lg shadow-2xl bg-blue-300'>
        <h1 className='text-4xl font-bold font-serif text-center pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10'>
          Login
        </h1>
        {error && typeof error === "string" ? <p>{error}</p> : ""}

        <form onSubmit={handleSubmit}>
          <div className='pb-6'>
            <p className='text-2xl font-bold font-serif pb-2'>Email</p>
            <input
              className='w-full h-12 pl-4'
              placeholder='Enter Email'
              value={email}
              type='text'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='pb-6'>
            <p className='text-2xl font-bold font-serif pb-2'>Password</p>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                className='w-full h-12 pl-4 pr-11'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className='absolute top-3 right-2 cursor-pointer'
                type='button'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              className='border pl-5 pr-5 pt-2 pb-2 font-serif font-semibold bg-green-600 rounded-lg cursor-pointer'
              type='submit'
            >
              {loading ? "Loading" : "Login"}
            </button>
          </div>
        </form>
        <div>
          <p className=' font-semibold'>
            Not yet registered ?{" "}
            <Link href={"/pages/RegisterPage"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
