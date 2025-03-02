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
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex md:mx-5 md:justify-center items-center gap-2 md:flex-row flex-col`}
      >
        {session?.user ? (
          <NavBar
            user={{
              name: session?.user.name ?? '',
              image: session?.user.image ?? '',
            }}
          />
        ) : null}
        <main className='md:py-8 w-[500px] lg:w-[700px] text-wrap h-lvh overflow-y-scroll items-center scrollbar-hidden px-3 md:p4'>
          {children}
        </main>
      </body>
    </html>
  )
}
