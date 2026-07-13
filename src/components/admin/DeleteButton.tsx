"use client";

export default function DeleteButton({
  id,
  action,
  disabled,
  label,
}: {
  id: string;
  action: (formData: FormData) => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!confirm(`Biztosan törli ${label}? Ez nem vonható vissza.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={disabled}
        className="text-sm font-semibold text-rust-dark underline disabled:cursor-not-allowed disabled:opacity-50"
      >
        Törlés
      </button>
    </form>
  );
}
