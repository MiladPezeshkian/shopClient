import PropTypes from "prop-types";

function GetACoupon({ choseOneCoupon }) {
  if (!choseOneCoupon) return <div>Select a coupon to view its details.</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Coupon Details</h2>
      <p>
        <strong>Code:</strong> {choseOneCoupon.code}
      </p>
      <p>
        <strong>Discount:</strong> {choseOneCoupon.discount}%
      </p>
      <p>
        <strong>Expiration Date:</strong>{" "}
        {new Date(choseOneCoupon.expirationDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {choseOneCoupon.isActive ? "Active" : "Inactive"}
      </p>
    </div>
  );
}

GetACoupon.propTypes = {
  choseOneCoupon: PropTypes.shape({
    code: PropTypes.string,
    discount: PropTypes.number,
    expirationDate: PropTypes.string,
    isActive: PropTypes.bool,
  }),
};

export default GetACoupon;
