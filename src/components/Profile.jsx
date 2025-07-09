"use client";

import ProfileActions from "./ProfileActions";

export default function Profile({ name, email }) {
  return (
    <div className="flex flex-col gap-4 w-full items-center max-w-2xl">
      <h2>Profile Page</h2>
      <p className="text-lg text-gray text-center">
        Welcome, <span className="font-bold">{name}</span>!
      </p>
      <p className="text-lg text-gray text-center">
        Your registered email is: <span className="font-bold">{email}</span>
      </p>
      <ProfileActions />
    </div>
  );
}
