import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

function GetAllOrders({ setChoseOneOrder }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // اضافه کردن state برای پیگیری سطر انتخاب شده

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://server-shop-p7jv.onrender.com/api/v1/orders",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }
        const data = await response.json();
        setOrders(data.data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleRowClick = (order) => {
    setChoseOneOrder(order); // تنظیم سفارش انتخاب شده
    setSelectedOrderId(order._id); // ثبت ID سطر انتخاب شده
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 bg-red-100 text-red-700 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Orders</h2>

      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-600">
                Order ID
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                User
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                Total Price
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                Payment Method
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                Delivered
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, key) => (
              <tr
                key={key}
                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 cursor-pointer ${
                  selectedOrderId === order._id ? "bg-blue-100" : ""
                }`} // اضافه کردن کلاس CSS برای تغییر رنگ سطر انتخاب شده
                onClick={() => handleRowClick(order)} // اضافه کردن onClick به سطر
              >
                <td className="p-4 text-gray-700">{order._id}</td>
                <td className="p-4 text-gray-700">{order.user.name}</td>
                <td className="p-4 text-gray-700">${order.totalPrice}</td>
                <td className="p-4 text-gray-700">{order.paymentMethod}</td>
                <td className="p-4 text-gray-700">
                  {order.isDelivered ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive view for smaller screens */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {orders.map((order, key) => (
          <div
            key={key}
            className={`flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 cursor-pointer ${
              selectedOrderId === order._id ? "bg-blue-100" : ""
            }`} // اضافه کردن کلاس CSS برای تغییر رنگ سفارش انتخاب شده در حالت موبایل
            onClick={() => handleRowClick(order)} // اضافه کردن onClick به div
          >
            <div className="flex flex-row justify-between mb-2">
              <strong className="text-gray-700">Order ID:</strong>
              <span className="text-gray-700">{order._id}</span>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <strong className="text-gray-700">User:</strong>
              <span className="text-gray-700">{order.user.name}</span>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <strong className="text-gray-700">Total Price:</strong>
              <span className="text-gray-700">${order.totalPrice}</span>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <strong className="text-gray-700">Payment Method:</strong>
              <span className="text-gray-700">{order.paymentMethod}</span>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <strong className="text-gray-700">Delivered:</strong>
              <span className="text-gray-700">
                {order.isDelivered ? "Yes" : "No"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Define PropTypes for the component
GetAllOrders.propTypes = {
  setChoseOneOrder: PropTypes.func.isRequired, // Ensure setChoseOneOrder is a function
};

export default GetAllOrders;
