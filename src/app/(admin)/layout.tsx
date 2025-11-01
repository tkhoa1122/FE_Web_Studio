'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from 'react-redux';
import { store } from '../../application/redux/store';
import { Header } from './AdminLayout/header';
import { Sidebar } from './AdminLayout/sidebar';
import { SidebarProvider } from './AdminLayout/sidebar/sidebar-context';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <title>Admin Dashboard - Studio Booking</title>
        <meta name="description" content="Quản trị hệ thống đặt lịch thuê studio chuyên nghiệp." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider store={store}>
          <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              
              <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header />
                
                <main className="flex-1 p-4 md:p-6 2xl:p-10">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </Provider>
      </body>
    </html>
  );
}
