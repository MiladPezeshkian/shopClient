import { useProducts } from "../../../../hook/useProducts";
import Spinner from "../../../spinnerOnlyComponents/Spinner";
const serverUrl = "https://server-shop-p7jv.onrender.com";
function GetAllProducts() {
  const { allProducts, isLoading } = useProducts();
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        All Products
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-600">
                Product Image
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                Product ID
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, key) => (
              <tr key={key} className="border-b border-gray-200">
                <td className="p-4">
                  <img
                    src={`${serverUrl}/${product.image}`}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="p-4 text-gray-700">{product._id}</td>
                <td className="p-4 text-gray-700">${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetAllProducts;
