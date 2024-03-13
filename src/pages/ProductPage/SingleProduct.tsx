// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import "./SingleProduct.scss";
// import Navbar from "../Home/Navbar";

// interface Main {
//   product_id: number;
//   title: string;
//   price: number;
//   brand: string;
//   material: string;
//   size: string;
//   color: string;
//   description: string;
//   product_type: string;
//   image_base64: string;
// }

// const SingleProduct: React.FC = () => {
//   const location = useLocation();
//   const productId = location.state.productId;
//   const [product, setProduct] = useState<Main | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/product/${productId}`
//         );
//         setProduct(response.data); // Assuming your API returns the product data
//       } catch (error) {
//         console.error("Failed to fetch product data:", error);
//       }
//     };

//     fetchProductData();
//   }, [productId]);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   // Placeholder addToCart function - implement based on your state management
// const addToCart = (product: Main) => {
//   console.log("Adding to cart:", product);
//   // Here you would add the product to your cart state, either via Context, Redux, or another state management solution.
// };

//   useEffect(() => {
//     function handleKeyDown(event: KeyboardEvent) {
//       if (event.key === "Escape" && isModalOpen) {
//         closeModal();
//       }
//     }

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isModalOpen]);

//   return (
//     <>
//       <Navbar />
//       <div className="single-product-container">
//         {product ? (
//           <div className="product-details">
//             <div
//               className="product-image"
//               onClick={openModal}
//               style={{ cursor: "pointer" }}
//             >
//               <img
//                 src={`data:image/jpeg;base64,${product.image_base64}`}
//                 alt={product.title}
//               />
//             </div>
//             <div className="product-info">
//               <h2 className="product-title">{product.title}</h2>
//               <p className="product-brand">Brand: {product.brand}</p>
//               <p className="product-price">Price: ₹{product.price}</p>
//               <p className="product-material">Material: {product.material}</p>
//               <p className="product-size">Size: {product.size}</p>
//               <p className="product-color">Color: {product.color}</p>
//               <p className="product-description">
//                 Description: {product.description}
//               </p>
//               <p className="product-type">
//                 Product Type: {product.product_type}
//               </p>
//               <button
//                 className="add-to-cart-button"
//                 onClick={() => addToCart(product)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//       {isModalOpen && (
//         <div className="overlay" onClick={closeModal}>
//           <div className="modal-content">
//             <button className="close-modal-button" onClick={closeModal}>
//               &times;
//             </button>
//             <img
//               src={`data:image/jpeg;base64,${product?.image_base64}`}
//               alt={product?.title}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SingleProduct;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./SingleProduct.scss";
import Navbar from "../Home/Navbar";
import { Button } from "@mui/material";

interface Main {
  product_id: number;
  title: string;
  price: number;
  brand: string;
  material: string;
  size: string;
  color: string;
  description: string;
  product_type: string;
  image_base64: string;
}

const SingleProduct: React.FC = () => {
  const location = useLocation();
  const productId = location.state.productId;
  const [product, setProduct] = useState<Main | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/product/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  // const addToCart = (product: Main) => {
  //   const cartProduct = {
  //     id: product.product_id,
  //     title: product.title,
  //     price: product.price,
  //     brand: product.brand,
  //     image_base64: product.image_base64,
  //   };

  //   // Retrieve the cart from local storage
  //   let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  //   // Add the new product to the cart array
  //   cart.push(cartProduct);

  //   // Save the updated cart back to local storage
  //   localStorage.setItem("cart", JSON.stringify(cart));

  //   // Optionally, notify the user
  //   alert("Product added to cart!");
  // };

  const addToCart = (product: Main) => {
    // Retrieve the cart from local storage
    let cart: Main[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product is already in the cart
    const isProductInCart = cart.some(
      (item: Main) => item.product_id === product.product_id
    );

    // If the product is not in the cart, add it
    if (!isProductInCart) {
      // Add the new product to the cart array
      cart.push(product);

      // Save the updated cart back to local storage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Optionally, notify the user
      alert("Product added to cart!");
    } else {
      // Optionally, notify the user that the product is already in the cart
      alert("This product is already in the cart.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="single-product-container">
        {product ? (
          <div className="product-details">
             <div
              className="product-image"
              onClick={openModal}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`data:image/jpeg;base64,${product.image_base64}`}
                alt={product.title}
              />
            </div>
            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-brand">Brand: {product.brand}</p>
              <p className="product-price">Price: ₹{product.price}</p>
              <p className="product-material">Material: {product.material}</p>
              <p className="product-size">Size: {product.size}</p>
              <p className="product-color">Color: {product.color}</p>
              <p className="product-description">
                Description: {product.description}
              </p>
              <p className="product-type">
                Product Type: {product.product_type}
              </p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {isModalOpen && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal-content">
            <button className="close-modal-button" onClick={closeModal}>
              &times;
            </button>
            <img
              src={`data:image/jpeg;base64,${product?.image_base64}`}
              alt={product?.title}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
