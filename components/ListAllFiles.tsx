'use client'
import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import FileDownload from './FileDownload'

interface FileListResponse {
  files?: string[]
  error?: string
}

export default function ListAllFiles() {
  const [files, setFiles] = useState<string[]>([])
  const [isRefreshLoading, setRefreshIsLoading] = useState(false)
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null)
  const [error, setError] = useState<string>('')

  async function handleDownloadFile(filename: string) {
    setError('')
    setDownloadingFile(filename)
    try {
      const file = await fetch(
        `/api/download?filename=${encodeURIComponent(filename)}`,
        {
          method: 'GET',
        }
      )

      if (!file.ok) {
        throw new Error('Failed to download file')
      }

      saveAs(await file.blob(), filename)
    } catch (err) {
      console.error('Error downloading file:', err)
      setError(err instanceof Error ? err.message : 'Failed to download file')
    } finally {
      setDownloadingFile(null)
    }
  }

  async function handleFetchFiles() {
    setRefreshIsLoading(true)
    setError('')
    setFiles([])

    try {
      const resp = await fetch('/api/list', {
        method: 'GET',
      })

      const result: FileListResponse = await resp.json()
      console.log(result)

      if (!resp.ok) {
        throw new Error(result.error || 'Failed to fetch files')
      }

      if (result.files) {
        setFiles(result.files.length === 0 ? ['No files found'] : result.files)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files')
    } finally {
      setRefreshIsLoading(false)
    }
  }

  useEffect(() => {
    handleFetchFiles()
  }, [])

  return (
    <div className='m-4'>
      {/* Add a container div for the header with flex layout */}
      <div className='flex justify-end mb-4 p-3'>
        <button
          onClick={handleFetchFiles}
          disabled={isRefreshLoading}
          aria-busy={isRefreshLoading}
          className='px-5 py-2 bg-orange-600 text-white rounded-lg
            transition-colors duration-200 shadow-md hover:shadow-lg font-medium
            disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          {isRefreshLoading ? (
            <span className='flex items-center gap-2'>
              <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                  fill='none'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
            </span>
          ) : (
            <span className='flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
                />
              </svg>
            </span>
          )}
        </button>
      </div>

      {error && (
        <div className='mt-4 text-red-600' role='alert'>
          {error}
        </div>
      )}

      <div
        className='mt-4 rounded-md transition-colors duration-200'
        role='list'
      >
        {files.map((filename: string) => (
          <FileItem
            key={filename}
            filename={filename}
            handleDownload={handleDownloadFile}
            isDownloading={downloadingFile === filename}
          />
        ))}
      </div>
    </div>
  )
}

const FileItem = ({
  filename,
  handleDownload,
  isDownloading,
}: {
  filename: string
  handleDownload: (filename: string) => Promise<void>
  isDownloading: boolean
}) => (
  <div className='p-3 flex justify-between items-center' role='listitem'>
    <p className='font-medium dark:text-white text-lg px-3'>{filename}</p>
    <button
      onClick={() => handleDownload(filename)}
      disabled={isDownloading}
      className='px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg font-medium'
    >
      {isDownloading ? (
        <span className='flex items-center gap-2'>
          <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
              fill='none'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        </span>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
          />
        </svg>
      )}
    </button>
  </div>
)
