import { useState, useEffect } from "react";
import { useUserInfo } from "../../../hook/useUserInfo";
import Spinner from "../../Spinner/Spinner";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const serverUrl = "https://server-shop-p7jv.onrender.com";

const MyOrders = () => {
  const { userData } = useUserInfo();
  const userId = userData._id;
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${serverUrl}/api/v1/orders/myOrders?user=${userId}&filter=${filter}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.data.orders || []);
      } catch (error) {
        setError("You have no orders yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, filter]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        My Orders <span>({orders.length})</span>
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`py-2 px-4 rounded-lg font-bold transition-all duration-300 ease-in-out ${
            filter === "all"
              ? "bg-blue-500 text-white shadow-lg transform scale-105"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-lg hover:scale-105"
          }`}
        >
          Show All Orders
        </button>
        <button
          onClick={() => setFilter("delivered")}
          className={`py-2 px-4 rounded-lg font-bold transition-all duration-300 ease-in-out ${
            filter === "delivered"
              ? "bg-green-500 text-white shadow-lg transform scale-105"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-lg hover:scale-105"
          }`}
        >
          Show Delivered
        </button>
        <button
          onClick={() => setFilter("not-delivered")}
          className={`py-2 px-4 rounded-lg font-bold transition-all duration-300 ease-in-out ${
            filter === "not-delivered"
              ? "bg-red-500 text-white shadow-lg transform scale-105"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-lg hover:scale-105"
          }`}
        >
          Show Not Delivered
        </button>
      </div>

      {/* Show spinner while loading */}
      {loading && <Spinner />}

      {/* Display Error Message */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Orders Display */}
      {!loading && orders.length === 0 && !error ? (
        <div className="text-gray-600 text-center">No orders found.</div>
      ) : (
        <div className="flex-col flex ">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                Order #{order._id}
              </h3>
              <div className="mb-4">
                <ul>
                  {order.orderItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center mb-2"
                    >
                      <div className="flex items-center">
                        <img
                          src={`${serverUrl}/${item.img}`}
                          alt={item.product.title}
                          className="w-12 h-12 object-contain rounded mr-4"
                        />
                        <span className="font-medium text-gray-600">
                          {item.product.title} x {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-gray-800">
                        ${item.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-gray-700">
                  Total: ${order.totalPrice.toFixed(2)}
                </span>
                <span
                  className={`flex items-center font-bold ${
                    order.isDelivered ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {order.isDelivered ? (
                    <>
                      <FaCheckCircle className="mr-2" /> Delivered
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="mr-2" /> Not Delivered
                    </>
                  )}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <p>
                  Payment Method:{" "}
                  {order.paymentMethod === "online"
                    ? "Online"
                    : "Cash on Delivery"}
                </p>
                <p>
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
