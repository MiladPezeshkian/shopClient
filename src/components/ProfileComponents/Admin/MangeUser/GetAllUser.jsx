import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

function GetAllUser({ setChoseOne }) {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null); // State for selected user

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://server-shop-p7jv.onrender.com/api/v1/users",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data = await response.json();
        setAllUsers(data.data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (user) => {
    setChoseOne(user);
    setSelectedUserId(user._id); // Set selected user ID
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 bg-red-100 text-red-700 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Users</h2>

      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-600">
                User Name
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                User ID
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                Email
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr
                key={user._id}
                className={`border-b border-gray-200 transition-colors duration-300 cursor-pointer ${
                  selectedUserId === user._id ? "bg-green-200" : ""
                }`}
                onClick={() => handleRowClick(user)}
              >
                <td className="p-4 text-gray-700">{user.name}</td>
                <td className="p-4 text-gray-700">{user._id}</td>
                <td className="p-4 text-gray-700">{user.email}</td>
                <td className="p-4 text-gray-700">
                  {user.isActive ? "Active" : "banned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {allUsers.map((user) => (
          <div
            key={user._id}
            className={`flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 cursor-pointer ${
              selectedUserId === user._id ? "bg-green-200" : ""
            }`}
            onClick={() => handleRowClick(user)}
          >
            <div className="flex flex-row justify-between mb-2">
              <strong className="text-gray-700">Name:</strong>
              <span className="text-gray-700">{user.name}</span>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <strong className="text-gray-700">ID:</strong>
              <span className="text-gray-700">{user._id}</span>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <strong className="text-gray-700">Email:</strong>
              <span className="text-gray-700">{user.email}</span>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <strong className="text-gray-700">Active</strong>
              <span className="text-gray-700">
                {user.isActive ? "Active" : "banned"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

GetAllUser.propTypes = {
  setChoseOne: PropTypes.func.isRequired,
};

export default GetAllUser;
