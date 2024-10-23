const ContactUs = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg md:text-2xl ">
      {/* Call to Us Section */}
      <div className="flex items-center mb-6">
        <div className="bg-red-500 text-white rounded-full p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89-2.44a2 2 0 012.22.58l3.9 3.9a2 2 0 01-.58 2.22L16 16m-4 4a12 12 0 0011.84-9.6A11.96 11.96 0 003 8m3 13h.01"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold">Call To Us</h3>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +8801611112222</p>
        </div>
      </div>

      <hr className="my-4" />

      {/* Write to Us Section */}
      <div className="flex items-center">
        <div className="bg-red-500 text-white rounded-full p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 2v8m-4-4h8M3 9v13a1 1 0 001 1h16a1 1 0 001-1V9m-7 7H9"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold">Write To Us</h3>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Emails: customer@exclusive.com</p>
          <p>Emails: support@exclusive.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
