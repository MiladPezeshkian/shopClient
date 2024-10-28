import PropTypes from "prop-types";

function Tittle({ name }) {
  return (
    <div className="flex justify-start items-center gap-8 w-full max-w-full ml-8 md:my-8 my-16 overflow-hidden">
      <div className="w-8 h-16 bg-[#DB4444]"></div>
      <p className="font-semibold text-[1.6rem] font-[poppins]">{name}</p>
    </div>
  );
}

// Prop validation
Tittle.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Tittle;
