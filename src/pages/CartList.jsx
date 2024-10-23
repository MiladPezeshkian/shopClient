import NavLink from "../components/NavLink/NavLink";
import Footer from "../components/Footer/Footer";
import ProductTable from "../components/ProductTable";
import { useContext } from "react";
import { CartWishlistContext } from "../context/CartWishlistContext";
import CartTotal from "../components/CartTotal";

function CartList() {
  const { cartList } = useContext(CartWishlistContext); // فقط cartList رو از context استفاده می‌کنیم

  return (
    <>
      <NavLink />
      <div className="min-h-screen flex flex-col justify-evenly items-stretch gpa-[5rem] w-full">
        <div className="py-8 px-4 md:px-8 lg:px-16 w-full">
          <h1 className="text-center text-[5rem] font-semibold mb-8">
            CartList <span className="text-[3rem]">({cartList.length})</span>
          </h1>
          <ProductTable />
          <CartTotal />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartList;
