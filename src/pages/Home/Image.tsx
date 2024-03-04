import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { log } from "console";
import { Container, Typography } from "@mui/material";

interface Image {
  id: number;
  image: string;
}

const ImageCarousel: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]); 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const id = 1;

        const response = await axios.get(
          `http://127.0.0.1:8000/products/images/?product_ids=1%2C2%2C3`,
          {
            headers: {
              "Content-Type": "application/json",
            },
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

        const imageUrls: Image[] = [
          { id: 1, image: `data:image/jpeg;base64,${response.data[1]}` },
          { id: 2, image: `data:image/jpeg;base64,${response.data[2]}` },
          { id: 3, image: `data:image/jpeg;base64,${response.data[3]}` },
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
        <>
          {images.map((image) => (
            <div key={image.id}>
              <img
                src={image.image}
                alt={`image${image.id}`}
                style={{ height: "60vh", width: "100vw" }}
              />
            </div>
          ))}
        </>
      )}

      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap"
          rel="stylesheet"
        />
      </head>

      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
          // minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Protest Riot', sans-serif",
            fontWeight: "bold",
            fontSize: "60px",
            marginBottom: "2rem",
            color: "red",
            background:
              "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Shop by Brand
        </Typography>
      </Container>

      {/* {images.length === 0 && (
        <div>
          <img
            src="/sbccc.png"
            alt="Placeholder"
            style={{ height: "19vh", width: "100%", borderRadius: "10px" }}
          />
        </div>
      )} */}
    </div>
  );
};

export default ImageCarousel;
