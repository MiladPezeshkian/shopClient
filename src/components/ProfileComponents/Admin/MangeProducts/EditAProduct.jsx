import { useState } from "react";
import { AiOutlineSearch, AiOutlineEdit } from "react-icons/ai";
import Spinner from "../../../spinnerOnlyComponents/Spinner";
const serverUrl = "https://server-shop-p7jv.onrender.com";
function EditAProduct() {
  const [searchId, setSearchId] = useState("");
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState({
    title: false,
    price: false,
    description: false,
    category: false,
    rating: false,
    image: false,
  });

  const categories = [
    { name: "Men's Clothing", logo: "../../imgs/catagorys/manClothing.png" },
    {
      name: "Women's Clothing",
      logo: "../../imgs/catagorys/womenClothing.png",
    },
    { name: "Jewelery", logo: "../../imgs/catagorys/jewlery.png" },
    { name: "Electronics", logo: "../../imgs/catagorys/computer.png" },
  ];

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
        setUpdatedProduct(data.data.product); // Pre-fill edit form with current product details
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

  // Handle product update
  const handleUpdate = async () => {
    setIsLoading(true);
    setError("");
    try {
      console.log(updatedProduct);
      const response = await fetch(
        `https://server-shop-p7jv.onrender.com/api/v1/products/${searchId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedProduct),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setProduct(data.data.product);
        alert("Product updated successfully!");
      } else {
        setError("Error updating product.");
      }
    } catch (err) {
      setError("Error updating product.");
    } finally {
      setIsLoading(false);
    }
  };
  //https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Product</h2>

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
      {isLoading && (
        <div className="text-blue-500">
          <Spinner />
        </div>
      )}

      {product && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">
            Editing: {product.title}
          </h3>

          <div className="mb-6">
            <img
              src={`${serverUrl}/${product.image.replace(/\\/g, "/")}`}
              alt={product.title}
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Title</span>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="title"
                    value={updatedProduct.title || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing.title}
                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none"
                  />
                  <AiOutlineEdit
                    onClick={() => toggleEdit("title")}
                    className="ml-2 text-blue-500 cursor-pointer"
                    size={20}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-gray-700">Price</span>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="price"
                    value={updatedProduct.price || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing.price}
                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none"
                  />
                  <AiOutlineEdit
                    onClick={() => toggleEdit("price")}
                    className="ml-2 text-blue-500 cursor-pointer"
                    size={20}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-gray-700">Description</span>
                <div className="flex items-center">
                  <textarea
                    name="description"
                    value={updatedProduct.description || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing.description}
                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none"
                  />
                  <AiOutlineEdit
                    onClick={() => toggleEdit("description")}
                    className="ml-2 text-blue-500 cursor-pointer"
                    size={20}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-gray-700">Category</span>
                <div className="flex items-center">
                  <select
                    name="category"
                    value={updatedProduct.category || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing.category}
                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none"
                    defaultValue={product.category}
                  >
                    {categories.map((cat, index) => (
                      <option key={index} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <AiOutlineEdit
                    onClick={() => toggleEdit("category")}
                    className="ml-2 text-blue-500 cursor-pointer"
                    size={20}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-gray-700">Image URL</span>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="image"
                    value={updatedProduct.image || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing.image}
                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none"
                  />
                  <AiOutlineEdit
                    onClick={() => toggleEdit("image")}
                    className="ml-2 text-blue-500 cursor-pointer"
                    size={20}
                  />
                </div>
              </label>
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className="mt-6 bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-colors shadow-lg w-full"
          >
            Submit Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default EditAProduct;
