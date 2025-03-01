import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationLinksProps {
  showLabels?: boolean
}

export default function NavigationLinks({ showLabels = false }: NavigationLinksProps) {
  const pathname = usePathname()

  const getLinkStyles = (path: string) => {
    const isActive = pathname === path
    return `p-2 rounded-full transition-colors ${
      isActive 
        ? 'bg-gray-100 text-blue-500' 
        : 'hover:bg-gray-100'
    } ${showLabels ? 'flex items-center gap-2' : ''}`
  }

  const links = [
    {
      href: '/',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>,
      label: 'Home'
    },
    {
      href: '/documents',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>,
      label: 'Documents'
    },
    {
      href: '/details',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
      label: 'Details'
    }
  ]

  return (
    <div className={`flex ${showLabels ? 'flex-col' : 'flex-row'} gap-4`}>
      {links.map(link => (
        <Link key={link.href} href={link.href} className={getLinkStyles(link.href)}>
          {link.icon}
          {showLabels && <span>{link.label}</span>}
        </Link>
      ))}
    </div>
  )
}
