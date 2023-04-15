import React from 'react'

export default function Login() {
  return (
    <div className='h-screen w-screen flex'>
        <div className='w-1/2 h-full bg-slate-200 flex items-center justify-center'>
            <div className='text-8xl text-center font-bold p-10'>
                Flights and Hotels
            </div>
        </div>
        <div className='flex items-center justify-center w-1/2'>
            <div className='space-y-4 w-1/4'>
                <div>
                    <p className='text-lg mb-1'>Email Address</p>
                    <input type="text" className='bg-slate-100 outline-none rounded-md p-2 w-full'/>
                </div>
                <div>
                    <p className='text-lg mb-1'>Password</p>
                    <input type="password" className='bg-slate-100 outline-none rounded-md p-2 w-full'/>
                </div>
                <button className='bg-violet-500 hover:bg-violet-600 w-full focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white'>
                    Log In
                </button>
            </div>
        </div>
    </div>
  )
}
