import PropTypes from "prop-types";

function Tittle({ name }) {
  // Destructure props
  return (
    <div className="flex justify-start items-center gap-[2rem] w-[90%] ml-[2rem] md:my-[2rem] my-[4rem]">
      <div className="w-[2rem] h-[4rem] bg-[#DB4444]"></div>
      <p className="font-semibold text-[1.6rem] font-[poppins]">{name}</p>
    </div>
  );
}

// Prop validation
Tittle.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Tittle;
