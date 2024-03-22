"use client";
import { usePathname } from "next/navigation";
import Logo from "../Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    name: "Dashboard",
    href: "/app/dashboard",
  },
  {
    name: "Account",
    href: "/app/account",
  },
];
const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center py-2 border-b-2 border-white/10">
      <Logo />
      <ul className="flex gap-x-3">
        {navLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "text-white/70 py-1 px-2 hover:text-white  transition",
                {
                  "text-white bg-black/10": pathname === item.href,
                }
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
