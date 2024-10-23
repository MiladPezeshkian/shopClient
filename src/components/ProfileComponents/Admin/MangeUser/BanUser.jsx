import PropTypes from "prop-types";
import { useState } from "react";

function BanUser({ choseOne }) {
  const [loading, setLoading] = useState(false);
  const { name, email, _id } = choseOne || {};

  const handleBan = async (isBan) => {
    const route = isBan
      ? `https://server-shop-p7jv.onrender.com/api/v1/users/banUser/${_id}`
      : `https://server-shop-p7jv.onrender.com/api/v1/users/unBanUser/${_id}`;
    setLoading(true);
    try {
      const response = await fetch(route, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        await response.json();
        alert(
          isBan ? "User banned successfully" : "User unbanned successfully"
        );
      } else {
        throw new Error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating user status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        User Information
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Name:</span>
          <span>{name || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Email:</span>
          <span>{email || "N/A"}</span>
        </div>
      </div>
      <div className="mt-6 flex justify-around">
        <button
          onClick={() => handleBan(true)}
          disabled={loading}
          className={`px-4 py-2 text-white bg-red-500 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Ban User"}
        </button>
        <button
          onClick={() => handleBan(false)}
          disabled={loading}
          className={`px-4 py-2 text-white bg-green-500 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Unban User"}
        </button>
      </div>
    </div>
  );
}

BanUser.propTypes = {
  choseOne: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BanUser;
