'use server'

import FileUpload from '@components/FileUpload'
import CVGenerator from '@/components/CVGenereator'
import ListAllFiles from '@/components/ListAllFiles'

export default async function Home() {
  return (
    <div className='flex flex-col items-center min-h-screen p-4'>
      <p className='text-center mb-6 text-lg'></p>
      <div>
        {/* <FileUpload/> */}
        <CVGenerator />
        <ListAllFiles />
      </div>
    </div>
  )
}
