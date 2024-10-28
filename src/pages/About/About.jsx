import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // تغییر مسیر برای نسخه جدید
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
      <div className="container mx-auto p-6 lg:p-12">
        {/* بخش داستان ما */}
        <section className="my-10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              className="mx-auto my-4 md:w-1/2 rounded-lg w-full md:order-2 shadow-lg"
              src="../../imgs/femaleshop.png"
              alt="Story Image"
            />
            <div className="md:w-1/2 md:order-1 text-gray-800">
              <h1 className="text-4xl font-extrabold mb-6 text-center md:text-left">
                Our Story
              </h1>
              <p className="text-lg mb-4">
                Launched in 2015, Exclusive is South Asia&apos;s premier online
                shopping marketplace with an active presence in Bangladesh.
                Supported by a wide range of tailored marketing, data, and
                service solutions, Exclusive has 10,500 sellers and 300 brands
                and serves 3 million customers across the region.
              </p>
              <p className="text-lg">
                Exclusive offers a diverse assortment in categories ranging from
                consumer goods to high-end fashion, with a growing catalog of
                over 1 million products.
              </p>
            </div>
          </div>
        </section>

        {/* بخش آمار */}
        <section className="my-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            {
              src: "abc.png",
              title: "10.5k",
              desc: "Sellers active on our site",
            },
            { src: "abc1.png", title: "33k", desc: "Monthly Product Sales" },
            { src: "abc2.png", title: "45.5k", desc: "Active Customers" },
            { src: "abc3.png", title: "25k", desc: "Annual Gross Sales" },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center bg-gray-100 hover:bg-red-500 hover:text-white cursor-pointer p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
            >
              <img
                src={`../../imgs/rate/${stat.src}`}
                alt={stat.desc}
                className="w-20 h-20 mb-4"
              />
              <h2 className="text-2xl font-bold">{stat.title}</h2>
              <p className="text-sm">{stat.desc}</p>
            </div>
          ))}
        </section>

        {/* بخش تیم ما */}
        <section className="my-12">
          <h2 className="text-3xl font-bold text-center mb-10">Our Team</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[
              {
                src: "tomCruise.png",
                name: "Tom Cruise",
                role: "Tea Maker & Chairman",
              },
              {
                src: "EmmaWatson.png",
                name: "Emma Watson",
                role: "Managing Director",
              },
              {
                src: "willSmith.png",
                name: "Will Smith",
                role: "Product Designer",
              },
            ].map((member, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center transition-all duration-300 transform hover:scale-105">
                  <img
                    src={`../../imgs/ourteam/${member.src}`}
                    alt={member.name}
                    className="mx-auto mb-6 w-72 h-72 object-cover rounded-full shadow-lg"
                  />
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-lg text-gray-500">{member.role}</p>
                </div>
              </SwiperSlide>
            ))}
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
