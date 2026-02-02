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
import { authClient } from "@/lib/auth-client";
import { ArrowDown, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { IoAnalytics } from "react-icons/io5";
import { toast } from "sonner";
import { useCallback } from "react";

interface UserDropdownProps {
  name: string;
  email: string;
  image: string;
}

export function UserDropdown({ email, name, image }: UserDropdownProps) {
  const router = useRouter();

  const signOut = useCallback(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Logout successfully.");
        },
        onError: () => {
          toast.error("Failed to logout!");
        },
      },
    });
  }, [router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>
              {name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ArrowDown size={10} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium truncate">{name}</span>
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
            <Link href="/dashboard">
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
