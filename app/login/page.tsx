// 'use server'
export const runtime = 'edge'
import SignIn from '@/components/SignIn'

export default async function Login() {

  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] gap-8'>

      <div className='flex justify-center items-center flex-col'>
        <SignIn />
      </div>
      <p className="mt-6 text-sm text-gray-400">
        *This is a restricted application. Only registered users can access it.
      </p>
    </div>
  )
}
