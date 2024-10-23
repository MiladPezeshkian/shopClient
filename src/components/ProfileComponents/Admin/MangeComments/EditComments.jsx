import PropTypes from "prop-types";
import { useState } from "react";

function EditComments({ choseOneComment }) {
  const [review, setReview] = useState(choseOneComment.review);
  const [rating, setRating] = useState(choseOneComment.rating);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/products/updateReview`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            reviewText: review,
            rating: rating,
            reviewId: choseOneComment._id,
          }),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setSuccessMessage("Comment updated successfully!");
      } else {
        setError("Error updating comment.");
      }
    } catch (err) {
      setError("Error updating comment.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Edit Comment</h2>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg"
      ></textarea>

      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg"
        max={5}
        min={1}
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
      >
        Update Comment
      </button>

      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

EditComments.propTypes = {
  choseOneComment: PropTypes.shape({
    _id: PropTypes.string.isRequired,

    review: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default EditComments;
