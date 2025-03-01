'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'

export default function SignOut() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
    return
  };

  return (
    <button
      className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors'
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Sign Out'}
    </button>
  )
}
