import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

interface Image {
  id: number;
  image: string;
}

const ImageCarousel: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]); // Updated to expect an array

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/images?product_ids=1&product_ids=2",
          {
            responseType: "arraybuffer",
          }
        );
        const imageData: ArrayBuffer = response.data;

        // Convert the arraybuffer to a base64 string
        const base64String = btoa(
          new Uint8Array(imageData).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        // Assuming you want to handle multiple images, adjust this logic accordingly
        const imageUrls: Image[] = [
          { id: 1, image: `data:image/jpeg;base64,${base64String}` },
        ];

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
      {images.length > 0 && (
        <Slider {...settings}>
          {images.map((image) => (
            <div key={image.id}>
              <img
                src={image.image}
                alt={`image${image.id}`}
                style={{ height: "60vh", width: "100vw" }}
              />
            </div>
          ))}
        </Slider>
      )}
      {images.length === 0 && (
        <div>
          <img
            src="/sbccc.png"
            alt="Placeholder"
            style={{ height: "19vh", width: "100%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
