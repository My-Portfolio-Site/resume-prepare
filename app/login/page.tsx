'use server'

import SignIn from '@/components/SignIn'

export default async function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] gap-8'>
      <p className='text-center text-blue-600 dark:text-white p-3 text-2xl font-bold'>Login</p>
      <div className='w-[500px] flex justify-center'>
        <SignIn />
      </div>
    </div>
  )
}
