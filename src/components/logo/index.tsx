"use client";

import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/images/logo/logo-icon.svg"
        width={32}
        height={32}
        alt="Studio Booking"
      />
      <span className="text-xl font-bold text-dark dark:text-white">
        Studio Booking
      </span>
    </div>
  );
}