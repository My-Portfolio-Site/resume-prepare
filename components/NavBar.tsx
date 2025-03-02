'use client'
import SignIn from './SignIn'
import SignOut from './SignOut'
import Link from 'next/link'

import NavigationLinks from './NavigationLinks'

interface UserProfileProps {
  user?: {
    name: string
    image: string
  } | null
  compact?: boolean
}

interface NavBarProps {
  user?: {
    name: string
    image: string
  } | null
}

export default function NavBar({ user }: NavBarProps) {

  return (
    <>
      <nav className='flex flex-col justify-between items-center rounded-lg md:h-[400px] md:w-48 md:bg-white mt-4 md:my-4 md:py-6 md:gap-4'>
        <div className='flex md:flex-col md:gap-8 gap-3 bg-white px-4 py-2 rounded-md w-fit'>
          <CompanyTitle />
          <UserProfile user={user} />
          <SignOut />
        </div>
        {user && <NavigationLinks />}
      </nav>
    </>
  )
}

function CompanyTitle() {
  return (
    <Link href='/' className='font-medium text-xl'>
      Resume Prepare
    </Link>
  )
}

function UserProfile({ user, compact = false }: UserProfileProps) {
  if (!user) return

  return (
    <div className={`flex items-center flex-col ${!compact && 'gap-6'}`}>
      <div className='flex flex-row items-center gap-3'>
        <img
          src={user.image}
          alt='avatar'
          className={`${
            compact ? 'w-6 h-6' : 'w-8 h-8'
          } rounded-full border-2 border-blue-500`}
        />
        <span className='text-md text-gray-900'>{user.name}</span>
      </div>
    </div>
  )
}
