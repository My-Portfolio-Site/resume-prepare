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
import { Skill, Course, Certification } from '@/lib/types'
import { useState } from 'react'

export default function CVGenerator() {
  const [fileName, setFileName] = useState('')
  const [message, setMessage] = useState('')

  async function uploadToR2(data: FormData) {
    const response = await fetch('/api/documents/upload', {
      method: 'POST',
      body: data,
    })
    console.log('Upload response: ', response);
    
    return await response.json()
  }

  function generate() {
    if (!window.confirm(`Are you sure you want to generate ${fileName}.docx?`)) {
      return
    }
    const documentCreator = new DocumentCreator()
    const doc = documentCreator.create([
      experiences,
      education,
      skills as Skill[],
      courses as Course[],
      certifications as Certification[],
    ])

    Packer.toBlob(doc).then(async (blob) => {
      console.log(blob)
      // saveAs(blob, 'cv.docx')
      var file = new File([blob], fileName, {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })
      const data = new FormData()
      data.set('file', file)
      const message  = await uploadToR2(data)
      setMessage(JSON.stringify(message))
      return
    })

    return
  }
  return (
    <>
      <form onSubmit={generate} className='flex flex-col items-center w-full bg-white justify-center p-6 gap-3 rounded-md'>
        <label htmlFor="fileName">File Name</label>
        <input
        id='fileName'
          type='text'
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder='Enter file name'
          required
          className='mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
        />
        <button
          type='submit'
          className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
        transition-colors duration-200 shadow-md hover:shadow-lg font-medium'
        >
          Generate CV with docx!
        </button>
      </form>
      <span>{message}</span>
      </>
  )
}
