"use client";

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
} from "@tabler/icons-react";
import { useMemo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { Tv2 } from "lucide-react";
import { useSignOut } from "@/hooks/use-signout";

type NavUserType = {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

/* ----------------------------------------
   Stable DiceBear Avatar
----------------------------------------- */
function getAvatarUrl(user: NavUserType) {
  if (user.image) return user.image;
  const seed = user.id || user.email || "user";
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
    seed,
  )}`;
}

export function NavUser() {
  const { isMobile } = useSidebar();
  const session = authClient.useSession();

  const signout = useSignOut();

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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>

              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="grid text-sm">
                  <span className="font-medium">{displayName}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/">
                  <FaHome />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <IconCreditCard /> Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/courses">
                  <Tv2 /> Courses
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={signout}>
              <IconLogout /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
