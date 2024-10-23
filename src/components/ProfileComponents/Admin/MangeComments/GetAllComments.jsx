import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

function GetAllComments({ setChoseOneComment }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null); // State برای ذخیره کامنت انتخاب‌شده

  // Fetch comments from the server
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://server-shop-p7jv.onrender.com/api/v1/products/allComments`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
          setComments(data.data.reviews);
          setLoading(false);
        } else {
          setError("Failed to load comments.");
          setLoading(false);
        }
      } catch (err) {
        setError("An error occurred while fetching comments.");
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const handleCommentClick = (comment) => {
    setSelectedCommentId(comment._id); // ذخیره آی‌دی کامنت انتخاب‌شده
    setChoseOneComment(comment); // ارسال کامنت انتخاب‌شده به تابع والد
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">All Comments</h2>
      {comments.length === 0 ? (
        <p>No comments available for this product.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            onClick={() => handleCommentClick(comment)} // تغییرات در اینجا
            className={`p-4 mb-4 cursor-pointer rounded-md ${
              selectedCommentId === comment._id
                ? "bg-blue-200" // رنگ کامنت انتخاب‌شده
                : "bg-gray-100 hover:bg-gray-200" // رنگ کامنت‌های دیگر
            }`}
          >
            <p>
              <strong>User:</strong> {comment.name}
            </p>
            <p>
              <strong>Comment:</strong> {comment.review}
            </p>
            <p>
              <strong>Rating:</strong> {comment.rating}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

GetAllComments.propTypes = {
  setChoseOneComment: PropTypes.func.isRequired,
};

export default GetAllComments;
