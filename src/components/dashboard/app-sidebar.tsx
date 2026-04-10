"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUserProfile } from "@/hooks/use-settings";
import { useAuthStore } from "@/store/auth-store";

const navItems = [
  { label: "Dashboard", href: "/", icon: "hugeicons:dashboard-square-02" },
  { label: "My Jobs", href: "/jobs", icon: "hugeicons:briefcase-01" },
  { label: "Settings", href: "/settings", icon: "hugeicons:settings-02" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const { data: profile } = useUserProfile();

  const displayName = profile?.fullName || profile?.email || "User";
  const initials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : profile?.email?.charAt(0).toUpperCase() ?? "?";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-white/[0.06]">
      {/* Branding */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex size-8 items-center justify-center rounded-lg bg-brand-500/10">
                <Icon icon="hugeicons:target-02" className="size-4 text-brand-400" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Upwork Closer</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
                    }
                    tooltip={item.label}
                  >
                    <Icon icon={item.icon} className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton size="lg" className="cursor-pointer" />
                }
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                  {initials}
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-sm font-medium">{displayName}</span>
                  <span className="text-xs text-muted-foreground">
                    {profile?.email ?? ""}
                  </span>
                </div>
                <Icon
                  icon="hugeicons:arrow-up-01"
                  className="ml-auto size-4 text-zinc-500"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
              >
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-muted-foreground">
                    {profile?.email ?? ""}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Icon icon="hugeicons:settings-02" className="mr-2 size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 focus:text-red-400"
                >
                  <Icon icon="hugeicons:logout-02" className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
