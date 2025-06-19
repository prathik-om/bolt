import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { Providers } from '@/components/providers'
import { theme } from '@/lib/theme'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/spotlight/styles.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Timetable Generator - K-12 School Scheduling',
  description: 'Intelligent scheduling system for K-12 schools with AI-powered timetable generation',
  keywords: ['school scheduling', 'timetable generator', 'AI scheduling', 'K-12 education'],
  authors: [{ name: 'AI Timetable Generator Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications />
            <Providers>
              {children}
            </Providers>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  )
}