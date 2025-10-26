import type { ReactNode } from "react";
import { SidebarProvider } from "./AdminLayout/sidebar/sidebar-context";
import { Sidebar } from "./AdminLayout/sidebar";
import { Header } from "./AdminLayout/header";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-dark">
        <div className="flex">
          <Sidebar />

          <div className="flex-1 min-h-screen flex flex-col">
            <Header />

            <main className="p-6 sm:p-8 md:p-10">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
