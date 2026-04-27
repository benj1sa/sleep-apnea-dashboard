import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="px-5 pt-10 pb-6 space-y-6">
      <h1 className="text-2xl font-semibold text-stone-900">Profile</h1>
      <div className="rounded-2xl bg-white border border-stone-100 p-6 space-y-3 shadow-sm">
        <p className="text-sm text-stone-500">Signed in as</p>
        <p className="font-medium text-stone-900">{user?.email}</p>
      </div>
      <LogoutButton />
    </div>
  );
}
