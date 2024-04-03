// import React, { useEffect, useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import {
//   Box,
//   Grid,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import { Modal } from "@mui/material";

// import { Delete, Add } from "@mui/icons-material";
// import Navbar from "../Navbar";
// import axios from "axios";
// import { Button } from "@mui/material";
// import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

// interface Product {
//   product_id: number;
//   product_type: string;
//   brand: string;
//   price: number;
//   image: string[]; // Assuming image is stored as string URL
// }

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

// const tableCellStyle: React.CSSProperties = {
//   padding: "8px",
//   textAlign: "left",
//   borderBottom: "1px solid #ddd",
// };

// const WishlistPage = ({
//   wishlist: initialWishlist,
// }: {
//   // wishlist: { [key: string]: Product };
//   wishlist: Product[];
// }) => {
//   const [wishlist, setWishlist] = useState<Product[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   const c_id = 2;

//   const handleImageClick = (product: Product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//     // Calculate height dynamically based on content
//     const contentHeight =
//       document.getElementById("modal-content")?.clientHeight;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get<{ [key: string]: Product }>(
//           "http://127.0.0.1:8000/wishlist/" + c_id
//         );
//         if (response.data && typeof response.data === "object") {
//           setWishlist(Object.values(response.data));
//         } else {
//           console.error("Invalid data format:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleRemoveFromWishlist = async (productId: number) => {
//     try {
//       const response = await axios.delete(
//         `http://127.0.0.1:8000/wishlist_remove/${c_id}/${productId}`
//       );
//       if (response.status === 200) {
//         setModalMessage("Product removed from the wishlist");
//         setIsModalOpen(true);

