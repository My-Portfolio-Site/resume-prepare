export const runtime = 'edge'

import UserDetails from '@/components/UserDetails'

import { auth } from '@/lib/auth'
import { getProfileByUserId } from '@/lib/db_query'

export default async function Details() {
  const session = await auth()
  const profileData = await getProfileByUserId(session?.user?.id || '')
  

  return (
    <div className='flex flex-col items-center min-h-screen'>
      <p className='text-center text-blue-600 dark:text-white text-2xl font-bold pb-3'>
        Generate New
      </p>
      {!profileData ? (
        <div>No Data</div>
      ) : (
        <UserDetails profile={profileData} />
      )}
    </div>
  )
}
