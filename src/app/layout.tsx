import type {Metadata} from 'next'
import {Roboto} from 'next/font/google'
import './globals.css'
import React from "react";
import {Header} from "@/components/layout/Header";
import {AppProvider} from "@/components/AppContext";
import {Toaster} from "react-hot-toast";

const roboto = Roboto({subsets: ['latin'], weight: ['400', '500', '700']})

export const metadata: Metadata = {
    title: 'Eat and don\'t wake up',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
        <body className={roboto.className}>
        <main className="max-w-screen mx-auto">
                <AppProvider>
                    <Toaster/>
                    <Header/>
                    {children}
                </AppProvider>
        </main>
        </body>
        </html>
    )
}

