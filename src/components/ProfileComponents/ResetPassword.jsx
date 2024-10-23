import { useState } from "react";
import useAuth from "../../hook/useAuth";
import Spinner from "../Spinner/Spinner"; // اطمینان از وارد کردن کامپوننت Spinner

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { logout } = useAuth();
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: "error",
        text: "New password and confirm password do not match.",
      });
      return;
    }

    setIsLoading(true); // Show loading

    try {
      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/auth/resetPasswordInLoggin",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Password reset successfully!" });
        logout();
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to reset password.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg w-full ">
      <h2 className="text-2xl font-semibold text-red-600 mb-6">
        Reset Your Password
      </h2>
      {message.text && (
        <p
          className={`text-xl mb-4 ${
            message.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
      {isLoading && <Spinner />} {/* نمایش کامپوننت Spinner در حال بارگذاری */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            placeholder="Current Password"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            placeholder="New Password"
            required
          />
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            placeholder="Confirm New Password"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 font-medium"
            onClick={() => console.log("Cancel Clicked")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
