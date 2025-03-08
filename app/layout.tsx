import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import { auth } from '@/lib/auth'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Resume Prepare App',
  description: 'App for generating Resumes',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang='en' className='light' suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex md:mx-5 md:justify-center bg-gray-300 dark:bg-gray-900 dark:text-white items-center gap-2 md:flex-row flex-col`}
      >
          {session?.user ? (
            <NavBar
              user={{
                name: session?.user.name ?? '',
                image: session?.user.image ?? '',
              }}
            />
          ) : null}
          <main className='md:py-8 max-w-[500px] lg:max-w-[700px] w-full text-wrap md:max-h-lvh items-center px-3 md:p4'>
            {children}
            <div className='h-5'></div>
          </main>
          
      </body>
    </html>
  )
}
