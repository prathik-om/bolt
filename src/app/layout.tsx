import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Providers } from '@/components/providers'
import { theme } from '@/lib/theme'
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
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}