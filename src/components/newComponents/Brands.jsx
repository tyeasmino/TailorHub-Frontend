import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import brand1 from "../../assets/brands/brand_01.png";
import brand2 from "../../assets/brands/brand_02.png";
import brand3 from "../../assets/brands/brand_03.png";
import brand4 from "../../assets/brands/brand_04.png";

const Brands = () => {
  const brands = [brand1, brand2, brand3, brand2, brand4];

  return (
    <section className="max-w-screen-xl py-20 mx-auto">
      <Swiper
        spaceBetween={20} // Space between slides
        slidesPerView={1} // Default for mobile (1 card)
        loop={true} // Infinite loop
        autoplay={{
          delay: 2000, // 2 seconds delay
          disableOnInteraction: false, // Keep autoplay working even after user interaction
        }}
        modules={[Autoplay]}
        breakpoints={{
          768: { slidesPerView: 5 }, // Show 5 cards on desktop
        }}
        className="flex items-center"
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="border border-dashed px-6 py-4 flex items-center justify-center mx-8 md:mx-0  h-20">
              <img src={brand} alt={`Brand ${index + 1}`} className="max-h-full max-w-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Brands;
