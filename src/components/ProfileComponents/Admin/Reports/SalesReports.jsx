import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Spinner from "../../../spinnerOnlyComponents/Spinner";

// Helper function to format data by month
const formatOrdersByMonth = (orders) => {
  const monthlySales = {};

  orders.forEach((order) => {
    const orderMonth = new Date(order.createdAt).toLocaleString("default", {
      month: "long",
    });

    if (monthlySales[orderMonth]) {
      monthlySales[orderMonth].totalSales += order.totalPrice;
      monthlySales[orderMonth].orderCount += 1;
    } else {
      monthlySales[orderMonth] = {
        totalSales: order.totalPrice,
        orderCount: 1,
      };
    }
  });

  return Object.keys(monthlySales).map((month) => ({
    month,
    totalSales: monthlySales[month].totalSales,
    orderCount: monthlySales[month].orderCount,
  }));
};

// Component for sales reports with charts
function SalesReports() {
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [deliveredData, setDeliveredData] = useState([]);
  const [productSalesData, setProductSalesData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://server-shop-p7jv.onrender.com/api/v1/orders",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          // Format monthly sales data for the line chart
          const formattedMonthlySales = formatOrdersByMonth(data.data.orders);
          setMonthlySalesData(formattedMonthlySales);

          // Format product sales data for the bar chart
          const productSales = {};
          data.data.orders.forEach((order) => {
            order.orderItems.forEach((item) => {
              if (productSales[item.product]) {
                productSales[item.product].quantity += item.quantity;
              } else {
                productSales[item.product] = {
                  product: item.product,
                  quantity: item.quantity,
                  price: item.price,
                };
              }
            });
          });
          const formattedProductSales = Object.keys(productSales).map(
            (product) => ({
              product,
              quantity: productSales[product].quantity,
              price: productSales[product].price,
            })
          );
          setProductSalesData(formattedProductSales);

          // Calculate delivered and undelivered orders for pie chart
          const deliveredOrders = data.data.orders.filter(
            (order) => order.isDelivered
          ).length;
          const undeliveredOrders = data.data.orders.length - deliveredOrders;

          setDeliveredData([
            { name: "Delivered", value: deliveredOrders },
            { name: "Undelivered", value: undeliveredOrders },
          ]);

          // Payment methods data for pie chart
          const onlinePayments = data.data.orders.filter(
            (order) => order.paymentMethod === "online"
          ).length;
          const cashPayments = data.data.orders.length - onlinePayments;

          setPaymentData([
            { name: "Online", value: onlinePayments },
            { name: "Cash", value: cashPayments },
          ]);
        } else {
          setError("Failed to load orders.");
        }
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Colors for pie chart
  const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6"> Sales Reports</h2>

      {/* Monthly Sales Line Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Monthly Sales Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthlySalesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
            <Line type="monotone" dataKey="orderCount" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Product Sales Bar Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Product Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productSalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Delivered vs Undelivered Pie Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Order Delivery Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={deliveredData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {deliveredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Methods Pie Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={paymentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#00C49F"
              label
            >
              {paymentData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesReports;
