import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

function GetUserComments({ choseOneComment }) {
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = choseOneComment.user;
  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const response = await fetch(
          `https://server-shop-p7jv.onrender.com/api/v1/products/userComments/${user}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.status === "success") {
          setUserComments(data.data.comments);
          setLoading(false);
        } else {
          setError("Failed to load user comments.");
          setLoading(false);
        }
      } catch (err) {
        setError("An error occurred while fetching user comments.");
        setLoading(false);
      }
    };

    if (user) fetchUserComments();
  }, [user]);

  if (loading) return <Spinner />;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">
        All Comments from : {choseOneComment.name}
      </h2>

      {userComments.length === 0 ? (
        <p>No comments found for this user.</p>
      ) : (
        userComments.map((comment) => (
          <div key={comment._id} className="p-4 mb-4 bg-gray-100 rounded-md">
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

GetUserComments.propTypes = {
  choseOneComment: PropTypes.shape({
    user: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default GetUserComments;
