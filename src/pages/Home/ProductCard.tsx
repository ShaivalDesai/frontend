import React from "react";
import { Link } from "react-router-dom";

const cardStyle: React.CSSProperties = {
  height: "200px",
  width: "300px",
  backgroundImage: `url('bg3.jpg')`, // Replace 'path_to_your_image.jpg' with the actual path to your image
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff", // Text color on top of the background image
  textAlign: "center",
};

const MyCard = () => {
  return (
    <>
      <Link to="/other-page" style={{ textDecoration: "none" }}>
        <button style={cardStyle}>
          <h2>Mens Wear</h2>
          <p>Click here to shop!</p>
        </button>
      </Link>
    </>
  );
};

export default MyCard;
