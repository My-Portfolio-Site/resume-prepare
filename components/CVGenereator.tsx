'use client'
import { saveAs } from 'file-saver'
import { Packer } from 'docx'
import {
  experiences,
  education,
  skills,
  courses,
  certifications,
} from '@lib/cv-data'
import { DocumentCreator } from '@lib/cv-generator'
import DocViewer, {
  PDFRenderer,
  PNGRenderer,
  DocRenderer,
} from 'react-doc-viewer'

import libre from 'libreoffice-convert'
import util from 'util'

const APIKEY = '8ebb17f4-e33a-4573-9845-1e7fabea8018'

export default function CVGenerator() {
  async function uploadToR2(data: FormData) {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: data,
    })
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

      console.log('Document created successfully')
    })

  }
  return (
    <div className='flex flex-col items-center justify-center p-4'>
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
      <div id='result'></div>
    </div>
  )
}
