import PropTypes from "prop-types";
import { useState } from "react";

function DeleteComment({ choseOneComment }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/products/deleteReview`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            reviewId: choseOneComment._id,
          }),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setSuccessMessage("Comment deleted successfully!");
      } else {
        setError("Error deleting comment.");
      }
    } catch (err) {
      setError("Error deleting comment.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-red-500 mb-4">Delete Comment</h2>
      <p className="text-gray-700 text-lg mb-4">
        Are you sure you want to delete this comment?
      </p>
      <div className="mb-4">
        <p className="text-gray-600">
          <strong>User:</strong> {choseOneComment.name}
        </p>
        <p className="text-gray-600">
          <strong>Comment:</strong> {choseOneComment.review}
        </p>

        <p className="text-gray-600">
          <strong>Rating:</strong> {choseOneComment.rating}
        </p>
      </div>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors"
      >
        Delete Comment
      </button>

      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

DeleteComment.propTypes = {
  choseOneComment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteComment;
