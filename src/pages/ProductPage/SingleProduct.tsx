import React from 'react';

interface Product {
  title: string;
  price: number;
  brand: string;
  dominant_material: string;
  size: string;
  actual_color: string;
  product_details: string[];
  type: string;
  image: string;
}

// Sample product data
const singleProduct: Product = {
  title: "Sample Product",
  price: 99.99,
  brand: "Sample Brand",
  dominant_material: "Cotton",
  size: "M",
  actual_color: "Blue",
  product_details: ["Detail 1", "Detail 2", "Detail 3"],
  type: "Shirt",
  image: "accee.jpg"
};

// Single Product Component
const SingleProduct: React.FC = () => {
  return (
    <div className="product-container">
      <div className="product-card">
        <div className="product-image">
          <img src={singleProduct.image} alt={singleProduct.title} />
        </div>
        <div className="product-details">
          <h1>{singleProduct.title}</h1>
          <p><strong>Brand:</strong> {singleProduct.brand}</p>
          <p><strong>Type:</strong> {singleProduct.type}</p>
          <p><strong>Price:</strong> ${singleProduct.price}</p>
          <p><strong>Actual Color/Size:</strong> {singleProduct.actual_color} / {singleProduct.size}</p>
          <p><strong>Dominant Material:</strong> {singleProduct.dominant_material}</p>
          <div>
            <h3>Product Details:</h3>
            <ul>
              {singleProduct.product_details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;




const styles = `
/* Product card */
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 400px; /* Limit maximum width */
}

/* Product image */
.product-image {
  width: 100%;
  max-height: 300px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: auto;
  object-fit: cover; /* Ensure image covers entire space */
}

/* Product details */
.product-details {
  padding: 20px;
}

.product-details h1 {
  color: var(--text-color);
  margin: 0 0 10px;
}

.product-details p {
  color: var(--text-color);
  margin: 10px 0;
}

.product-details ul {
  list-style-type: none;
  padding: 0;
}

.product-details ul li {
  color: var(--text-color);
  margin-bottom: 5px;
}

/* Button */
.button {
  background-color: var(--primary-color);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #ff812e; /* Lighter shade of primary color */
}

  /* Colors */
:root {
  --primary-color: #ff6c00; /* Primary color */
  --text-color: #333; /* Text color */
  --background-color: #f9f9f9; /* Background color */
}

/* Typography */
body {
  font-family: Arial, sans-serif;
}

h1, h2, h3 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

h2 {
  font-size: 20px;
  font-weight: bold;
}

h3 {
  font-size: 16px;
  font-weight: bold;
}

p {
  font-size: 14px;
  line-height: 1.5;
}

  
  
`;


