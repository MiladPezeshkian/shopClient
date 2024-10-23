import PropTypes from "prop-types";

function GetAOrder({ choseOneOrder }) {
  if (!choseOneOrder) {
    return <div className="text-center text-gray-500">No order selected</div>;
  }

  const {
    user,
    orderItems,
    totalPrice,
    discount,
    paymentMethod,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
    shippingAddress,
  } = choseOneOrder;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h2>

      {/* User Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">
          User Information
        </h3>
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-gray-600">User ID:</span>
          <span>{user._id}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-gray-600">Email:</span>
          <span>{user.email}</span>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Order Items</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-600">
                Product
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                Quantity
              </th>
              <th className="text-left p-4 font-semibold text-gray-600">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, key) => (
              <tr key={key} className="border-b border-gray-200">
                {/* <td className="p-4 text-gray-700">{item.product._id}</td> */}
                <td className="p-4 text-gray-700">{item.quantity}</td>
                <td className="p-4 text-gray-700">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-gray-600">Total Price:</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-gray-600">Discount:</span>
          <span>{discount}%</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-gray-600">Payment Method:</span>
          <span>{paymentMethod}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-gray-600">Paid:</span>
          <span>{isPaid ? `Yes, on ${paidAt}` : "No"}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-gray-600">Delivered:</span>
          <span>{isDelivered ? `Yes, on ${deliveredAt}` : "No"}</span>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">
          Shipping Address
        </h3>
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-gray-600">Address:</span>
          <span>{shippingAddress.address}</span>
        </div>
      </div>
    </div>
  );
}

// Prop validation
GetAOrder.propTypes = {
  choseOneOrder: PropTypes.shape({
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        product: PropTypes.shape({
          _id: PropTypes.string.isRequired,
        }),
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    totalPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
    paymentMethod: PropTypes.string.isRequired,
    isPaid: PropTypes.bool.isRequired,
    paidAt: PropTypes.string,
    isDelivered: PropTypes.bool.isRequired,
    deliveredAt: PropTypes.string,
    shippingAddress: PropTypes.shape({
      address: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default GetAOrder;
