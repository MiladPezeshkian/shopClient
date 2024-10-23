import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

function GetAllEmail({ setEmail }) {
  const [emails, setEmails] = useState([]); // ذخیره ایمیل‌ها
  const [loading, setLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // مدیریت خطاها
  const [selectedEmail, setSelectedEmail] = useState(null); // ایمیل انتخاب شده

  // دریافت ایمیل‌ها از API
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          "https://server-shop-p7jv.onrender.com/api/v1/contact/messages",
          { method: "GET", credentials: "include" }
        );
        if (!response.ok) throw new Error("Error fetching emails");

        const data = await response.json();
        setEmails(data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  // مدیریت کلیک روی ایمیل و تغییر رنگ آن
  const handleEmailClick = (email) => {
    setSelectedEmail(email); // ایمیل انتخاب شده را ذخیره می‌کند
    setEmail(email.email); // ارسال ایمیل به تابع setEmail
  };

  // بررسی حالت‌های مختلف
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        All Emails
      </h2>
      <ul className="space-y-4">
        {Array.isArray(emails) && emails.length > 0 ? (
          emails.map((email) => (
            <li
              key={email._id}
              onClick={() => handleEmailClick(email)}
              className={`p-6 border-2 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 
                ${
                  selectedEmail === email
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 border-indigo-500 text-white scale-105"
                    : "bg-white border-gray-200"
                }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span
                    className={`text-lg md:text-xl font-semibold ${
                      selectedEmail === email ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {email.email}
                  </span>
                </div>
              </div>
              <p
                className={`mt-4 text-sm md:text-base ${
                  selectedEmail === email ? "text-white" : "text-gray-600"
                }`}
              >
                {email.message ? email.message : "No message provided"}
              </p>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 text-lg">No emails found</li>
        )}
      </ul>
    </div>
  );
}

// تعریف PropTypes برای کامپوننت
GetAllEmail.propTypes = {
  setEmail: PropTypes.func.isRequired,
};

export default GetAllEmail;