//         // Wait for 3 seconds before reloading the window
//         setTimeout(() => {
//           window.location.reload();
//         }, 3000); // 3000 milliseconds = 3 seconds
//       } else {
//         console.error("Invalid data format:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const addToCart = async (product: number) => {
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/cart_add/${c_id}/${product}`,
//         {}, // Assuming no body is needed. If needed, add here.
//         {
//           validateStatus: function (status) {
//             return status >= 200 && status < 500; // Resolve only if the status code is less than 500
//           },
//         }
//       );

//       if (response.status === 200) {
//         setModalMessage("Product added to cart successfully");
//         setIsModalOpen(true); // Open the modal
//         setTimeout(() => {
//           window.location.reload();
//         }, 3000);
//       } else if (response.status === 400) {
//         // Handle the case where the product is already in the cart
//         // Assuming the backend sends a specific message for this case
//         setModalMessage(
//           response.data.message || "Product is already in the cart."
//         );
//         setIsModalOpen(true); // Open the modal
//         setTimeout(() => {
//           window.location.reload();
//         }, 3000);
//       } else {
//         console.error("Unexpected response:", response.data);
//         setModalMessage("An unexpected error occurred.");
//         setIsModalOpen(true); // It might be better to handle this case differently
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       setModalMessage("An error occurred while adding the product to cart.");
//       setIsModalOpen(true); // Open the modal to show the error message
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Box sx={{ flexGrow: 1, padding: 3 }}>
//         <Grid container spacing={4} justifyContent="center">
//           <Grid item xs={10}>
//             {wishlist.length > 0 ? (
//               <TableContainer
//                 component={Paper}
//                 elevation={3}
//                 sx={{
//                   borderRadius: "12px",
//                   overflowX: "auto",
//                   maxWidth: "80%", // Adjust the maximum width as needed
//                   justifyContent: "center",
//                   display: "flex",
//                   margin: "auto",
//                 }}
//               >
//                 <Table aria-label="wishlist table">
//                   <TableHead style={{ backgroundColor: "#724c31" }}>
//                     <TableRow>
//                       <TableCell style={{ color: "white" }}>
//                         Product Image
//                       </TableCell>
//                       <TableCell style={{ color: "white" }}>Brand</TableCell>
//                       <TableCell style={{ color: "white" }}>
//                         Product Type
//                       </TableCell>
//                       <TableCell style={{ color: "white" }}>Price</TableCell>
//                       <TableCell
//                         colSpan={2}
//                         style={{ color: "white", textAlign: "center" }}
//                       >
//                         Actions
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {wishlist.map((product) => (
//                       <TableRow key={product.product_id} hover>
//                         <TableCell>
//                           <img
//                             src={`data:image/jpeg;base64,${product.image}`}
//                             alt={product.product_type}
//                             onClick={() => handleImageClick(product)}
//                             style={{
//                               width: "70px",
//                               height: "70px",
//                               borderRadius: "8px",
//                             }}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Typography style={{ fontSize: "18px" }}>
//                             {product.brand}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>{product.product_type}</TableCell>
//                         <TableCell>
//                           {product.price !== undefined
//                             ? `₹${product.price.toFixed(2)}`
//                             : "Price not available"}
//                         </TableCell>
//                         <TableCell>
//                           <Button
//                             variant="contained"
//                             startIcon={<AddCircleRoundedIcon />}
//                             style={{ fontSize: "12px" }}
//                             onClick={() => addToCart(product.product_id)}
//                           >
//                             Add to Cart
//                           </Button>

//                           <Button
//                             variant="contained"
//                             startIcon={<Delete />}
//                             style={{ fontSize: "12px  ", marginLeft: "10px" }}
//                             onClick={() =>
//                               handleRemoveFromWishlist(product.product_id)
//                             }
//                           >
//                             Remove
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             ) : (
//               <Typography
//                 style={{ textAlign: "center", fontSize: "25px" }}
//                 variant="body1"
//               >
//                 Your wishlist is empty!
//               </Typography>
//             )}
//           </Grid>
//         </Grid>
//         <Modal
//           open={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: 400,
//               bgcolor: "background.paper",
//               boxShadow: 24,
//               p: 4,
//               borderRadius: 2,
//               outline: "none", // This removes the default focus ring
//             }}
//           >
//             <IconButton
//               aria-label="close"
//               onClick={() => setIsModalOpen(false)}
//               sx={{
//                 position: "absolute",
//                 right: 8,
//                 top: 8,
//                 color: (theme) => theme.palette.grey[500],
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               Product Details
//             </Typography>
//             {selectedProduct && (
//               <>
//                 <img
//                   src={`data:image/jpeg;base64,${selectedProduct.image}`}
//                   alt={selectedProduct.product_type}
//                   onClick={() => handleImageClick(selectedProduct)}
//                   style={{
//                     width: "70px",
//                     height: "70px",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Typography variant="subtitle1">
//                   Brand: {selectedProduct.brand}
//                 </Typography>
//                 <Typography variant="subtitle1">
//                   Price: ₹{selectedProduct.price.toFixed(2)}
//                 </Typography>
//                 <Typography variant="subtitle1">
//                   Product Type: {selectedProduct.product_type}
//                 </Typography>
//               </>
//             )}
//             <Button
//               variant="contained"
//               style={{ marginTop: "20px" }}
//               onClick={() => setIsModalOpen(false)}
//             >
//               Close
//             </Button>
//           </Box>
//         </Modal>
//       </Box>
//     </>
//   );
// };

// export default WishlistPage;

// // import React, { useEffect, useState } from "react";
// // import CloseIcon from "@mui/icons-material/Close";
// // import {
// //   Box,
// //   Grid,
// //   IconButton,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Typography,
// // } from "@mui/material";
// // import { useLocation } from "react-router-dom";
// // import { Modal } from "@mui/material";

// // import { Delete, Add } from "@mui/icons-material";
// // import Navbar from "../Navbar";
// // import axios from "axios";
// // import { Button } from "@mui/material";
// // import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

// // interface Product {
// //   product_id: number;
// //   product_type: string;
// //   brand: string;
// //   price: number;
// //   image: string[]; // Assuming image is stored as string URL
// // }

// // interface Main {
// //   product_id: number;
// //   title: string;
// //   price: number;
// //   brand: string;
// //   material: string;
// //   size: string;
// //   color: string;
// //   description: string;
// //   product_type: string;
// //   image_base64: string;
// // }

// // const tableCellStyle: React.CSSProperties = {
// //   padding: "8px",
// //   textAlign: "left",
// //   borderBottom: "1px solid #ddd",
// // };

// // const WishlistPage = ({
// //   wishlist: initialWishlist,
// // }: {
// //   wishlist: Product[];
// // }) => {
// //   const productId = location.state.productId;
// //   const [wishlist, setWishlist] = useState<Product[]>([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [modalMessage, setModalMessage] = useState("");
// //   const [product, setProduct] = useState<Main | null>(null);
// //   const [selectedProduct, setSelectedProduct] = useState<Main | null>(null);

// //   const c_id = 2;

// //   useEffect(() => {
// //     const fetchProductData = async () => {
// //       try {
// //         const response = await axios.get(
// //           `http://127.0.0.1:8000/product/${productId}`
// //         );
// //         setProduct(response.data);
// //       } catch (error) {
// //         console.error("Failed to fetch product data:", error);
// //       }
// //     };

