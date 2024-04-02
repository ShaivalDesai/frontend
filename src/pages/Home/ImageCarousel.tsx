// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface ImageCarouselProps {
//   images: string[];
// }

// // const ImageCarousel1: React.FC<ImageCarouselProps> = ({ images }) => {
// //   const settings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 1,
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 2000,
// //     arrows: true,
    
// //   };
// const ImageCarousel1: React.FC<ImageCarouselProps> = ({ images }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     arrows: true,
//     centerMode: true,
//     centerPadding: "20%", // Adjust padding as needed
//   };
//   return (
//     <div style={{ maxHeight: "100vh", width: "100vw" }}>
//       <Slider {...settings}>
//         {images.map((image, index) => (
//           <div key={index}>
//             <img
//               src={image}
//               alt={`Image ${index}`}
//               style={{ height: "70vh", width: "100vw" }}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default ImageCarousel1;


import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel1: React.FC<ImageCarouselProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    centerMode: true,
    centerPadding: "20%", // Adjust padding as needed
  };

  return (
    <div style={{ maxHeight: "100vh", width: "100vw", backgroundColor:"#d4d4d4" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={image}
              alt={`Image ${index}`}
              style={{ height: "35vh", width: "57vw", margin: "20px" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel1;