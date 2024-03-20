// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { CardContent, Typography } from "@mui/material";
// import { Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   image_data: string;
// }

// interface ProductState {
//   recommendations: Product[];
//   trending: Product[];
// }

// const ImageCarousel: React.FC = () => {
//   const [products, setProducts] = useState<ProductState>({
//     recommendations: [],
//     trending: [],
//   });

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/combined_data/1",
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log("API Response:", response.data);

//         const recommendations: Product[] = Object.values(
//           response.data.recommendation.recommendations_and_images
//             .recommendations
//         )
//           .slice(0, 5) // Limit to maximum of 5 products
//           .map((productData: any, index: number) => {
//             return {
//               id: productData.product_id,
//               title: productData.title,
//               price: productData.price,
//               image_data: `data:image/jpeg;base64,${productData.image}`,
//             };
//           });

//         const trending: Product[] = Object.values(
//           response.data.trending.trending_products
//         )
//           .slice(0, 5) // Limit to maximum of 5 products
//           .map((productData: any, index: number) => {
//             return {
//               id: productData.top_product.product_id,
//               title: productData.top_product.title,
//               price: productData.top_product.price,
//               image_data: `data:image/jpeg;base64,${productData.top_product.image}`,
//             };
//           });

//         console.log("Recommendations:", recommendations);
//         console.log("Trending:", trending);

//         setrw     s({ recommendations, trending });
//       } catch (error) {
//         console.error("Failed to fetch images", error);
//       }
//     };

//     fetchImages();
//   }, []);
//   const navigate = useNavigate();
//   return (
//     <>
//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: "center",
//           fontFamily: "'Protest Riot', sans-serif",
//           fontWeight: "bold",
//           fontSize: "60px",
//           color: "red",
//           background:
//             "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         Recommended Products
//       </Typography>
//       <div
//         style={{
//           display: "flex",
//           overflowX: "auto",
//           gap: "20px",
//           padding: "20px",
//           height: "480px", // Adjusted height
//         }}
//       >
//         {products.recommendations.map((product) => (

//             <Card
//               key={product.id}
//               style={{
//                 width: "250px",
//                 height: "100%", // Adjusted height
//                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//               }}
//               onClick={() => navigate(`/single/${product.id}`)}
//             >
//               <img
//                 src={product.image_data}
//                 alt={product.title}
//                 style={{ height: "320px", width: "100%", objectFit: "cover" }}
//               />
//               <CardContent style={{ textAlign: "left", height: "120px" }}>
//                 <Typography
//                   variant="h6"
//                   component="h3"
//                   style={{
//                     marginBottom: "5px",
//                     fontWeight: "bold",
//                     height: "60px",
//                     overflow: "hidden",
//                   }}
//                 >
//                   {product.title}
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   style={{ height: "40px", overflow: "hidden" }}
//                 >
//                   Price: ₹{product.price}
//                 </Typography>
//               </CardContent>
//             </Card>

//         ))}
//       </div>

//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: "center",
//           fontFamily: "'Protest Riot', sans-serif",
//           fontWeight: "bold",
//           fontSize: "60px",
//           marginBottom: "1rem",
//           color: "red",
//           background:
//             "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         Trending Products
//       </Typography>
//       <div
//         style={{
//           display: "flex",
//           overflowX: "auto",
//           gap: "20px",
//           padding: "20px",
//           height: "480px", // Adjusted height
//         }}
//       >
//         {products.trending.map((product) => (
//           <Link to={`/single/${product.id}`} style={{ textDecoration: "none" }}>
//             <Card
//               key={product.id}
//               style={{
//                 width: "250px",
//                 height: "100%", // Adjusted height
//                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <img
//                 src={product.image_data}
//                 alt={product.title}
//                 style={{ height: "320px", width: "100%", objectFit: "cover" }}
//               />
//               <CardContent style={{ textAlign: "left", height: "120px" }}>
//                 <Typography
//                   variant="h6"
//                   component="h3"
//                   style={{
//                     marginBottom: "5px",
//                     fontWeight: "bold",
//                     height: "60px",
//                     overflow: "hidden",
//                   }}
//                 >
//                   {product.title}
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   style={{ height: "40px", overflow: "hidden" }}
//                 >
//                   Price: ₹{product.price}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Link>
//         ))}
//       </div>