// //     fetchProductData();
// //   }, [productId]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.get<{ [key: string]: Product }>(
// //           "http://127.0.0.1:8000/wishlist/" + c_id
// //         );
// //         if (response.data && typeof response.data === "object") {
// //           setWishlist(Object.values(response.data));
// //         } else {
// //           console.error("Invalid data format:", response.data);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const handleRemoveFromWishlist = async (productId: number) => {
// //     try {
// //       const response = await axios.delete(
// //         `http://127.0.0.1:8000/wishlist_remove/${c_id}/${productId}`
// //       );
// //       if (response.status === 200) {
// //         setModalMessage("Product removed from the wishlist");
// //         setIsModalOpen(true);

// //         // Wait for 3 seconds before reloading the window
// //         setTimeout(() => {
// //           window.location.reload();
// //         }, 3000); // 3000 milliseconds = 3 seconds
// //       } else {
// //         console.error("Invalid data format:", response.data);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   const addToCart = async (productId: number) => {
// //     try {
// //       const response = await axios.post(
// //         `http://127.0.0.1:8000/cart_add/${c_id}/${productId}`,
// //         {}, // Assuming no body is needed. If needed, add here.
// //         {
// //           validateStatus: function (status) {
// //             return status >= 200 && status < 500; // Resolve only if the status code is less than 500
// //           },
// //         }
// //       );

// //       if (response.status === 200) {
// //         setModalMessage("Product added to cart successfully");
// //         setIsModalOpen(true); // Open the modal
// //         setTimeout(() => {
// //           window.location.reload();
// //         }, 3000);
// //       } else if (response.status === 400) {
// //         // Handle the case where the product is already in the cart
// //         // Assuming the backend sends a specific message for this case
// //         setModalMessage(
// //           response.data.message || "Product is already in the cart."
// //         );
// //         setIsModalOpen(true); // Open the modal
// //         setTimeout(() => {
// //           window.location.reload();
// //         }, 3000);
// //       } else {
// //         console.error("Unexpected response:", response.data);
// //         setModalMessage("An unexpected error occurred.");
// //         setIsModalOpen(true); // It might be better to handle this case differently
// //       }
// //     } catch (error) {
// //       console.error("Error adding to cart:", error);
// //       setModalMessage("An error occurred while adding the product to cart.");
// //       setIsModalOpen(true); // Open the modal to show the error message
// //     }
// //   };

// //   const mapProductToMain = (product: Product): Main => {
// //     // Default values for missing properties
// //     return {
// //       product_id: product.product_id,
// //       title: "", // No title available for Product
// //       price: product.price,
// //       brand: product.brand,
// //       material: "", // No material available for Product
// //       size: "", // No size available for Product
// //       color: "", // No color available for Product
// //       description: "", // No description available for Product
// //       product_type: product.product_type,
// //       image_base64: "", // No image base64 available for Product
// //     };
// //   };

// //   const handleImageClick = (product: Product) => {
// //     const mainProduct = mapProductToMain(product);
// //     setSelectedProduct(mainProduct); // Set the selected product to state
// //     setIsModalOpen(true);
// //   };

