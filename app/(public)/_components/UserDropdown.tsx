"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { IoAnalytics } from "react-icons/io5";
import { useSignOut } from "@/hooks/use-signout";
import { authClient } from "@/lib/auth-client";
import { useMemo } from "react";

interface UserDropdownProps {
  name: string;
  email: string;
  image: string;
}

type NavUserType = {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

function getAvatarUrl(user: NavUserType) {
  if (user.image) return user.image;
  const seed = user.id || user.email || "user";
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
    seed,
  )}`;
}

export function UserDropdown({ email, name, image }: UserDropdownProps) {
  const signOut = useSignOut();

  const session = authClient.useSession();

  const user = session.data?.user;

  const displayName = useMemo(() => {
    if (!user) return "User";
    return user.name || user.email?.split("@")[0] || "User";
  }, [user]);

  const avatarUrl = useMemo(() => {
    if (!user) return "";
    return getAvatarUrl(user);
  }, [user]);

  if (session.isPending || !session.data?.session || !user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full px-8 py-4">
          <Avatar>
            <AvatarImage src={image || avatarUrl} alt={name} />
            <AvatarFallback>{name?.charAt(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <ArrowDown size={10} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium truncate">
            {name || displayName}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              <FaHome /> Home
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/courses">
              <GiBookCover /> Courses
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/admin">
              <IoAnalytics /> Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>
          <LogOutIcon /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
