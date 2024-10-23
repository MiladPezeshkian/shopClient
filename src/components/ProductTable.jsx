import { useEffect } from "react";
import ProductRow from "./ProductRow";
import { useCartWishlist } from "../hook/useCartWishlist ";

const ProductTable = () => {
  const { totalPrice, setTotalPrice, cartList, setCartList } =
    useCartWishlist();
  // const { cartList: cartList } = useContext(CartWishlistContext);

  useEffect(() => {
    const storedCartList = JSON.parse(localStorage.getItem("cartList")) || [];
    setCartList(storedCartList);
  }, [setCartList]);

  useEffect(() => {
    // محاسبه total price بر اساس لیست محصولات

    setTotalPrice(
      cartList.reduce(
        (acc, product) =>
          acc + (Number(product.price) || 0) * (Number(product.quantity) || 1),
        0
      )
    ); // به‌روزرسانی total price
  }, [cartList, setTotalPrice]);
  // هر بار که cartList تغییر کرد، total price محاسبه می‌شود

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartList = cartList.map((product) =>
      product._id === productId
        ? { ...product, quantity: Math.max(1, Number(newQuantity)) }
        : product
    );
    setCartList(updatedCartList);
    localStorage.setItem("cartList", JSON.stringify(updatedCartList));
  };

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-3 px-4">Product</th>
            <th className="text-left py-3 px-4">Price</th>
            <th className="text-left py-3 px-4">Quantity</th>
            <th className="text-left py-3 px-4">Subtotal</th>
            <th className="text-left py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((product, key) => (
            <ProductRow
              key={key}
              product={product}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </tbody>
      </table>

      {cartList.length === 0 && (
        <div className="text-center py-10">
          <p className="text-red-500 text-[2rem]">Your cart is empty.</p>
        </div>
      )}

      <div className="text-right py-4 px-4">
        <span className="text-xl font-bold">
          Total Price: ${totalPrice !== undefined ? totalPrice.toFixed(2) : 0.0}
        </span>
      </div>
    </div>
  );
};

export default ProductTable;
