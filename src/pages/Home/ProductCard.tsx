import React from "react";
import { Link } from "react-router-dom";

interface MyCardProps {
  image: string; // Image URL
  title: string; // Title text
  color: string; // Color for text and background
}

const cardStyle: React.CSSProperties = {
  height: "200px",
  width: "300px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff", // Default text color on top of the background image
  textAlign: "center",
};

const MyCard: React.FC<MyCardProps> = ({ image, title, color }) => {
  const dynamicCardStyle: React.CSSProperties = {
    ...cardStyle,
    backgroundImage: `url(${image})`,
    backgroundColor: color,
  };

  return (
    <>
      <Link to="/other-page" style={{ textDecoration: "none" }}>
        <button style={dynamicCardStyle}>
          <h2 style={{fontSize:"30px"}}>{title}</h2>
          {/* <p>Click here to shop!</p> */}
        </button>
      </Link>
    </>
  );
};

export default MyCard;
