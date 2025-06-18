"use client";

export default function ProfileActions() {
  function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      alert(
        "Account deletion is not implemented yet. This is a placeholder action."
      );
    } else {
      return;
    }
  }
  return (
    <div className="flex flex-col gap-4 w-full items-center max-w-2xl">
      <h2 className="text-2xl font-bold">Profile Actions</h2>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Account
      </button>
    </div>
  );
}
