"use client";

import { Menu } from "@mui/material";
import { type ReactNode } from "react";

export interface DropdownProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: ReactNode;
  className?: string;
}

export function DropdownContent({
  children,
  className,
  align = "center",
}: {
  children: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}) {
  return <div className={className}>{children}</div>;
}

export function DropdownTrigger({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <div onClick={onClick} role="button" tabIndex={0} className={className}>
      {children}
    </div>
  );
}

export function Dropdown({ open, onClose, anchorEl, children, className }: DropdownProps) {
  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      className={className}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {children}
    </Menu>
  );
}

export { MenuItem } from "@mui/material";