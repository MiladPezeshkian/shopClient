import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import Spinner from "../../../spinnerOnlyComponents/Spinner";
import PropTypes from "prop-types";

function EditAUser({ choseOne }) {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });
  // دریافت اطلاعات کاربر از prop
  useEffect(() => {
    if (choseOne) {
      setIsLoading(true);
      try {
        setUser(choseOne);
        setUpdatedUser(choseOne);
      } catch (err) {
        setError("Error loading user data.");
      } finally {
        setIsLoading(false);
      }
    }
  }, [choseOne]);

  const handleUpdate = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/users/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setUser(data.data.user);
        alert("User updated successfully!");
      } else {
        setError("Error updating user.");
      }
    } catch (err) {
      setError("Error updating user.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit User</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isLoading && (
        <div className="text-blue-500">
          <Spinner />
        </div>
      )}

      {user && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Editing: {user.name}</h3>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-4">
              {["name", "email", "PhoneNumber", "address"].map((field) => (
                <label key={field} className="block">
                  <span className="text-gray-700 capitalize">{field}</span>
                  <div className="flex items-center">
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={updatedUser[field] || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing[field]}
                      className="border border-gray-300 p-2 rounded-md w-full focus:outline-none"
                    />
                    <AiOutlineEdit
                      onClick={() => toggleEdit(field)}
                      className="ml-2 text-blue-500 cursor-pointer"
                      size={20}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="mt-6 bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-colors shadow-lg w-full"
          >
            Submit Changes
          </button>
        </div>
      )}
    </div>
  );
}

EditAUser.propTypes = {
  choseOne: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};

export default EditAUser;
