import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F3EF] max-w-md mx-auto">
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md border-t border-stone-200 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center justify-around py-3">
          <NavItem href="/dashboard" label="Tonight" />
          <NavItem href="/dashboard/trend" label="Trend" />
          <NavItem href="/dashboard/results" label="Results" />
          <NavItem href="/dashboard/profile" label="Profile" />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-0.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors px-4 py-1"
    >
      {label}
    </Link>
  );
}
