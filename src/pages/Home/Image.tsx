import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardContent, Typography } from "@mui/material";
import { Card } from "react-bootstrap";

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

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontFamily: "'Protest Riot', sans-serif",
          fontWeight: "bold",
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
          height: "480px", // Adjusted height
        }}
      >
        {products.recommendations.map((product) => (
          <Card
            key={product.id}
            style={{
              width: "250px",
              height: "100%", // Adjusted height
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
          fontFamily: "'Protest Riot', sans-serif",
          fontWeight: "bold",
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
          fontFamily: "'Protest Riot', sans-serif",
          fontWeight: "bold",
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { CardContent, Typography } from "@mui/material";
// import { Card } from "react-bootstrap";

// interface Product {
//   id: number;
//   brand: string;
//   p_type: string;
//   price: number;
//   image_data: string;
// }

// interface ProductState {
//   recommendations: Product[];
//   trending: Product[];
// }

// const ImageCarousel: React.FC = () => {
//   const [rproducts, setrProducts] = useState<Product[]>([]);
//   const [tproducts, settproducts] = useState<Product[]>([]);

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
//         console.log(response.data.recommendation.recommendations_and_images)

//         if (response.data.recommendation.recommendations_and_images === "404 not found") {
//           console.log('Recomand NOt found');
//         }
//         else {
//           const recommendations: Product[] = Object.values(
//             response.data.recommendation.recommendations_and_images
//               .recommendations
//           )
//             .slice(0, 5) // Limit to maximum of 5 products
//             .map((productData: any, index: number) => {
//               return {
//                 id: productData.product_id,
//                 brand: productData.brand,
//                 p_type: productData.p_type,
//                 price: productData.price,
//                 image_data: `data:image/jpeg;base64,${productData.image}`,
//               };
//             });
//           setrProducts(recommendations);
//         }

//         console.log(response.data.trending.trending_products)
//         const trending: Product[] = Object.values(
//           response.data.trending.trending_products
//         )
//           .slice(0, 5) // Limit to maximum of 5 products
//           .map((productData: any, index: number) => {
//             return {
//               id: productData.top_product.product_id,
//               brand: productData.top_product.brand,
//               p_type: productData.top_product.p_type,
//               price: productData.top_product.price,
//               image_data: `data:image/jpeg;base64,${productData.top_product.image}`,
//             };
//           });
//         settproducts(trending);
//         console.log("Trending:", trending);
//         console.log(rproducts);

//       } catch (error) {
//         console.error("Failed to fetch images", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   return (
//     <>
//       {rproducts.length > 0 && (
//         <>
//           <Typography
//             variant="h4"
//             sx={{
//               textAlign: "center",
//               fontFamily: "'Protest Riot', sans-serif",
//               fontWeight: "bold",
//               fontSize: "50px",
//               color: "red",
//               background:
//                 "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Recommended Products
//           </Typography>
//           <div
//             style={{
//               display: "flex",
//               overflowX: "auto",
//               gap: "20px",
//               padding: "20px",
//               height: "480px", // Adjusted height
//             }}
//           >
//             {rproducts.map((product) => (
//               <Card
//                 key={product.id}
//                 style={{
//                   width: "250px",
//                   height: "100%", // Adjusted height
//                   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <img
//                   src={product.image_data}
//                   alt={product.brand}
//                   style={{ height: "320px", width: "100%", objectFit: "cover" }}
//                 />
//                 <CardContent style={{ textAlign: "left", height: "120px" }}>
//                   <Typography
//                     variant="h6"
//                     component="h3"
//                     style={{
//                       marginBottom: "5px",
//                       fontWeight: "bold",
//                       height: "30px",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {product.brand}
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     component="h6"
//                     style={{
//                       marginBottom: "5px",
//                       fontWeight: "",
//                       height: "",
//                       fontSize: "15px",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {product.p_type}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     style={{ height: "40px", overflow: "hidden" }}
//                   >
//                     Price: ₹{product.price}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </>
//       )}

//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: "center",
//           fontFamily: "'Protest Riot', sans-serif",
//           fontWeight: "bold",
//           fontSize: "50px",
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
//         {tproducts.map((product) => (
//           <Card
//             key={product.id}
//             style={{
//               width: "250px",
//               height: "100%", // Adjusted height
//               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <img
//               src={product.image_data}
//               alt={product.brand}
//               style={{ height: "320px", width: "100%", objectFit: "cover" }}
//             />
//             <CardContent style={{ textAlign: "left", height: "120px" }}>
//               <Typography
//                 variant="h6"
//                 component="h3"
//                 style={{
//                   marginBottom: "5px",
//                   fontWeight: "bold",
//                   height: "30px",
//                   overflow: "hidden",
//                 }}
//               >
//                 {product.brand}
//               </Typography>

//               <Typography
//                 variant="h6"
//                 component="h6"
//                 style={{
//                   marginBottom: "5px",
//                   fontWeight: "",
//                   height: "",
//                   fontSize: "15px",
//                   overflow: "hidden",
//                 }}
//               >
//                 {product.p_type}
//               </Typography>

//               <Typography
//                 variant="body1"
//                 style={{ height: "30px", overflow: "hidden" }}
//               >
//                 Price: ₹{product.price}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Typography
//         variant="h4"
//         sx={{
//           textAlign: "center",
//           fontFamily: "'Protest Riot', sans-serif",
//           fontWeight: "bold",
//           fontSize: "50px",
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
