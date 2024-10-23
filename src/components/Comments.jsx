import { useState, useEffect } from "react";
import useAuth from "../hook/useAuth";
import { useUserInfo } from "../hook/useUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import Spinner from "./spinnerOnlyComponents/Spinner";

function Comments() {
  const { isLogin } = useAuth();
  const { userData } = useUserInfo();
  const { id: productId } = useParams();

  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(0); // Start with no comments visible
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [showAddComment, setShowAddComment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);

  // Fetch comments from the server when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://server-shop-p7jv.onrender.com/api/v1/products/reviews/${productId}`
        );

        const data = await response.json();

        if (Array.isArray(data.productComments.reviews)) {
          setComments(data.productComments.reviews);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        setError("Failed to load comments. Please try again later.");
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  const handleAddComment = async () => {
    if (isLogin && newComment.trim() !== "" && newComment.length <= 200) {
      setLoadingComments(true);
      const newCommentObj = {
        user: userData._id,
        review: newComment,
        rating: newRating,
        productId,
      };
      try {
        const response = await fetch(
          `https://server-shop-p7jv.onrender.com/api/v1/products/addReview/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newCommentObj),
          }
        );
        const result = await response.json();
        if (response.ok) {
          setComments((prevComments) => [
            ...prevComments,
            result.data.product.reviews.slice(-1)[0],
          ]);
          setNewComment("");
          setNewRating(5);
        } else {
          throw new Error(result.message || "Failed to add comment.");
        }
      } catch (error) {
        setError("Error adding comment. Please try again.");
        console.error("Error adding comment:", error);
      } finally {
        setLoadingComments(false);
      }
    }
  };

  const renderStars = (rating) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={index < rating ? solidStar : regularStar}
          className="text-yellow-500 mr-1"
        />
      ))}
      <span className="text-gray-600 ml-2">{rating}/5</span>
    </div>
  );

  const handleShowMore = () => {
    setVisibleComments((prev) => prev + 2);
  };

  return (
    <div className="mt-10 p-6 bg-white shadow-xl rounded-lg w-[80%] mx-auto transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        Comments <span>({comments.length})</span>
      </h2>

      {/* Show Add Comment Button */}
      {isLogin ? (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setShowAddComment(!showAddComment)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:shadow-md hover:scale-105 transform transition-all duration-200"
          >
            {showAddComment ? "Hide Add Comment" : "Add a Comment"}
          </button>
        </div>
      ) : (
        ""
      )}

      {/* Add Comment Form */}
      {showAddComment && isLogin && (
        <div className="flex flex-col gap-4 mt-8 bg-gray-50 p-6 rounded-lg shadow-lg">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here (max 200 characters)..."
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-indigo-400 resize-none"
            rows="4"
            maxLength="200"
          ></textarea>

          <div className="flex items-center gap-4">
            <label htmlFor="rating" className="text-gray-700 font-medium">
              Your Rating:
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((num) => (
                <FontAwesomeIcon
                  key={num}
                  icon={num <= newRating ? solidStar : regularStar}
                  className={`text-yellow-500 cursor-pointer hover:scale-110 transition-transform ${
                    num <= newRating ? "hover:scale-125" : ""
                  }`}
                  onClick={() => setNewRating(num)}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleAddComment}
            disabled={
              !isLogin || newComment.trim() === "" || newComment.length > 200
            }
            className={`${
              isLogin ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
            } text-white py-2 px-6 rounded-lg font-semibold transition-all hover:shadow-md`}
          >
            Submit Comment
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      {/* Spinner for adding comment */}
      {loadingComments && (
        <div className="flex justify-center mt-6">
          <Spinner />
        </div>
      )}

      {/* Show Comments Button */}
      {!visibleComments && comments.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleComments(2)}
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-6 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transform transition-all duration-200"
          >
            Show Comments
          </button>
        </div>
      )}

      {/* Comments Section */}
      {!loading ? (
        visibleComments > 0 && (
          <div className="space-y-6 mt-8">
            {comments.slice(0, visibleComments).map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-md font-bold text-indigo-600">
                    {comment.name}
                  </p>
                  {renderStars(comment.rating)}
                </div>
                <p className="text-gray-600">{comment.review}</p>
              </div>
            ))}

            {/* Load More Comments Button */}
            {visibleComments < comments.length && (
              <div className="flex justify-center">
                <button
                  onClick={handleShowMore}
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-6 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transform transition-all duration-200"
                >
                  Load More Comments
                </button>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="flex justify-center mt-6">
          <Spinner />
        </div>
      )}

      {/* Login Prompt */}
      {!isLogin && (
        <p className="text-center  mt-6 text-3xl text-red-500">
          Please log in to add your View and Comments.
        </p>
      )}
    </div>
  );
}

export default Comments;
