function Services() {
  return (
    <div>
      <section className="my-8 grid grid-cols-2 md:grid-cols-3 gap-4 text-center w-full">
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <img
            src="../../imgs/service/service1.png"
            alt="services"
            className="md:w-[5rem] md:h-[5rem] "
          />
          <h3 className="text-lg font-bold mt-4">Free and Fast Delivery</h3>
          <p>Free delivery for all orders over $140</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <img
            src="../../imgs/service/service2.png"
            alt="services"
            className="md:w-[5rem] md:h-[5rem] "
          />
          <h3 className="text-lg font-bold mt-4">24/7 Customer Service</h3>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <img
            src="../../imgs/service/service3.png"
            alt="services"
            className="md:w-[5rem] md:h-[5rem] "
          />
          <h3 className="text-lg font-bold mt-4">Money Back Guarantee</h3>
          <p>We return money within 30 days</p>
        </div>
      </section>
    </div>
  );
}

export default Services;