// //   return (
// //     <>
// //       <Navbar />
// //       <Box sx={{ flexGrow: 1, padding: 3 }}>
// //         <Grid container spacing={4} justifyContent="center">
// //           <Grid item xs={10}>
// //             {wishlist.length > 0 ? (
// //               <TableContainer
// //                 component={Paper}
// //                 elevation={3}
// //                 sx={{
// //                   borderRadius: "12px",
// //                   overflowX: "auto",
// //                   maxWidth: "80%", // Adjust the maximum width as needed
// //                   justifyContent: "center",
// //                   display: "flex",
// //                   margin: "auto",
// //                 }}
// //               >
// //                 <Table aria-label="wishlist table">
// //                   <TableHead style={{ backgroundColor: "#724c31" }}>
// //                     <TableRow>
// //                       <TableCell style={{ color: "white" }}>
// //                         Product Image
// //                       </TableCell>
// //                       <TableCell style={{ color: "white" }}>Brand</TableCell>
// //                       <TableCell style={{ color: "white" }}>
// //                         Product Type
// //                       </TableCell>
// //                       <TableCell style={{ color: "white" }}>Price</TableCell>
// //                       <TableCell
// //                         colSpan={2}
// //                         style={{ color: "white", textAlign: "center" }}
// //                       >
// //                         Actions
// //                       </TableCell>
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {wishlist.map((product) => (
// //                       <TableRow key={product.product_id} hover>
// //                         <TableCell>
// //                           <img
// //                             src={`data:image/jpeg;base64,${product.image}`}
// //                             alt={product.product_type}
// //                             style={{
// //                               width: "70px",
// //                               height: "70px",
// //                               borderRadius: "8px",
// //                               cursor: "pointer", // Add cursor pointer for clickable behavior
// //                             }}
// //                             onClick={() => handleImageClick(product)} // Handle image click
// //                           />
// //                         </TableCell>
// //                         <TableCell>
// //                           <Typography style={{ fontSize: "18px" }}>
// //                             {product.brand}
// //                           </Typography>
// //                         </TableCell>
// //                         <TableCell>{product.product_type}</TableCell>
// //                         <TableCell>
// //                           {product.price !== undefined
// //                             ? `₹${product.price.toFixed(2)}`
// //                             : "Price not available"}
// //                         </TableCell>
// //                         <TableCell>
// //                           <Button
// //                             variant="contained"
// //                             startIcon={<AddCircleRoundedIcon />}
// //                             style={{ fontSize: "12px" }}
// //                             onClick={() => addToCart(product.product_id)}
// //                           >
// //                             Add to Cart
// //                           </Button>

// //                           <Button
// //                             variant="contained"
// //                             startIcon={<Delete />}
// //                             style={{ fontSize: "12px  ", marginLeft: "10px" }}
// //                             onClick={() =>
// //                               handleRemoveFromWishlist(product.product_id)
// //                             }
// //                           >
// //                             Remove
// //                           </Button>
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //               </TableContainer>
// //             ) : (
// //               <Typography
// //                 style={{ textAlign: "center", fontSize: "25px" }}
// //                 variant="body1"
// //               >
// //                 Your wishlist is empty!
// //               </Typography>
// //             )}
// //           </Grid>
// //         </Grid>
// //         <Modal
// //           open={isModalOpen}
// //           onClose={() => setIsModalOpen(false)}
// //           aria-labelledby="modal-modal-title"
// //           aria-describedby="modal-modal-description"
// //         >
// //           <Box
// //             sx={{
// //               position: "absolute",
// //               top: "50%",
// //               left: "50%",
// //               transform: "translate(-50%, -50%)",
// //               width: 400,
// //               bgcolor: "background.paper",
// //               boxShadow: 24,
// //               p: 4,
// //               borderRadius: 2,
// //               outline: "none", // This removes the default focus ring
// //             }}
// //           >
// //             <IconButton
// //               aria-label="close"
// //               onClick={() => setIsModalOpen(false)}
// //               sx={{
// //                 position: "absolute",
// //                 right: 8,
// //                 top: 8,
// //                 color: (theme) => theme.palette.grey[500],
// //               }}
// //             >
// //               <CloseIcon />
// //             </IconButton>
// //             <Typography id="modal-modal-title" variant="h6" component="h2">
// //               Product Details
// //             </Typography>
// //             {selectedProduct && (
// //               <>
// //                 <Typography variant="subtitle1">
// //                   Title: {selectedProduct.title}
// //                 </Typography>
// //                 <Typography variant="subtitle1">
// //                   Brand: {selectedProduct.brand}
// //                 </Typography>
// //                 <Typography variant="subtitle1">
// //                   Price: ₹{selectedProduct.price.toFixed(2)}
// //                 </Typography>
// //                 <Typography variant="subtitle1">
// //                   Product Type: {selectedProduct.product_type}
// //                 </Typography>
// //               </>
// //             )}
// //             <Button
// //               variant="contained"
// //               style={{ marginTop: "20px" }}
// //               onClick={() => setIsModalOpen(false)}
// //             >
// //               Close
// //             </Button>
// //           </Box>
// //         </Modal>
// //       </Box>
// //     </>
// //   );
// // };

// // export default WishlistPage;


























import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Modal, Button } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import Navbar from "../Navbar";
import axios from "axios";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  image: string[]; // Assuming image is stored as string URL
}

const WishlistPage = ({
  wishlist: initialWishlist,
}: {
  wishlist: Product[];
}) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [productModalMessage, setProductModalMessage] = useState("");
  const [messageModalMessage, setMessageModalMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string>("");

  const c_id = 2;

  const handleImageClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ [key: string]: Product }>(
          "http://127.0.0.1:8000/wishlist/" + c_id
        );
        if (response.data && typeof response.data === "object") {
          setWishlist(Object.values(response.data));
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/wishlist_remove/${c_id}/${productId}`
      );
      if (response.status === 200) {
        setMessageModalMessage("Product removed from the wishlist");
        setIsMessageModalOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = async (product: number) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/cart_add/${c_id}/${product}`,
        {},
        {
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        }
      );

      if (response.status === 200) {
        setMessageModalMessage("Product added to cart successfully");
        setIsMessageModalOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else if (response.status === 400) {
        setMessageModalMessage(
          response.data.message || "Product is already in the cart."
        );
        setIsMessageModalOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error("Unexpected response:", response.data);
        setMessageModalMessage("An unexpected error occurred.");
        setIsMessageModalOpen(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessageModalMessage(
        "An error occurred while adding the product to cart."
      );
      setIsMessageModalOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={10}>
            {wishlist.length > 0 ? (
              <TableContainer
                component={Paper}
                elevation={3}
                sx={{
                  borderRadius: "12px",
                  overflowX: "auto",
                  maxWidth: "80%",
                  justifyContent: "center",
                  display: "flex",
                  margin: "auto",
                }}
              >
                <Table aria-label="wishlist table">
                  <TableHead style={{ backgroundColor: "#724c31" }}>
                    <TableRow>
                      <TableCell style={{ color: "white" }}>
                        Product Image
                      </TableCell>
                      <TableCell style={{ color: "white" }}>Brand</TableCell>
                      <TableCell style={{ color: "white" }}>
                        Product Type
                      </TableCell>
                      <TableCell style={{ color: "white" }}>Price</TableCell>
                      <TableCell
                        colSpan={2}
                        style={{ color: "white", textAlign: "center" }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wishlist.map((product) => (
                      <TableRow key={product.product_id} hover>
                        <TableCell>
                          <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.product_type}
                            onClick={() => handleImageClick(product)}
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "8px",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: "18px" }}>
                            {product.brand}
                          </Typography>
                        </TableCell>
                        <TableCell>{product.product_type}</TableCell>
                        <TableCell>
                          {product.price !== undefined
                            ? `₹${product.price.toFixed(2)}`
                            : "Price not available"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            startIcon={<AddCircleRoundedIcon />}
                            style={{ fontSize: "12px" }}
                            onClick={() => addToCart(product.product_id)}
                          >
                            Add to Cart
                          </Button>

                          <Button
                            variant="contained"
                            startIcon={<Delete />}
                            style={{ fontSize: "12px  ", marginLeft: "10px" }}
                            onClick={() =>
                              handleRemoveFromWishlist(product.product_id)
                            }
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography
                style={{ textAlign: "center", fontSize: "25px" }}
                variant="body1"
              >
                Your wishlist is empty!
              </Typography>
            )}
          </Grid>
        </Grid>
        {/* Product Details Modal */}
        <Modal
          open={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          aria-labelledby="product-modal-title"
          aria-describedby="product-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              outline: "none", // This removes the default focus ring
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => setIsProductModalOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="product-modal-title" variant="h6" component="h2">
              Product Details
            </Typography>
            {selectedProduct && (
              <>
                <img
                  src={`data:image/jpeg;base64,${selectedProduct.image}`}
                  alt={selectedProduct.product_type}
                  onClick={() => handleImageClick(selectedProduct)}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "8px",
                  }}
                />
                <Typography variant="subtitle1">
                  Brand: {selectedProduct.brand}
                </Typography>
                <Typography variant="subtitle1">
                  Price: ₹{selectedProduct.price.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">
                  Product Type: {selectedProduct.product_type}
                </Typography>
              </>
            )}
            <Button
              variant="contained"
              style={{ marginTop: "20px" }}
              onClick={() => setIsProductModalOpen(false)}
            >
              Close
            </Button>
          </Box>
        </Modal>
        {/* Message Modal */}
        <Modal
          open={isMessageModalOpen}
          onClose={() => setIsMessageModalOpen(false)}
          aria-labelledby="message-modal-title"
          aria-describedby="message-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              outline: "none", // This removes the default focus ring
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => setIsMessageModalOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="message-modal-title" variant="h6" component="h2">
              Message
            </Typography>
            <Typography id="message-modal-description">
              {messageModalMessage}
            </Typography>
            <Button
              variant="contained"
              style={{ marginTop: "20px" }}
              onClick={() => setIsMessageModalOpen(false)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default WishlistPage;
