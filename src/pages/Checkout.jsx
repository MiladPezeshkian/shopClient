import FormComponent from "../components/FormComponent";
import NavLink from "../components/NavLink/NavLink";
import Footer from "../components/Footer/Footer";
import OrderSummary from "../components/OrderSummary ";

const Checkout = () => {
  return (
    <>
      <NavLink />
      <div className=" md:h-[100vh] flex items-center justify-center flex-col">
        <h1 className=" text-[3rem] font-bold text-center">Billing Details</h1>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center items-stretch justify-evenly w-full gap-[5rem]">
          <FormComponent />
          <OrderSummary />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
