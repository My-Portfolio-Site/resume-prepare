'use client'
import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import FileUpload from '@components/FileUpload'

interface FileListResponse {
  files?: string[]
  error?: string
}

export default function ListAllFiles() {
  const [files, setFiles] = useState<string[]>([])
  const [isRefreshLoading, setRefreshIsLoading] = useState(false)
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null)
  const [deletingFile, setDeletingFile] = useState<string | null>(null)
  const [error, setError] = useState<string>('')

  async function handleDownloadFile(filename: string) {
    if (!window.confirm(`Are you sure you want to download ${filename}?`)) {
      return
    }
    setError('')
    setDownloadingFile(filename)
    try {
      const resp = await fetch(
        `/api/download?filename=${encodeURIComponent(filename)}`,
        {
          method: 'GET',
        }
      )
      if (!resp.ok) {
        throw new Error('Failed to download file')
      }

      saveAs(await resp.blob(), filename)
    } catch (err) {
      console.error('Error downloading file:', err)
      setError(err instanceof Error ? err.message : 'Failed to download file')
    } finally {
      setDownloadingFile(null)
    }
    return
  }

  async function handleDeleteFile(filename: string) {
    if (!window.confirm(`Are you sure you want to delete ${filename}?`)) {
      return
    }

    setError('')
    setDeletingFile(filename)
    try {
      const resp = await fetch(
        `/api/delete?filename=${encodeURIComponent(filename)}`,
        {
          method: 'DELETE',
        }
      )

      if (!resp.ok) {
        throw new Error('Failed to delete file')
      }

      // Remove the file from the list
      setFiles(files.filter((f) => f !== filename))
    } catch (err) {
      console.error('Error deleting file:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete file')
    } finally {
      setDeletingFile(null)
    }
    return
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
    return
  }

  useEffect(() => {
    handleFetchFiles()
  }, [])

  return (
    <div className='m-4 flex flex-col gap-4'>
      {/* Add a container div for the header with flex layout */}
      <FileUpload />

      {error && (
        <div className='mt-4 text-red-600' role='alert'>
          {error}
        </div>
      )}

      <div
        className='rounded-md bg-white p-6 transition-colors duration-200'
        // role='list'
      >
        {files.length === 1 && files[0] === 'No files found' ? (
          <p className='p-3 text-center dark:text-white text-lg'>
            No files found
          </p>
        ) : (
          <>
            <div className='flex justify-between items-center p-3'>
              <p className='text-center dark:text-white text-sm'>
                Files found: {files.length}
              </p>
              <button
                onClick={handleFetchFiles}
                disabled={isRefreshLoading}
                aria-busy={isRefreshLoading}
                className='px-3 py-2 bg-orange-600 text-white rounded-lg
                transition-colors duration-200 shadow-md hover:shadow-lg font-medium
                disabled:bg-gray-400 disabled:cursor-not-allowed'
              >
                {isRefreshLoading ? (
                  <span className='flex items-center gap-2'>
                    <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
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
                      className='w-4 h-4'
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
            {files.map((filename: string) => (
              <FileItem
                key={filename}
                filename={filename}
                handleDownload={handleDownloadFile}
                handleDelete={handleDeleteFile}
                isDownloading={downloadingFile === filename}
                isDeleting={deletingFile === filename}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

const FileItem = ({
  filename,
  handleDownload,
  handleDelete,
  isDownloading,
  isDeleting,
}: {
  filename: string
  handleDownload: (filename: string) => Promise<void>
  handleDelete: (filename: string) => Promise<void>
  isDownloading: boolean
  isDeleting: boolean
}) => (
  <div className='p-3 flex justify-between items-center gap-3' role='listitem'>
    <p className='font-medium dark:text-white text-lg'>{filename}</p>
    <div className='flex gap-3 justify-end'>
      <button
        onClick={() => handleDownload(filename)}
        disabled={isDownloading || isDeleting}
        className='px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg font-medium'
      >
        {isDownloading ? (
          <span className='flex items-center gap-2'>
            <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
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
            className='w-4 h-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
            />
          </svg>
        )}
      </button>
      <button
        onClick={() => handleDelete(filename)}
        disabled={isDownloading || isDeleting}
        className='px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed'
      >
        {isDeleting ? (
          <span className='flex items-center gap-2'>
            <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
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
            className='w-4 h-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
            />
          </svg>
        )}
      </button>
    </div>
  </div>
)
