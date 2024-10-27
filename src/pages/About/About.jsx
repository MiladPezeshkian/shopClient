import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // این خط رو تغییر بده
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import NavLink from "../../components/NavLink/NavLink";
import Footer from "../../components/Footer/Footer";
import Services from "../../components/Services";
const About = () => {
  return (
    <>
      <NavLink />
      <div className="container mx-auto p-4 ">
        {/* بخش داستان ما */}
        <section className="my-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center my-8">
            <img
              className="mx-auto my-4 md:w-1/2 rounded-lg w-full md:order-2"
              src="../../imgs/femaleshop.png"
              alt="Story Image"
            />
            <div className="m-3 md:w-1/2 md:order-1">
              <h1 className="text-4xl font-bold mb-4 text-center">Our Story</h1>
              <p className="mb-6 text-2xl">
                Launched in 2015, Exclusive is South Asia s premier online
                shopping marketplace with an active presence in Bangladesh.
                Supported by a wide range of tailored marketing, data, and
                service solutions, Exclusive has 10,500 sellers and 300 brands
                and serves 3 million customers across the region.
              </p>
              <p className="text-2xl mb-4">
                Exclusive has more than 1 million products to offer, growing at
                a very fast pace. Exclusive offers a diverse assortment in
                categories ranging from consumer.
              </p>
            </div>
          </div>
        </section>

        {/* بخش آمار */}
        <section className="my-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col justify-center items-center hover:bg-red-500 hover:text-white cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              src="../../imgs/rate/abc.png"
              alt="somelogo"
              className="md:w-[5rem] md:h-[5rem] "
            />
            <h2 className="text-2xl font-bold">10.5k</h2>
            <p className="text-sm">Sellers active on our site</p>
          </div>
          <div className="flex flex-col justify-center items-center hover:bg-red-500 hover:text-white cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              src="../../imgs/rate/abc1.png"
              alt="somelogo"
              className="md:w-[5rem] md:h-[5rem] "
            />
            <h2 className="text-2xl font-bold">33k</h2>
            <p className="text-sm">Monthly Product Sales</p>
          </div>
          <div className="flex flex-col justify-center items-center hover:bg-red-500 hover:text-white cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              src="../../imgs/rate/abc2.png"
              alt="somelogo"
              className="md:w-[5rem] md:h-[5rem] "
            />
            <h2 className="text-2xl font-bold">45.5k</h2>
            <p className="text-sm">Customer active in our site</p>
          </div>
          <div className="flex flex-col justify-center items-center hover:bg-red-500 hover:text-white cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              src="../../imgs/rate/abc3.png"
              alt="somelogo"
              className="md:w-[5rem] md:h-[5rem] "
            />
            <h2 className="text-2xl font-bold">25k</h2>
            <p className="text-sm">Annual gross sales on our site</p>
          </div>
        </section>

        {/* بخش تیم ما */}
        <section className="my-8">
          <h2 className="text-3xl font-bold text-center mb-6">Our Team</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            <SwiperSlide>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="../../imgs/ourteam/tomCruise.png"
                  alt="Tom Cruise"
                  className="mx-auto mb-4  w-[37rem] h-[43rem] object-cover"
                />
                <h3 className="text-[2.5rem] font-bold">Tom Cruise</h3>
                <p className="text-[1.5rem]">Tea Maker &amp; Chairman</p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="../../imgs/ourteam/EmmaWatson.png"
                  alt="Emma Watson"
                  className="mx-auto mb-4  w-[37rem] h-[43rem] h-24 object-cover"
                />
                <h3 className="text-[2.5rem]  font-bold">Emma Watson</h3>
                <p className="text-[1.5rem]">Managing Director</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="../../imgs/ourteam/willSmith.png"
                  alt="Will Smith"
                  className="mx-auto mb-4  w-[37rem] h-[43rem] object-cover"
                />
                <h3 className="text-[2.5rem]  font-bold">Will Smith</h3>
                <p className="text-[1.5rem]">Product Designer</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>

        {/* بخش خدمات */}
        <Services />
      </div>
      <Footer />
    </>
  );
};

export default About;
