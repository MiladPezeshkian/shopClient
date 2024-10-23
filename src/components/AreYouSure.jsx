import PropTypes from "prop-types";

function AreYouSure({ setAnswer, text }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center bg-white p-6 md:p-10 border-[2px] border-gray-300 rounded-[10px] shadow-lg w-full max-w-[90%] md:max-w-[40rem]">
        <h1 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
          {text}
        </h1>
        <div className="flex flex-row justify-between items-center w-full gap-4">
          <button
            onClick={() => setAnswer(true)}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all duration-200 font-bold"
          >
            Yes
          </button>
          <button
            onClick={() => setAnswer(false)}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all duration-200 font-bold"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

AreYouSure.propTypes = {
  setAnswer: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AreYouSure;
