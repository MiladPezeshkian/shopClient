import PropTypes from "prop-types";

function Catagory({ name, logo, isActive, onClick }) {
  return (
    <div
      className={`w-full max-w-[17rem] h-auto aspect-[4/3] border rounded-md flex justify-center items-center flex-col p-4 cursor-pointer transition-all duration-300 ease-in-out ${
        isActive
          ? "bg-[#DB4444] text-white"
          : "hover:bg-[#DB4444] hover:text-white text-black"
      }`}
      onClick={onClick}
    >
      <img src={logo} alt={name} className="h-[5rem] mb-4 object-contain" />
      <p className="text-lg text-center">{name}</p>
    </div>
  );
}

Catagory.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Catagory;
