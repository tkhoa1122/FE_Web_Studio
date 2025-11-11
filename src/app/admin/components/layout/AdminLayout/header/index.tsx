"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { useAuth } from "@/application/hooks/useAuth";
import { Bell, ChevronDown } from "lucide-react";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const { user, logout } = useAuth();
  const userInitial = user?.fullName?.charAt(0).toUpperCase() || "A";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur px-4 py-3 shadow-sm md:px-5 2xl:px-8">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border border-gray-200 px-1.5 py-1 hover:bg-gray-100 transition-colors lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-3">

        <div className="flex items-center gap-2 min-[375px]:gap-3">
          <button
            className="relative p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center space-x-2.5 bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-200">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
              {userInitial}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">{user?.fullName || "Administrator"}</p>
              <p className="text-xs text-gray-500 uppercase font-medium">Administrator</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <button
            onClick={logout}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}
