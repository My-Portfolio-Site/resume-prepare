'use server'

import CVGenerator from '@/components/CVGenereator'

export default async function Home() {
  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      <p className='text-center text-blue-600 dark:text-white text-2xl font-bold'>Generate New</p>
      <div className='w-[500px]'>
        <CVGenerator />
      </div>
    </div>
  )
}
