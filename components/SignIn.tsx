'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { GoogleIcon } from './Icons'
import { useSearchParams } from 'next/navigation'

type ErrorMessages = {
  AccessDenied: string
  DatabaseError: string
  Default: string
  [key: string]: string
}

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const handleSignIn = async () => {
    setLoading(true)
    await signIn('google', { redirectTo: '/' })
    setLoading(false)
    return
  }

  // Error message mapping
  const errorMessages: ErrorMessages = {
    AccessDenied:
      "Opps!! You don't have access to this application.",
    DatabaseError:
      'There was a problem connecting to the database. Please try again later.',
    Default: 'An error occurred during sign in. Please try again.',
  }
  // Get appropriate error message
  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : ''

  return (
    <>
      {/* Error message display */}
      <div
        className='px-4 py-3 rounded mb-6'
        role='alert'
      >
        {error && <p className='text-red-600'>{errorMessage}</p>}
      </div>

      <button
        className='flex items-center w-fit gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
        onClick={handleSignIn}
        disabled={loading}
      >
        <GoogleIcon className='h-5 w-5' />
        {loading ? (
          <div className='animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full' />
        ) : ''}
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </>
  )
}
