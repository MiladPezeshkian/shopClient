import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
const serverUrl = "https://server-shop-p7jv.onrender.com";
function DeleteAProduct() {
  const [searchId, setSearchId] = useState("");
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  // Handle product search
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

  // Handle delete product
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/products/${searchId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Product deleted successfully!");
        setProduct(null);
        setSearchId("");
      } else {
        setError("Error deleting product.");
      }
    } catch (err) {
      setError("Error deleting product.");
    } finally {
      setIsLoading(false);
      setIsConfirming(false);
    }
  };

  // Toggle confirmation modal
  const toggleConfirmModal = () => {
    setIsConfirming(!isConfirming);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Delete Product</h2>

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
          <img
            src={`${serverUrl}/${product.image.replace(/\\/g, "/")}`}
            alt={product.title}
            className="w-48 h-48 object-cover rounded-lg shadow-md mb-4"
          />
          <button
            onClick={toggleConfirmModal}
            className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors shadow-lg w-full"
          >
            Delete Product
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirming && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this product?
            </h3>
            <p className="text-red-500 mb-4">This action is irreversible!</p>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors w-1/2"
              >
                Yes, Delete
              </button>
              <button
                onClick={toggleConfirmModal}
                className="bg-gray-300 text-black p-3 rounded-md hover:bg-gray-400 transition-colors w-1/2 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAProduct;
