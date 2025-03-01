'use server'

import ListAllFiles from '@/components/ListAllFiles'

export default async function Documents() {
  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      <p className='text-center text-blue-600 dark:text-white text-2xl font-bold'>Documents</p>
      <div className='w-[500px]'>
        <ListAllFiles />
      </div>
    </div>
  )
}
