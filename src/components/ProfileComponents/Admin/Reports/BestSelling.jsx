import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

// Helper function to format and sort products by sales
const formatBestSellingProducts = (orders) => {
  const productSales = {};

  orders.forEach((order) => {
    order.orderItems.forEach((item) => {
      // Check if product exists
      if (item.product && item.product._id) {
        if (productSales[item.product._id]) {
          productSales[item.product._id].quantity += item.quantity;
        } else {
          productSales[item.product._id] = {
            productName: item.product.title || "Unknown Product", // Default value if title is missing
            quantity: item.quantity,
            price: item.price || 0,
          };
        }
      }
    });
  });

  const sortedProducts = Object.keys(productSales)
    .map((productId) => ({
      productName: productSales[productId].productName,
      quantity: productSales[productId].quantity,
      price: productSales[productId].price,
    }))
    .sort((a, b) => b.quantity - a.quantity);

  return sortedProducts.slice(0, 5); // Return top 5 products
};

// Component to display best-selling products
function BestSelling() {
  const [bestSellingData, setBestSellingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://server-shop-p7jv.onrender.com/api/v1/orders/reports",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        if (data.status === "success") {
          const formattedBestSelling = formatBestSellingProducts(
            data.data.orders
          );
          setBestSellingData(formattedBestSelling);
        } else {
          setError("Failed to load orders.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching orders.");
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of outcome
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Best-Selling Products
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={bestSellingData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BestSelling;
