import { useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

function AnswerEmail({ Email }) {
  const [message, setMessage] = useState(""); // پیغام کاربر
  const [responseStatus, setResponseStatus] = useState(""); // وضعیت پاسخ از سرور
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری

  // مدیریت ارسال فرم
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // فعال کردن اسپینر

    const dataToSend = {
      email: Email, // ایمیلی که انتخاب شده
      message, // پیغامی که کاربر نوشته
    };

    try {
      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/contact/sendMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(dataToSend), // ارسال داده‌ها به سرور
        }
      );
      if (response.ok) {
        setResponseStatus("Message sent successfully!");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      setResponseStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false); // غیرفعال کردن اسپینر
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        Answer Email
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            User Email:
          </label>
          <input
            type="email"
            value={Email}
            disabled
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-gray-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Message:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your response here..."
            required
          />
        </div>

        {/* نمایش اسپینر هنگام ارسال درخواست */}
        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // غیرفعال کردن دکمه هنگام بارگذاری
        >
          {loading ? <Spinner /> : "Send Message"}
        </button>
      </form>

      {/* نمایش وضعیت پاسخ از سرور */}
      {responseStatus && (
        <p
          className={`mt-4 text-center text-lg font-medium ${
            responseStatus.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {responseStatus}
        </p>
      )}
    </div>
  );
}

// تعریف PropTypes برای کامپوننت
AnswerEmail.propTypes = {
  Email: PropTypes.string.isRequired, // ایمیل باید یک رشته و اجباری باشد
};

export default AnswerEmail;
