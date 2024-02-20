// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ImageCarousel: React.FC = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     marginTop: "0",
//   };

//   return (
//     <>
//     <div style={{ maxHeight: "100vh", width: "100vw"}}>
//       <Slider {...settings}>
//         <div>
//           <img
//             src="h1.png"
//             alt="image1"
//             style={{ height: "60vh", width: "100vw" }}
//           />
//         </div>
//         <div>
//           <img
//             src="h2.jpg"
//             alt="image2"
//             style={{ height: "60vh", width: "100vw" }}
//           />
//         </div>
//         <div>
//           <img
//             src="h3.jpg"
//             alt="image3"
//             style={{ height: "60vh", width: "100vw" }}
//           />
//         </div>
//       </Slider>
//       {/* <h1 style={{
//   fontFamily: '"Rubik Doodle Shadow", sans-serif',
//   textAlign: 'center',
//   marginTop: '20px',
//   // border: '2px solid #000', 
//   padding: '10px', 
//   // boxShadow: '3px 3px 5px rgba(0,0,0,0.3)', 
//   textShadow: 'brown', 
//   // borderRadius: '10px', 
//   backgroundColor: 'rgba(255, 255, 255, 0.5)', 
//   color: '#724c31',
//   fontSize:"50px",
//   // marginBottom:"20px"

// }}>
//   SHOP BY CATEGORY
// </h1> */}


//       <img
//         src="/sbccc.png"
//         alt="Another image"
//         style={{ height: "19vh", width: "100%",borderRadius:"10px"}}
//       /> 
//       </div>
//     </>
//   );
// };

// export default ImageCarousel;


// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface Image {
//   url: string;
  
// }

// const ImageCarousel: React.FC = () => {
//   const [images, setImages] = useState<Image[]>([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/homeprofile');
//         const data = await response.json();
//         setImages(data.images); // Update the state with the fetched images
//       } catch (error) {
//         console.error("Failed to fetch images", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     marginTop: "0",
//   };

//   return (
//     <>
//       <div style={{ maxHeight: "100vh", width: "100vw" }}>
//         <Slider {...settings}>
//           {images.map((image, index) => (
//             <div key={index}>
//               <img
//                 src={image.url} // Use the URL from the image data
//                 alt={`image${index + 1}`}
//                 style={{ height: "60vh", width: "100vw" }}
//               />
//             </div>
//           ))}
//         </Slider>
//         <img
//           src="/sbccc.png"
//           alt="Another image"
//           style={{ height: "19vh", width: "100%", borderRadius: "10px" }}
//         />
//       </div>
//     </>
//   );
// };

// export default ImageCarousel;

// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";

// interface Image {
//   id: number;
//   image: string;
// }

// const ImageCarousel: React.FC = () => {
//   const [images, setImages] = useState<Image[]>([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/homeprofile");
//         setImages(response.data);
//       } catch (error) {
//         console.error("Failed to fetch images", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     marginTop: "0",
//   };

//   return (
//     <div style={{ maxHeight: "100vh", width: "100vw" }}>
//       <Slider {...settings}>
//         {images.map((image) => (
//           <div key={image.id}>
//             <img
//               src={image.image} // Use the image URL from the backend response
//               alt={`image${image.id}`}
//               style={{ height: "60vh", width: "100vw" }}
//             />
//           </div>
//         ))}
//       </Slider>
//       <img
//         src="/sbccc.png" // Use the image URL from the backend response
//         alt="Another image"
//         style={{ height: "19vh", width: "100%", borderRadius: "10px" }}
//       />
//     </div>
//   );
// };

// export default ImageCarousel;

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

interface Image {
  id: number;
  image: string; // This will hold the URL of the converted image
}

const ImageCarousel: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/homeprofile");
        const imageData = response.data;

        // Convert binary data to URLs for images
        const imageUrls: Image[] = imageData.map((item: any) => ({
          id: item.id,
          image: `data:image/jpeg;base64,${item.image}`, // Assuming the image format is JPEG
        }));

        setImages(imageUrls);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    fetchImages();
  }, []);

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
    <div style={{ maxHeight: "100vh", width: "100vw" }}>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.image} // Use the converted image URL
              alt={`image${image.id}`}
              style={{ height: "60vh", width: "100vw" }}
            />
          </div>
        ))}
      </Slider>
      <img
        src="/sbccc.png" // Use the image URL from the backend response
        alt="Another image"
        style={{ height: "19vh", width: "100%", borderRadius: "10px" }}
      />
    </div>
  );
};

export default ImageCarousel;





