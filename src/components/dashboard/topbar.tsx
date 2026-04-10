"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserProfile } from "@/hooks/use-settings";
import { useAuthStore } from "@/store/auth-store";

export function DashboardHeader() {
  const router = useRouter();
  const { data: profile } = useUserProfile();
  const logout = useAuthStore((s) => s.logout);

  const initials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : profile?.email?.charAt(0).toUpperCase() ?? "U";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-white/[0.06] px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 !h-4" />

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>AI Upwork Closer</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        <button className="relative cursor-pointer rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-200">
          <Icon icon="hugeicons:notification-02" className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-brand-400" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-xs font-bold text-white transition-opacity hover:opacity-90">
                {initials}
              </button>
            }
          />
          <DropdownMenuContent align="end" className="min-w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">
                {profile?.fullName || "User"}
              </p>
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
      </div>
    </header>
  );
}
