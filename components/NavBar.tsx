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
      {/* Mobile Navigation */}
      <nav className='md:hidden flex flex-col items-center mt-2'>
        <div className='w-full max-w-[600px] rounded-sm flex items-center justify-between p-2 gap-5 bg-white border-b'>
          <CompanyTitle />
          <UserProfile user={user} compact />
        </div>
        {user && (
          <div className='w-full max-w-[400px] rounded-sm flex items-center justify-center p-2 bg-white border-b mt-2'>
            <NavigationLinks />
          </div>
        )}
      </nav>

      {/* Desktop/Tablet Sidebar */}
      <nav
        className='hidden md:flex flex-col fixed rounded-lg top-1/2 -translate-y-1/2 h-[400px] w-48 bg-white border-r p-4'
        style={{ left: `min(calc(100% - 600px - 280px), 150px)` }}
      >
        <CompanyTitle />

        <div className='flex flex-col gap-8 mt-8'>
          <UserProfile user={user} />
          {user && <NavigationLinks showLabels />}
        </div>
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
  if (!user) {
    return (
      <div
        className={`flex ${
          compact ? 'flex-row' : 'flex-col'
        } items-center gap-2`}
      >
        <span className='text-sm text-gray-600 italic'>Not Authenticated!</span>
        <SignIn />
      </div>
    )
  }

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
      <SignOut />
    </div>
  )
}
