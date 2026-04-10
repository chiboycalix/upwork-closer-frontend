import Link from "next/link";

import { GuestGuard } from "@/components/guards/guest-guard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestGuard>
      <div className="flex min-h-full flex-col bg-[#0a0a0f]">
      {/* Subtle radial glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(121,252,235,0.06),transparent_60%)]" />

      <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-12">
        {/* Logo + branding */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI Upwork Closer
          </h1>
          <p className="text-sm text-zinc-400">
            Elevate your freelance workflow
          </p>
        </div>

        {/* Auth card */}
        <div className="w-full max-w-[420px] rounded-2xl border border-white/[0.06] bg-[#13131a] p-8 shadow-2xl shadow-brand-950/10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.06] px-6 py-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 text-xs text-zinc-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} AI Upwork Closer. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </footer>
    </div>
    </GuestGuard>
  );
}
