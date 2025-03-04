export const runtime = 'edge';

import UserDetails from '@/components/UserDetails';

export default async function Details() {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <p className='text-center text-blue-600 dark:text-white text-2xl font-bold pb-3'>
        Generate New
      </p>
      <UserDetails />
    </div>
  )
}
