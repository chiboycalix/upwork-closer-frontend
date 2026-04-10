"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function DangerZone() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="rounded-2xl border border-red-500/10 bg-[#13131a] p-6">
      <h3 className="mb-1 text-sm font-semibold text-red-400">Danger Zone</h3>
      <p className="mb-4 text-xs text-zinc-600">
        Irreversible actions — proceed with caution.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="cursor-pointer rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          Sign Out of All Devices
        </button>
        <button className="cursor-pointer rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10">
          Delete Account
        </button>
      </div>
    </div>
  );
}
