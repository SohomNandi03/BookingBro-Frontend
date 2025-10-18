import React from "react";
import { useAuth } from "./AuthProvider";

const Profile = () => {
  const { user } = useAuth();
  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <p><strong>User ID:</strong> {user.sub}</p>
      <p><strong>Roles:</strong> {user.roles}</p>
    </div>
  );
};

export default Profile;  // ✅ default export
