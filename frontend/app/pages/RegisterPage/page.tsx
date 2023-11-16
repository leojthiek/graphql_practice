"use client"

import Link from "next/link"
import React from "react"
import { useSelector,useDispatch } from "react-redux"
import { registerUserAction } from "@/app/redux/features/userRegister"
import { AppDispatch, Rootstate } from "@/app/redux/store"
import { useRouter } from "next/navigation"



export default function RegisterPage() {
  const [name,setname] = React.useState("")
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")

  const dispatch:AppDispatch = useDispatch()
  const router = useRouter()
  
  const userRegister = useSelector<Rootstate, {registerUser:null,error:unknown,loading:boolean}>((state)=>state.userRegister)
  const {registerUser,error,loading} = userRegister


  React.useEffect(()=>{
    if(registerUser){
      router.push("/")
    }
  },[registerUser])

  const handleRegisterSubmit = (e:React.FormEvent) => {
    e.preventDefault()
   
    if(name && email && password){
      dispatch(registerUserAction({name,email,password}))
    }
    setname("")
    setEmail("")
    setPassword("")
  }

  
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-100'>
      <div className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-4 sm:p-6 rounded-lg shadow-2xl bg-blue-300'>
        <h1 className='text-4xl font-bold font-serif text-center pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10'>
          Register
        </h1>
        {error && typeof error === 'string' ? <p>{error}</p> : null}
        <form onSubmit={handleRegisterSubmit}>
          <div className='pb-6'>
            <p className='text-2xl font-bold font-serif pb-2'>Username</p>
            <input className='w-full h-12 pl-4' placeholder='Enter username' value={name} onChange={(e)=> setname(e.target.value)} />
          </div>
          <div className='pb-6'>
            <p className='text-2xl font-bold font-serif pb-2'>Email</p>
            <input className='w-full h-12 pl-4' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div className='pb-6'>
            <p className='text-2xl font-bold font-serif pb-2'>Password</p>
            <input
              type='password'
              className='w-full h-12 pl-4'
              placeholder='Enter Password'
              value={password} onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <div className='flex justify-center'>
            <button type="submit" className='border pl-5 pr-5 pt-2 pb-2 font-serif font-semibold bg-green-600 rounded-lg cursor-pointer'>
              Register
            </button>
          </div>
        </form>
        <div>
          <p className=' font-semibold'>
            Alredy register ? <Link href={"/"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
