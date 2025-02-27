'use client'
import React, { useState } from "react"

export default function FileUpload() {
  const [message, setMessage] = useState<string>('')
  const [file, setFile] = useState<File>()

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return

    const data = new FormData();
    data.set('file', file);
    console.log(data.get('file'));
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: data
    });
    // const data = await response.json();
    console.log(response);
    // setMessage(data.message);
  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <label>
          <span>Upload a file</span>
          <input type='file' name='file' onChange={(e) => setFile(e.target.files?.[0])} />
        </label>
        <button type='submit' id='uploadButton' className='btn'>
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
