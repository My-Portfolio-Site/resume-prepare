'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FileUploadResponse {
  message?: string
  error?: string
}

export default function FileUpload() {
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [file, setFile] = useState<File>()

  async function uploadToR2(data: FormData) {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: data,
    })
    const result: FileUploadResponse = await response.json()
    if (response.ok) {
      setMessage(result.message || '')
      setError('')
    } else {
      setError(result.error || 'Upload failed')
      setMessage('')
    }
    return
  }

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      if (!file) return

      const data = new FormData()
      data.set('file', file)
      uploadToR2(data)
    } catch (err) {
      setError('An error occurred while uploading the file')
      setMessage('')
    }
    return
  }

  return (
    <div className='w-full rounded-md bg-white mx-auto p-6'>
      <form onSubmit={handleUpload} className='space-y-2 items-center'>
        <div className='grid max-w-80 items-center gap-1.5'>
          {/* <Label htmlFor='file'>Upload File</Label> */}
          <Input
            id='file'
            type='file'
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </div>
        <label className='block'>
          <span className='text-sm font-semibold'>
            File name: {file?.name || 'No file selected'}
          </span>
        </label>
        <button
          type='submit'
          id='uploadButton'
          className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200'
        >
          Upload
        </button>
      </form>
      {message && <p className='text-green-600 text-sm'>{message}</p>}
      {error && <p className='text-red-600 text-sm'>{error}</p>}
    </div>
  )
}
