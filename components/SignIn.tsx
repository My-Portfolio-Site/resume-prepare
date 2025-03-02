'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { GoogleIcon } from './Icons'

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn('google', { redirectTo: '/' });
    setLoading(false);
    return
  };

  return (
    <button
      className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
      onClick={handleSignIn}
      disabled={loading}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full" />
      ) : (
        <GoogleIcon className="h-5 w-5" />
      )}
      {loading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  )
}
