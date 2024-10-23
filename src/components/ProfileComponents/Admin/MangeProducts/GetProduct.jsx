import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
const serverUrl = "https://server-shop-p7jv.onrender.com";
function GetProduct() {
  const [searchId, setSearchId] = useState("");
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    if (!searchId) {
      setError("Please enter a product ID.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/products/${searchId}`
      );
      const data = await response.json();

      if (data.status === "success") {
        setProduct(data.data.product);
      } else {
        setError("Product not found.");
        setProduct(null);
      }
    } catch (err) {
      setError("Error fetching product.");
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Search Product by ID</h2>
      <div className="flex items-center mb-6">
        <input
          type="text"
          className="border border-gray-300 rounded-l-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Product ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          <AiOutlineSearch size={24} />
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isLoading && <div className="text-blue-500">Loading...</div>}

      {product && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">{product.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src={`${serverUrl}/${product.image.replace(/\\/g, "/")}`}
              alt={product.title}
              className="w-full h-64 object-contain rounded-lg shadow-md"
            />
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="text-gray-700">
                <strong>ID:</strong> {product._id}
              </p>
              <p className="text-gray-700">
                <strong>Description:</strong> {product.description}
              </p>
              <p className="text-gray-700">
                <strong>Rating:</strong> {product.rating?.rate} / 5 (
                {product.rating?.count} reviews)
              </p>
              <p className="text-gray-700">
                <strong>Created At:</strong>{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Last Updated:</strong>{" "}
                {new Date(product.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Display Reviews */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4">Customer Reviews</h4>
            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <p className="text-gray-700 font-semibold">{review.name}</p>
                    <p className="text-gray-600">{review.review}</p>
                    <p className="text-gray-500 text-sm">
                      Rating: {review.rating} / 5
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GetProduct;
