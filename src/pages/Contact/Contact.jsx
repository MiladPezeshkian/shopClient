import NavLink from "../../components/NavLink/NavLink";
import Footer from "../../components/Footer/Footer";
import AskQandA from "../../components/AskQandA";
import ContactUs from "../../components/ContactUs";

function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavLink />

      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start flex-grow px-4 py-8 md:py-12">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <ContactUs />
        </div>

        <div className="w-full md:w-1/2">
          <AskQandA />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
