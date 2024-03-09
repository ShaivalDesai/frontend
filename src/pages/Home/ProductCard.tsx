// import React from "react";
// import { Link } from "react-router-dom";

// interface MyCardProps {
//   image_base64: string; // Image URL
//   title: string; // Title text
//   color: string; // Color for text and background
//   onClick?: () => void;
// }

// const cardStyle: React.CSSProperties = {
//   height: "250px",
//   width: "220px",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   borderRadius: "10px",
//   color: "#333",
//   textAlign: "center",
//   position: "relative",
//   overflow: "hidden",
// };

// const overlayStyle: React.CSSProperties = {
//   position: "absolute",
//   top: "0",
//   left: "0",
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   opacity: "0",
//   transition: "opacity 0.3s ease-in-out",
// };

// const MyCard: React.FC<MyCardProps> = ({ image_base64, title, color }) => {
//   const dynamicCardStyle: React.CSSProperties = {
//     ...cardStyle,
//     backgroundImage: `url(${image_base64})`,
//     backgroundColor: color,
//   };

//   const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const overlay = (e.currentTarget as HTMLElement).querySelector(
//       ".overlay"
//     ) as HTMLElement;
//     if (overlay) overlay.style.opacity = "1";
//   };

//   const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const overlay = (e.currentTarget as HTMLElement).querySelector(
//       ".overlay"
//     ) as HTMLElement;
//     if (overlay) overlay.style.opacity = "0";
//   };

//   return (
//     <Link to="/other-page" style={{ textDecoration: "none" }}>
//       <button
//         style={dynamicCardStyle}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className="overlay" style={overlayStyle}>
//           <h2 style={{ fontSize: "1.5rem", color: "#fff" }}>{title}</h2>
//           <p style={{ fontSize: "1rem", color: "#fff" }}>Click here to shop!</p>
//         </div>
//       </button>
//     </Link>
//   );
// };

// export default MyCard;



import React from "react";
import { Link } from "react-router-dom";

interface MyCardProps {
  image_base64: string; // Image URL
  title: string; // Title text
  color: string; // Color for text and background
  to: string | { pathname: string; search: string }; // URL path to navigate to or object for Link component
  onClick?: () => void; // Optional onClick handler
}

const cardStyle: React.CSSProperties = {
  height: "250px",
  width: "220px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "10px",
  color: "#333",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  opacity: "0",
  transition: "opacity 0.3s ease-in-out",
};

const MyCard: React.FC<MyCardProps> = ({ image_base64, title, color, to, onClick }) => {
  const dynamicCardStyle: React.CSSProperties = {
    ...cardStyle,
    backgroundImage: `url(${image_base64})`,
    backgroundColor: color,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const overlay = (e.currentTarget as HTMLElement).querySelector(
      ".overlay"
    ) as HTMLElement;
    if (overlay) overlay.style.opacity = "1";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const overlay = (e.currentTarget as HTMLElement).querySelector(
      ".overlay"
    ) as HTMLElement;
    if (overlay) overlay.style.opacity = "0";
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <button
        style={dynamicCardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="overlay" style={overlayStyle}>
          <h2 style={{ fontSize: "1.5rem", color: "#fff" }}>{title}</h2>
          <p style={{ fontSize: "1rem", color: "#fff" }}>Click here to shop!</p>
        </div>
      </button>
    </Link>
  );
};

export default MyCard;


// import React from "react";

// // Updated interface without the 'to' prop
// interface MyCardProps {
//   image_base64: string; // Image URL
//   title: string; // Title text
//   color: string; // Color for text and background
//   onClick?: () => void; // Optional onClick handler
// }

// const cardStyle: React.CSSProperties = {
//   height: "250px",
//   width: "220px",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   borderRadius: "10px",
//   color: "#333",
//   textAlign: "center",
//   position: "relative",
//   overflow: "hidden",
// };

// const overlayStyle: React.CSSProperties = {
//   position: "absolute",
//   top: "0",
//   left: "0",
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   opacity: "0",
//   transition: "opacity 0.3s ease-in-out",
// };

// const MyCard: React.FC<MyCardProps> = ({ image_base64, title, color, onClick }) => {
//   const dynamicCardStyle: React.CSSProperties = {
//     ...cardStyle,
//     backgroundImage: `url(${image_base64})`,
//     backgroundColor: color,
//   };

//   const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const overlay = (e.currentTarget as HTMLElement).querySelector(
//       ".overlay"
//     ) as HTMLElement;
//     if (overlay) overlay.style.opacity = "1";
//   };

//   const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const overlay = (e.currentTarget as HTMLElement).querySelector(
//       ".overlay"
//     ) as HTMLElement;
//     if (overlay) overlay.style.opacity = "0";
//   };

//   return (
//     <button
//       style={dynamicCardStyle}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onClick={onClick}
//     >
//       <div className="overlay" style={overlayStyle}>
//         <h2 style={{ fontSize: "1.5rem", color: "#fff" }}>{title}</h2>
//         <p style={{ fontSize: "1rem", color: "#fff" }}>Click here to shop!</p>
//       </div>
//     </button>
//   );
// };

// export default MyCard;