//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: "center",
//           fontFamily: "'Protest Riot', sans-serif",
//           fontWeight: "bold",
//           fontSize: "60px",
//           marginBottom: "1rem",
//           color: "red",
//           background:
//             "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         Order By Brands
//       </Typography>
//     </>
//   );
// };

// export default ImageCarousel;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardContent, Typography } from "@mui/material";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image_data: string;
}

interface ProductState {
  recommendations: Product[];
  trending: Product[];
}

const ImageCarousel: React.FC = () => {
  const [products, setProducts] = useState<ProductState>({
    recommendations: [],
    trending: [],
  });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/combined_data/1",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response:", response.data);

        const recommendations: Product[] = Object.values(
          response.data.recommendation.recommendations_and_images
            .recommendations
        )
          .slice(0, 5) // Limit to maximum of 5 products
          .map((productData: any, index: number) => {
            return {
              id: productData.product_id,
              title: productData.title,
              price: productData.price,
              image_data: `data:image/jpeg;base64,${productData.image}`,
            };
          });

        const trending: Product[] = Object.values(
          response.data.trending.trending_products
        )
          .slice(0, 5) // Limit to maximum of 5 products
          .map((productData: any, index: number) => {
            return {
              id: productData.top_product.product_id,
              title: productData.top_product.title,
              price: productData.top_product.price,
              image_data: `data:image/jpeg;base64,${productData.top_product.image}`,
            };
          });

        console.log("Recommendations:", recommendations);
        console.log("Trending:", trending);

        setProducts({ recommendations, trending });
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    fetchImages();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (productId: number) => {
    navigate("/single", { state: { productId } });
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          marginTop:"10px",
          textAlign: "center",
          fontFamily: "'Roboto', sans-serif",
          // fontWeight: "bold",
          fontSize: "60px",
          color: "red",
          background:
            "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Recommended Products
      </Typography>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "20px",
          padding: "20px",
          height: "480px",
        }}
      >
        {products.recommendations.map((product) => (
          <Card
            key={product.id}
            style={{
              width: "250px",
              height: "100%", // Adjusted height
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer", // Add cursor pointer
              transition: "transform 0.2s ease", // Add transition for transform property
            }}
            onClick={() => handleCardClick(product.id)}
            onMouseDown={(e) => {
              // Scale down the card slightly when clicked
              e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseUp={(e) => {
              // Restore the original scale when mouse is released
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={product.image_data}
              alt={product.title}
              style={{ height: "320px", width: "100%", objectFit: "cover" }}
            />
            <CardContent style={{ textAlign: "left", height: "120px" }}>
              <Typography
                variant="h6"
                component="h3"
                style={{
                  marginBottom: "5px",
                  fontWeight: "bold",
                  height: "60px",
                  overflow: "hidden",
                }}
              >
                {product.title}
              </Typography>
              <Typography
                variant="body1"
                style={{ height: "40px", overflow: "hidden" }}
              >
                Price: ₹{product.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trending Products section */}

      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontFamily: "'Roboto', sans-serif",
          // fontWeight: "bold",
          fontSize: "60px",
          marginBottom: "1rem",
          color: "red",
          background:
            "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Trending Products
      </Typography>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "20px",
          padding: "20px",
          height: "480px", // Adjusted height
        }}
      >
        {products.trending.map((product) => (
          <Card
            key={product.id}
            style={{
              width: "250px",
              height: "100%", // Adjusted height
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer", // Add cursor pointer
              transition: "transform 0.2s ease", // Add transition for transform property
            }}
            onClick={() => handleCardClick(product.id)}
            onMouseDown={(e) => {
              // Scale down the card slightly when clicked
              e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseUp={(e) => {
              // Restore the original scale when mouse is released
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={product.image_data}
              alt={product.title}
              style={{ height: "320px", width: "100%", objectFit: "cover" }}
            />
            <CardContent style={{ textAlign: "left", height: "120px" }}>
              <Typography
                variant="h6"
                component="h3"
                style={{
                  marginBottom: "5px",
                  fontWeight: "bold",
                  height: "60px",
                  overflow: "hidden",
                }}
              >
                {product.title}
              </Typography>
              <Typography
                variant="body1"
                style={{ height: "40px", overflow: "hidden" }}
              >
                Price: ₹{product.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontFamily: "'Roboto', sans-serif",
          // fontWeight: "bold",
          fontSize: "60px",
          marginBottom: "1rem",
          color: "red",
          background:
            "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Order By Brands
      </Typography>
    </>
  );
};

export default ImageCarousel;
