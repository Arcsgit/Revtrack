import { Inter } from 'next/font/google'
import './globals.css'
import AuthButton from '@/components/header-auth'
import { ThemeProvider, ThemeSwitcher } from '@/components/theme-switcher'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RevTrack - Revenue Tracking Dashboard',
  description: 'Track and manage your revenue streams with RevTrack',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-primary">RevTrack</h1>
                    <nav className="hidden md:flex space-x-6">
                      <a href="/" className="text-sm font-medium hover:text-primary">
                        Dashboard
                      </a>
                      <a href="/revenue" className="text-sm font-medium hover:text-primary">
                        Revenue
                      </a>
                      <a href="/analytics" className="text-sm font-medium hover:text-primary">
                        Analytics
                      </a>
                    </nav>
                  </div>
                  <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <AuthButton />
                  </div>
                </div>
              </div>
            </header>
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
