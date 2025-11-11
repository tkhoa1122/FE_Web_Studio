"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Calendar, Users, Package, BarChart3, Settings, LayoutDashboard } from "lucide-react";
import { ArrowLeftIcon } from "./icons";
import { useSidebarContext } from "./sidebar-context";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/studios", label: "Studios", icon: Camera },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/staff", label: "Thiết bị", icon: Package },
    { href: "/admin/users", label: "Người dùng", icon: Users },
    { href: "/admin/reports", label: "Thống kê", icon: BarChart3 },
    { href: "/admin/settings", label: "Cài đặt", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "border-r border-gray-200 bg-white transition-transform duration-200",
          isMobile
            ? cn(
              "fixed inset-y-0 left-0 z-50 w-64 shadow-lg",
              isOpen ? "translate-x-0" : "-translate-x-full",
            )
            : "w-64 h-screen sticky top-0 flex-shrink-0",
        )}
        aria-label="Main navigation"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-5">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-2.5 shadow-sm">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">Studio Booking</span>
              </div>
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="sr-only">Close Menu</span>

                <ArrowLeftIcon className="size-6" />
              </button>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || pathname?.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => isMobile && toggleSidebar()}
                  className={cn(
                    "flex items-center space-x-3 rounded-xl px-4 py-3 font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
