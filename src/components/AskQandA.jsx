import { useState, useEffect } from "react";
import useAuth from "../hook/useAuth";
import { useUserInfo } from "../hook/useUserInfo";
import RecaptchaComponent from "./RecaptchaComponent"; // Ensure RecaptchaComponent is imported

const AskQandA = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { isLogin } = useAuth();
  const { userData } = useUserInfo();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false); // State to track if captcha is verified

  useEffect(() => {
    if (isLogin && userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.PhoneNumber || "",
        message: "",
      });
    }
  }, [isLogin, userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      setError("Please complete the reCAPTCHA verification.");
      return;
    }

    try {
      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
          credentials: "include",
        }
      );
      if (response.ok) {
        setSuccess("Message sent successfully!");
        setError(null);
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form on success
      } else {
        const result = await response.json();
        throw new Error(
          result.message || "Failed to send message. Please try again."
        );
      }
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:text-lg lg:text-xl">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
        Ask a Question
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 shadow-lg rounded-lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
              required
              disabled={isLogin} // Disable field if user is logged in
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
              required
              disabled={isLogin} // Disable field if user is logged in
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone *"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
              required
              disabled={isLogin} // Disable field if user is logged in
            />
          </div>
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 resize-none transition-all duration-200"
            required
          />
        </div>

        {/* reCAPTCHA component */}
        <RecaptchaComponent onVerified={setCaptchaVerified} />

        {success && (
          <p className="text-green-500 text-lg font-semibold">{success}</p>
        )}
        {error && <p className="text-red-500 text-lg font-semibold">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 ${
              !captchaVerified && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!captchaVerified} // Disable button until captcha is verified
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskQandA;
