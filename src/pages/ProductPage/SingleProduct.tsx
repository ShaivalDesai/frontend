import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./SingleProduct.scss";
import Navbar from "../Home/Navbar";
import { Button, Typography } from "@mui/material";
import { Modal } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

interface Market {
  brand: string;
  product_type: string;
  price: number;
  image: string; // Assuming this is also base64 encoded image
}

interface RatingDistributionProps {
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
}

interface CustomerOpinionProps {
  perfect: number;
  loose: number;
  tight: number;
  tooTight: number;
}

const RatingDistribution: React.FC<RatingDistributionProps> = ({
  fiveStar,
  fourStar,
  threeStar,
  twoStar,
  oneStar,
}) => (
  <div className="rating-distribution">
    <div className="rating-title">Rating Distribution</div>
    <div style={{ marginLeft: "210px" }}>
      <div className="rating-row">
        <span className="star">5 ★</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${fiveStar}%` }}></div>
        </div>
        <span className="percentage">{fiveStar}%</span>
      </div>
      <div className="rating-row">
        <span className="star">4 ★</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${fourStar}%` }}></div>
        </div>
        <span className="percentage">{fourStar}%</span>
      </div>
      <div className="rating-row">
        <span className="star">3 ★</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${threeStar}%` }}></div>
        </div>
        <span className="percentage">{threeStar}%</span>
      </div>
      <div className="rating-row">
        <span className="star">2 ★</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${twoStar}%` }}></div>
        </div>
        <span className="percentage">{twoStar}%</span>
      </div>
      <div className="rating-row">
        <span className="star">1 ★</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${oneStar}%` }}></div>
        </div>
        <span className="percentage">{oneStar}%</span>
      </div>
    </div>
  </div>
);

const CustomerOpinion: React.FC<CustomerOpinionProps> = ({
  perfect,
  loose,
  tight,
  tooTight,
}) => (
  <div className="customer-opinion">
    <div className="opinion-title" style={{ marginRight: "150px" }}>
      Customer Opinion
    </div>
    <div className="opinion-row">
      <div className="opinion-label">Perfect</div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${perfect}%` }}></div>
      </div>
      <div className="percentage">{perfect}%</div>
    </div>
    <div className="opinion-row">
      <div className="opinion-label">Too Loose</div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${loose}%` }}></div>
      </div>
      <div className="percentage">{loose}%</div>
    </div>
    <div className="opinion-row">
      <div className="opinion-label">Loose</div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${tight}%` }}></div>
      </div>
      <div className="percentage">{tight}%</div>
    </div>
    <div className="opinion-row">
      <div className="opinion-label">Tight</div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${tooTight}%` }}></div>
      </div>
      <div className="percentage">{tooTight}%</div>
    </div>
  </div>
);

const getRandomPercentage = () => Math.floor(Math.random() * 100) + 1;
const randomStarData = {
  fiveStar: getRandomPercentage(),
  fourStar: getRandomPercentage(),
  threeStar: getRandomPercentage(),
  twoStar: getRandomPercentage(),
  oneStar: getRandomPercentage(),
};

const randomOpinionData = {
  perfect: getRandomPercentage(),
  loose: getRandomPercentage(),
  tight: getRandomPercentage(),
  tooTight: getRandomPercentage(),
};

const SingleProduct: React.FC = () => {
  const location = useLocation();
  const productId = location.state.productId;
  const [product, setProduct] = useState<Main | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marketBasket, setMarketBasket] = useState<Market[] | null>(null);

  const [modalMessage, setModalMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Main | null>(null);

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

  useEffect(() => {
    const fetchMarketBasketData = async () => {
      try {
        const additionalResponse = await axios.get(
          `http://127.0.0.1:8000/bought_together/?product_id=${productId}`
        );
        setMarketBasket(additionalResponse.data);
      } catch (error) {
        console.error("Failed to fetch market basket data:", error);
      }
    };

    fetchMarketBasketData();
  }, [productId]);

  const handleAddToCart = async (selectedProduct: number) => {
    try {
      const c_id = 2;
      const response = await axios.post(
        `http://127.0.0.1:8000/cart_add/${c_id}/${selectedProduct}`
      );
      if (response.status === 200) {
        // setModalMessage("Product added to the cart");
        // setIsModalOpen(true);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddToWishlist = async (selectedProduct: number) => {
    try {
      const c_id = 2;
      const response = await axios.post(
        `http://127.0.0.1:8000/wishlist_add/${c_id}/${selectedProduct}`
      );
      if (response.status === 200) {
        // setModalMessage(response.data.message);
        // setIsModalOpen(true);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
      } else if (response.status === 400) {
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      // setModalMessage("Already in the wishlist");
      //   setIsModalOpen(true);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ background: "#d4d4d4" }}>
      <>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <Navbar />
        <div className="single-product-container">
          {product ? (
            <div
              className="product-details"
              style={{ background: "white", borderRadius: "15px" }}
            >
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
                  style={{ width: "70%", fontSize: "12px" }}
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleRoundedIcon />}
                  onClick={() => handleAddToWishlist(product.product_id)}
                >
                  Add to wishlist
                </Button>

                <Button
                  style={{ marginTop: "5px", width: "70%", fontSize: "12px" }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleAddToCart(product.product_id)}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "20px",
            lineHeight: "40px",
            backgroundColor: "lightgrey",
          }}
        >
          <hr
            style={{
              width: "100%",
              border: "none",
              height: "2px",
              backgroundColor: "black",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              // paddingTop: "80px",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "bold",
              fontSize: "30px",
              color: "#724c31",
              marginRight: "10px",
              textAlign: "center",
              marginLeft: "10px",
            }}
          >
            Ratings
          </Typography>

          <hr
            style={{
              width: "100%",
              border: "none",
              height: "2px",
              backgroundColor: "black",
            }}
          />
        </div>

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              textAlign: "center", // Center align the content
              marginLeft: "50px", // Add margin for spacing
              justifyContent: "center",
            }}
          >
            {/* <div
    style={{
      fontWeight: "bold",
      fontSize: "20px",
      marginBottom: "10px",
      textAlign: "center" // Center align the title
    }}
  > */}

            <RatingDistribution {...randomStarData} />
          </div>

          <div
            style={{
              height: "100%",
              borderLeft: "2px solid black",
              margin: "0 20px",
            }}
          ></div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "10px",
                marginTop: "-30px",
              }}
            ></div>
            <div style={{ flex: 1, textAlign: "center", marginLeft: "150px" }}>
              <CustomerOpinion {...randomOpinionData} />
            </div>
          </div>
        </div>

        <style>
          {`
    .additional-product-item:hover {
      transform: translateY(-5px); /* Move the item up slightly on hover */
    }

    .additional-product-item:hover .overlay {
      opacity: 1; /* Show overlay on hover */
    }
  `}
        </style>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "20px",
            lineHeight: "40px",
            backgroundColor: "lightgrey",
            marginTop: "35px",
          }}
        >
          <hr
            style={{
              flex: "1",
              border: "none",
              height: "2px",
              backgroundColor: "black",
            }}
          />
          <span
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "bold",
              fontSize: "30px",
              color: "#724c31",
              marginRight: "10px",
              textAlign: "center",
              marginLeft: "10px",
            }}
          >
            Shop
          </span>
          <span
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "bold",
              fontSize: "30px",
              color: "#724c31",
              marginRight: "10px",
              textAlign: "center",
            }}
          >
            More
          </span>
          <hr
            style={{
              flex: "1",
              border: "none",
              height: "2px",
              backgroundColor: "black",
            }}
          />
        </div>

        <div
          className="single-product-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {marketBasket ? (
            Object.entries(marketBasket).map(([key, value]) => (
              <div
                key={key}
                className="additional-product-item"
                style={{
                  borderRadius: "15px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  textAlign: "left",
                  maxWidth: "250px", // Adjust maximum width of the card
                  width: "100%", // Set width to 100% to fill the container
                  height: "auto", // Set height to auto to adjust based on content
                  transition: "transform 0.3s ease-in-out",
                  position: "relative", // Ensure relative positioning for absolute children
                  background: "white", // Set background color
                  padding: "20px", // Add padding for spacing
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${value.image}`}
                  alt={value.brand}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    transition: "opacity 0.3s ease-in-out",
                  }}
                />
                <div style={{ padding: "12px" }}>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "22px",
                      fontWeight: "bold",
                      marginBottom: "6px",
                    }}
                  >
                    Title:{value.brand}
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "18px",
                      color: "red",
                      fontWeight: "bold",
                      marginBottom: "6px",
                    }}
                  >
                    Price:₹{value.price}
                  </p>
                  <p style={{ margin: "0", fontSize: "15px", color: "#888" }}>
                    Product Type: {value.product_type}
                  </p>
                </div>
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: "8px",
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    pointerEvents: "none",
                  }}
                ></div>
              </div>
            ))
          ) : (
            <p>Loading more products...</p>
          )}
        </div>

        {isModalOpen && (
          <div className="overlay" onClick={closeModal}>
            <div className="modal-content">
              <button className="close-modal-button" onClick={closeModal}>
                &times;
              </button>
              {product && (
                <img
                  src={`data:image/jpeg;base64,${product.image_base64}`}
                  alt={product?.title}
                />
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SingleProduct;
