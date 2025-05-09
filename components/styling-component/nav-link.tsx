"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={cn(
        "text-sm transition-colors duration-200 text-gray-700 hover:text-rose-500",
        className,
        isActive && "text-rose-600"
      )}
    >
      {children}
    </Link>
  );
}
