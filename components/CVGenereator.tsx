'use client'
import { Packer } from 'docx'
import {
  experiences,
  education,
  skills,
  courses,
  certifications,
} from '@lib/cv-data'
import { DocumentCreator } from '@lib/cv-generator'

export default function CVGenerator() {
  async function uploadToR2(data: FormData) {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: data,
    })
    return
  }

  function generate() {
    const documentCreator = new DocumentCreator()
    const doc = documentCreator.create([
      experiences,
      education,
      skills,
      courses,
      certifications,
    ])

    Packer.toBlob(doc).then((blob) => {
      console.log(blob)
      // saveAs(blob, 'cv.docx')
      var file = new File([blob], 'somefile.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })
      const data = new FormData()
      data.set('file', file)
      uploadToR2(data)
    })

  }
  return (
    <div className='flex flex-col items-center m-4 bg-white justify-center p-6 rounded-md'>
      <button
        onClick={generate}
        className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
      transition-colors duration-200 shadow-md hover:shadow-lg font-medium'
      >
        Generate CV with docx!
      </button>
      <div id='result'></div>
    </div>
  )
}
