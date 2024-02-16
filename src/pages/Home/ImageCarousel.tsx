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
    <div style={{ maxHeight: "100vh", width: "100vw"}}>
      <Slider {...settings}>
        <div>
          <img
            src="p1.jpeg"
            alt="image1"
            style={{ height: "60vh", width: "100vw" }}
          />
        </div>
        <div>
          <img
            src="p2.jpg"
            alt="image2"
            style={{ height: "60vh", width: "100vw" }}
          />
        </div>
        <div>
          <img
            src="p3.jpg"
            alt="image3"
            style={{ height: "60vh", width: "100vw" }}
          />
        </div>
      </Slider>
      {/* <h1 style={{
  fontFamily: '"Rubik Doodle Shadow", sans-serif',
  textAlign: 'center',
  marginTop: '20px',
  // border: '2px solid #000', 
  padding: '10px', 
  // boxShadow: '3px 3px 5px rgba(0,0,0,0.3)', 
  textShadow: 'brown', 
  // borderRadius: '10px', 
  backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  color: '#724c31',
  fontSize:"50px",
  // marginBottom:"20px"

}}>
  SHOP BY CATEGORY
</h1> */}





      <img
        src="/sbccc.png"
        alt="Another image"
        style={{ height: "19vh", width: "100%",borderRadius:"10px"}}
      /> 
      </div>
    </>
  );
};

export default ImageCarousel;


