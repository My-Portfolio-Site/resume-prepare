'use client'

import { saveAs } from 'file-saver'
import { Packer } from 'docx'
import { experiences, education, skills, achievements } from '@lib/cv-data'
import { DocumentCreator } from '@lib/cv-generator'

export default function Home() {
  function generate() {
    const documentCreator = new DocumentCreator()
    const doc = documentCreator.create([
      experiences,
      education,
      skills,
      achievements,
    ])

    Packer.toBlob(doc).then((blob) => {
      console.log(blob)
      saveAs(blob, 'cv.docx')
      console.log('Document created successfully')
    })
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <p className='text-center mb-6 text-lg'>
        Start editing to see some magic happen :)
      </p>
      <button
        onClick={generate}
        className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
      transition-colors duration-200 shadow-md hover:shadow-lg font-medium'
      >
        Generate CV with docx!
      </button>
    </div>
  )
}
