import PropTypes from "prop-types";
import MangeMyAccount from "../MangeMyAccount";
import MangeProducts from "./MangeProducts/MangeProducts";
import MangeUser from "./MangeUser/MangeUser";
import MangeOrders from "./ManageOrders/MangeOrders";
import MangeCoupon from "./MangeCoupon/MangeCoupon";
import Reports from "./Reports/Reports";
import MangeComments from "./MangeComments/MangeComments";
import MangeContact from "./MangeUsersEmail/MangeContact";

const AdminOptions = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-full  bg-white rounded-lg  p-6 h-[100%]">
      {/* Account Management Section */}
      <MangeMyAccount
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <MangeProducts
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <MangeUser
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <MangeOrders
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <MangeCoupon
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <MangeComments
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <MangeContact
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Reports
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
};

AdminOptions.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
};

export default AdminOptions;
