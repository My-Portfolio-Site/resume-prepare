'use client'
import SignOut from './SignOut'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


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
      <nav className='flex flex-col justify-between items-center rounded-lg md:h-[400px] md:max-w-48 md:max-bg-white md:dark:bg-gray-700 mt-4 md:my-4 md:py-6 md:gap-4'>
        <div className='grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-rows-3 md:grid-cols-1 gap-1 sm:gap-3 md:gap-5 bg-white dark:bg-gray-700 px-4 py-3 rounded-md w-fit'>
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
    <Link href='/' className='font-medium text-xl col-span-2 sm:col-span-1 md:row-span-1'>
      Resume Prepare
    </Link>
  )
}

function UserProfile({ user, compact = false }: UserProfileProps) {
  if (!user) return

  return (
    <div className={`flex items-center flex-col ${!compact && 'gap-6'}`}>
      <div className='flex flex-row items-center gap-3' title={user.name}>
        <img
          src={user.image}
          alt='avatar'
          className={`${
            compact ? 'w-6 h-6' : 'w-8 h-8'
          } rounded-full border-2 border-blue-500`}
        />

        <span className='text-md '>{user.name}</span>
      </div>
    </div>
  )
}



function NavigationLinks() {
  const pathname = usePathname()

  const getLinkStyles = (path: string) => {
    const isActive = pathname === path
    return `p-2 rounded-full transition-colors ${
      isActive ? 'bg-gray-100 dark:bg-gray-900 text-blue-500' : 'hover:bg-gray-100 dark:hover:bg-gray-600'
    } ${'md:flex md:items-center md:gap-2'}`
  }

  const links = [
    {
      href: '/',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
          />
        </svg>
      ),
      label: 'Home',
    },
    {
      href: '/documents',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
      ),
      label: 'Documents',
    },
    {
      href: '/details',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
      label: 'Details',
    },
  ]

  return (
    <div
      className={
        'flex md:flex-col flex-row gap-2 bg-white dark:bg-gray-700 mt-2 py-2 px-3 rounded-lg w-fit'
      }
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={getLinkStyles(link.href)}
          title={link.label}
        >
          {link.icon}
          <span className='hidden md:flex'>{link.label}</span>
        </Link>
      ))}
    </div>
  )
}
