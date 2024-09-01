// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = ({ slides, spaceBetween, SlidesPerView ,...props}) => {
  return (
      <Swiper
          
     
      spaceBetween={spaceBetween}
      slidesPerView={SlidesPerView}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination, Autoplay]}
      className=" text-red-400"
      {...props}
    >
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index}>
            <img src={slide.src} alt={slide.label} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
