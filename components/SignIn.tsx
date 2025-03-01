'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

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
      className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors'
      onClick={handleSignIn}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Sign In'}
    </button>
  )
}
