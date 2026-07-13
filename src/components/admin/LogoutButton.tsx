import { logoutAction } from "@/app/admin/actions";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="font-display border-2 border-espresso px-4 py-2 text-espresso transition-colors hover:bg-espresso hover:text-cream"
      >
        Kijelentkezés
      </button>
    </form>
  );
}
