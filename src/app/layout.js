import { Inter } from 'next/font/google'
import './globals.css'
import ServiceWorkerRegistration from './ServiceWorkerRegistration'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'File Converter Pro', // <-- यहाँ बदलाव किया गया है
  description: 'Professional file conversion & manipulation tool', // <-- यह भी बदल दिया है
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  )
}
