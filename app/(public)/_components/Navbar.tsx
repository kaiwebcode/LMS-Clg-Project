"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/admin" },
];

export function Navbar() {
  const { data, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold">
          Kai-LMS
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />

          {!isPending && data?.session ? (
            <UserDropdown
              name={data.user.name ?? ""}
              email={data.user.email ?? ""}
              image={data.user.image ?? ""}
            />
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                Login
              </Link>
              <Link href="/login" className={buttonVariants()}>
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-75">
              <SheetHeader>
                <SheetTitle>Kai-LMS</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="my-4 h-px bg-border" />

                <ModeToggle />

                {!isPending && data?.session ? (
                  <UserDropdown
                    name={data.user.name ?? ""}
                    email={data.user.email ?? ""}
                    image={data.user.image ?? ""}
                  />
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Login
                    </Link>
                    <Link href="/login" className={buttonVariants()}>
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
