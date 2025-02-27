'use client'
import React, { useState } from "react"
import { saveAs } from 'file-saver'

export default function FileDownload({filename}: {filename: string}) {
  async function handleDownload() {
    try {
      const file = await fetch(`/api/download?filename=${encodeURIComponent(filename)}`, {
        method: 'GET'
      })

      if (!file.ok) {
        throw new Error('Failed to download file');
      }

      saveAs(await file.blob(), filename)
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file');
    }
  }
  return (
    <div className="m-4">
      <button 
        onClick={handleDownload} 
        className='px-6 py-3 bg-green-800 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg font-medium flex items-center gap-2'
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download
      </button>
    </div>
  )
}
