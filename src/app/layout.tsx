import './globals.css'
import { Inter } from 'next/font/google'
import {Navbar} from './components/nav/Navbar'
import React from "react";
import {Sidebar} from "@/app/components/nav/Sidebar";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <main>
                  <Navbar/>
                  <Sidebar/>
                  <div className = {"pageContent"}>
                      {children}
                  </div>
          </main>
      </body>
    </html>
  )
}
