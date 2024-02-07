import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    marginTop: "0",
  };

  return (
    <>
      <Slider {...settings}>
        <div>
          <img
            src="m1.avif"
            alt="image1"
            style={{ height: "70vh", width: "100%" }}
          />
        </div>
        <div>
          <img
            src="bg3.jpg"
            alt="image2"
            style={{ height: "70vh", width: "100%" }}
          />
        </div>
        <div>
          <img
            src="bg4.jpg"
            alt="image3"
            style={{ height: "70vh", width: "100%" }}
          />
        </div>
      </Slider>

      {/* <img
        src="/sbc.jpg"
        alt="Another image"
        style={{ height: "70vh", width: "100%" }}
      /> */}
    </>
  );
};

export default ImageCarousel;
