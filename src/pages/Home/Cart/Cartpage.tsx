// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Box,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import Navbar from "../Navbar";
// import { Delete, Add, Remove, ShoppingCart } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// // Assuming Product interface is defined elsewhere
// interface Product {
//   product_id: number;
//   product_type: string;
//   brand: string;
//   price: number;
//   image: string[];
//   quantity: number;
// }

// const CartPage = () => {
//   const [cartState, setCartState] = useState<Product[]>([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartState(JSON.parse(savedCart));
//     }
//   }, []);

//   const tableHeaderStyle: React.CSSProperties = {
//     padding: "16px",
//     textAlign: "left",
//     borderBottom: "1px solid #ddd",
//     backgroundColor: "#724c31",
//     color: "white",
//     fontSize: "21px",
//   };

//   const tableCellStyle: React.CSSProperties = {
//     padding: "8px",
//     textAlign: "center",
//     borderBottom: "1px solid #ddd",
//     fontSize: "20px",
//   };

//   const imageStyle: React.CSSProperties = {
//     width: "80px",
//     height: "auto",
//     borderRadius: "8px",
//   };

//   const handleRemoveFromCart = (productId: number) => {
//     const updatedCart = cartState.filter(
//       (item) => item.product_id !== productId
//     );
//     setCartState(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleQuantityChange = (productId: number, newQuantity: number) => {
//     newQuantity = Math.max(newQuantity, 1);
//     const updatedCart = cartState.map((item) =>
//       item.product_id === productId ? { ...item, quantity: newQuantity } : item
//     );
//     setCartState(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handlePlaceOrder = () => {
//     console.log("Order placed");
//     // Logic for order placement
//     navigate("/home");
//   };

//   return (
//     <>
//       <head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
//           rel="stylesheet"
//         />
//       </head>

//       <Navbar />

//       <Box sx={{ flexGrow: 1, padding: 3 }}>
//         <Grid container spacing={5} justifyContent="center">
//           {cartState.length > 0 ? (
//             <Grid item xs={12}>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   // marginTop: "1px",
//                   marginBottom: "10px",
//                   textAlign: "center",
//                   fontFamily: "'Roboto', sans-serif",
//                   fontWeight: "bold",
//                   fontSize: "60px",
//                   color: "red",
//                   background:
//                     "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 My Cart
//               </Typography>
//               <TableContainer
//                 component={Paper}
//                 elevation={3}
//                 sx={{
//                   borderRadius: "12px",
//                   overflowX: "auto",
//                   maxWidth: "90%",
//                   margin: "auto",
//                 }}
//               >
//                 <Table aria-label="cart table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell style={tableHeaderStyle}>
//                         Product Image{" "}
//                       </TableCell>
//                       <TableCell style={tableHeaderStyle}>Brand</TableCell>
//                       <TableCell style={tableHeaderStyle}>
//                         Product Type
//                       </TableCell>
//                       <TableCell style={tableHeaderStyle}>Price</TableCell>
//                       <TableCell style={tableHeaderStyle}>Quantity</TableCell>
//                       <TableCell style={tableHeaderStyle}>
//                         Remove from Cart
//                       </TableCell>
//                       <TableCell style={tableHeaderStyle}>
//                         Total Price
//                       </TableCell>
//                       <TableCell style={tableHeaderStyle}>
//                         Place Order
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {cartState.map((product) => (
//                       <TableRow key={product.product_id} hover>
//                         <TableCell style={tableCellStyle}>
//                           <img
//                             src={`data:image/jpeg;base64,${product.image}`}
//                             alt={product.product_type}
//                             style={{
//                               width: "80px",
//                               height: "auto",
//                               borderRadius: "8px",
//                             }}
//                           />
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           {product.brand}
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           {product.product_type}
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           ₹{product.price.toFixed(2)}
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           <IconButton
//                             aria-label="remove"
//                             onClick={() =>
//                               handleQuantityChange(
//                                 product.product_id,
//                                 product.quantity - 1
//                               )
//                             }
//                           >
//                             <Remove />
//                           </IconButton>
//                           {product.quantity}
//                           <IconButton
//                             aria-label="add"
//                             onClick={() =>
//                               handleQuantityChange(
//                                 product.product_id,
//                                 product.quantity + 1
//                               )
//                             }
//                           >
//                             <Add />
//                           </IconButton>
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           <IconButton
//                             aria-label="remove"
//                             onClick={() =>
//                               handleRemoveFromCart(product.product_id)
//                             }
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               alignItems: "center",
//                               marginLeft: "70px",
//                             }}
//                           >
//                             <Delete />
//                           </IconButton>
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           <Typography
//                             variant="body1"
//                             style={{
//                               marginLeft: "8px",
//                             }}
//                           >
//                             ₹{(product.price * product.quantity).toFixed(2)}
//                           </Typography>
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           <IconButton
//                             aria-label="place-order"
//                             onClick={handleOpenDialog}
//                           >
//                             <ShoppingCart />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Grid>
//           ) : (
//             <Typography
//               style={{
//                 textAlign: "center",
//                 fontSize: "25px",
//                 marginTop: "50px",
//               }}
//               variant="body1"
//             >
//               Your cart is empty!
//             </Typography>
//           )}
//         </Grid>
//       </Box>

//       <Dialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Confirm Order"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure you want to place your order?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button
//             onClick={() => {
//               handlePlaceOrder();
//               setOpenDialog(false);
//             }}
//             autoFocus
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default CartPage;

// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Box,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Modal,
// } from "@mui/material";
// import Navbar from "../Navbar";
// import CloseIcon from "@mui/icons-material/Close";

// import { Delete, Add, Remove } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Assuming Product interface is defined elsewhere
// interface Product {
//   product_id: number;
//   product_type: string;
//   brand: string;
//   price: number;
//   image: string[];
//   quantity: number;
// }

// const CartPage = () => {
//   const [cartState, setCartState] = useState<Product[]>([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const navigate = useNavigate();
//   const [Total, setTotal] = useState<Number>();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [messageModalMessage, setMessageModalMessage] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isProductModalOpen, setIsProductModalOpen] = useState(false);
//   const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

//   const c_id = 2;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get<{ cart: { [key: string]: Product }, total_amount: number }>(
//           "http://127.0.0.1:8000/cart_view/" + c_id
//         );
//         if (response.data && response.data.cart && typeof response.data.cart === "object") {
//           setCartState(Object.values(response.data.cart));
//           setTotal(response.data.total_amount);
//           console.log(setTotal); // Log the value of setTotal here
//         } else {
//           console.error("Invalid data format:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleImageClick = (product: Product) => {
//     setSelectedProduct(product);
//     setIsProductModalOpen(true);
//   };

//   const tableHeaderStyle: React.CSSProperties = {
//     padding: "8px",
//     textAlign: "left",
//     borderBottom: "1px solid #ddd",
//     backgroundColor: "#724c31",
//     color: "white",
//   };

//   const tableCellStyle: React.CSSProperties = {
//     padding: "8px",
//     textAlign: "left",
//     borderBottom: "1px solid #ddd",
//   };

//   const imageStyle: React.CSSProperties = {
//     width: "80px",
//     height: "auto",
//     borderRadius: "8px",
//   };

//   const handleRemoveFromCart = async (productId: number) => {
//     try {
//       const response = await axios.delete(
//         `http://127.0.0.1:8000/cart_remove/${c_id}/${productId}`
//       );
//       if (response.status === 200) {
//         setMessageModalMessage("Product removed from the wishlist");
//         setIsMessageModalOpen(true);
//         setTimeout(() => {
//           window.location.reload();
//         }, 3000);
//       } else {
//         console.error("Invalid data format:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleQuantityChange = async(productId: number, newQuantity: number) => {
//     newQuantity = Math.max(newQuantity, 1);
//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/cart/update/${c_id}/${productId}/${newQuantity}`
//       );
//       if (response.status === 200) {
//         // window.alert("quantity updated successfully");
//         window.location.reload();
//       } else {
//         console.error("Invalid data format:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handlePlaceOrder = () => {
//     setModalMessage("Order Placed Succesfully!");
//     setIsModalOpen(true);
//             // navigate("/home");
//   };

//   return (
//     <>
//       <Navbar />
//       <Box sx={{ flexGrow: 1, padding: 3 }}>
//         <Grid container spacing={5} justifyContent="center">
//           {cartState.length > 0 ? (
//             <Grid item xs={12}>
//               <TableContainer
//                 component={Paper}
//                 elevation={3}
//                 sx={{
//                   borderRadius: "12px",
//                   overflowX: "auto",
//                   maxWidth: "90%",
//                   margin: "auto",
//                 }}
//               >
//                 <Table aria-label="cart table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell style={tableHeaderStyle}>
//                         Product Image{" "}
//                       </TableCell>
//                       <TableCell style={tableHeaderStyle}>Brand</TableCell>
//                       <TableCell style={tableHeaderStyle}>
//                         Product Type
//                       </TableCell>
//                       <TableCell style={tableHeaderStyle}>Price</TableCell>
//                       <TableCell style={tableHeaderStyle}>Quantity</TableCell>
//                       <TableCell style={tableHeaderStyle}>
//                         Total Price
//                       </TableCell>
//                       <TableCell style={tableHeaderStyle}>
//                         Remove from cart
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {cartState.map((product) => (
//                       <TableRow key={product.product_id} hover>
//                         <TableCell style={tableCellStyle}>
//                           <img
//                             src={`data:image/jpeg;base64,${product.image}`}
//                             alt={product.product_type}
//                             style={{
//                               width: "80px",
//                               height: "auto",
//                               borderRadius: "8px",
//                             }}
//                           />
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           {product.brand}
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           {product.product_type}
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           ₹{product.price.toFixed(2)}
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           <IconButton
//                             aria-label="remove"
//                             onClick={() =>
//                               handleQuantityChange(
//                                 product.product_id,
//                                 product.quantity - 1
//                               )
//                             }
//                           >
//                             <Remove />
//                           </IconButton>
//                           {product.quantity}
//                           <IconButton
//                             aria-label="add"
//                             onClick={() =>
//                               handleQuantityChange(
//                                 product.product_id,
//                                 product.quantity + 1
//                               )
//                             }
//                           >
//                             <Add />
//                           </IconButton>
//                         </TableCell>

//                         <TableCell style={tableCellStyle}>
//                           <Typography
//                             variant="body1"
//                             style={{

//                               marginLeft: "8px",
//                             }}
//                           >
//                             ₹{(product.price * product.quantity).toFixed(2)}
//                           </Typography>
//                         </TableCell>
//                         <TableCell style={tableCellStyle}>
//                           <Button variant="contained" startIcon={<Delete />} style={{ fontSize: "10px" }}
//                             onClick={() => handleRemoveFromCart(product.product_id)}
//                           >
//                             Remove
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                     <TableRow>
//                       <TableCell></TableCell>
//                       <TableCell></TableCell>
//                       <TableCell></TableCell>
//                       <TableCell></TableCell>
//                       <TableCell>Bill Amount </TableCell>
//                       <TableCell>
//                         {Total !== undefined && `₹${Total.toFixed(2)}`}
//                       </TableCell>

//                       <TableCell>
//                         <Button variant="contained" style={{ backgroundColor: "#724c31" }}  onClick={handlePlaceOrder} >
//                           Check out
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Grid>
//           ) : (
//             <Typography variant="body1">Your cart is empty.</Typography>
//           )}
//         </Grid>
//       </Box>
//       <Modal
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
//               Success!
//             </Typography>
//             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//               {modalMessage}
//             </Typography>
//             <Button
//               variant="contained"
//               style={{ marginTop: "20px" }}
//               onClick={() => setIsModalOpen(false)}
//             >
//               Close
//             </Button>
//           </Box>
//         </Modal>

//       <Dialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Confirm Order"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure you want to place your order?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button
//             onClick={() => {
//               handlePlaceOrder();
//               setOpenDialog(false);
//             }}
//             autoFocus
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default CartPage;

import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import Navbar from "../Navbar";
import CloseIcon from "@mui/icons-material/Close";

import { Delete, Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Assuming Product interface is defined elsewhere
interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  image: string[];
  quantity: number;
}

const CartPage = () => {
  const [cartState, setCartState] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [Total, setTotal] = useState<Number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [messageModalMessage, setMessageModalMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const c_id = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{
          cart: { [key: string]: Product };
          total_amount: number;
        }>("http://127.0.0.1:8000/cart_view/" + c_id);
        if (
          response.data &&
          response.data.cart &&
          typeof response.data.cart === "object"
        ) {
          setCartState(Object.values(response.data.cart));
          setTotal(response.data.total_amount);
          console.log(setTotal); // Log the value of setTotal here
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const tableHeaderStyle: React.CSSProperties = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#724c31",
    color: "white",
  };

  const tableCellStyle: React.CSSProperties = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  const imageStyle: React.CSSProperties = {
    width: "80px",
    height: "auto",
    borderRadius: "8px",
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/cart_remove/${c_id}/${productId}`
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

  const handleQuantityChange = async (
    productId: number,
    newQuantity: number
  ) => {
    newQuantity = Math.max(newQuantity, 1);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/cart/update/${c_id}/${productId}/${newQuantity}`
      );
      if (response.status === 200) {
        // window.alert("quantity updated successfully");
        window.location.reload();
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handlePlaceOrder = () => {
    setModalMessage("Order Placed Succesfully!");
    setIsModalOpen(true);
    // navigate("/home");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={5} justifyContent="center">
          {cartState.length > 0 ? (
            <Grid item xs={12}>
              <TableContainer
                component={Paper}
                elevation={3}
                sx={{
                  borderRadius: "12px",
                  overflowX: "auto",
                  maxWidth: "90%",
                  margin: "auto",
                }}
              >
                <Table aria-label="cart table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={tableHeaderStyle}>
                        Product Image{" "}
                      </TableCell>
                      <TableCell style={tableHeaderStyle}>Brand</TableCell>
                      <TableCell style={tableHeaderStyle}>
                        Product Type
                      </TableCell>
                      <TableCell style={tableHeaderStyle}>Price</TableCell>
                      <TableCell style={tableHeaderStyle}>Quantity</TableCell>
                      <TableCell style={tableHeaderStyle}>
                        Total Price
                      </TableCell>
                      <TableCell style={tableHeaderStyle}>
                        Remove from cart
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartState.map((product) => (
                      <TableRow key={product.product_id} hover>
                        <TableCell style={tableCellStyle}>
                          <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.product_type}
                            onClick={() => handleImageClick(product)}
                            style={{
                              width: "80px",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                          {product.brand}
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                          {product.product_type}
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                          ₹{product.price.toFixed(2)}
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                          <IconButton
                            aria-label="remove"
                            onClick={() =>
                              handleQuantityChange(
                                product.product_id,
                                product.quantity - 1
                              )
                            }
                          >
                            <Remove />
                          </IconButton>
                          {product.quantity}
                          <IconButton
                            aria-label="add"
                            onClick={() =>
                              handleQuantityChange(
                                product.product_id,
                                product.quantity + 1
                              )
                            }
                          >
                            <Add />
                          </IconButton>
                        </TableCell>

                        <TableCell style={tableCellStyle}>
                          <Typography
                            variant="body1"
                            style={{
                              marginLeft: "8px",
                            }}
                          >
                            ₹{(product.price * product.quantity).toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                          <Button
                            variant="contained"
                            startIcon={<Delete />}
                            style={{ fontSize: "10px" }}
                            onClick={() =>
                              handleRemoveFromCart(product.product_id)
                            }
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>Bill Amount </TableCell>
                      <TableCell>
                        {Total !== undefined && `₹${Total.toFixed(2)}`}
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#724c31" }}
                          onClick={handlePlaceOrder}
                        >
                          Check out
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ) : (
            <Typography variant="body1">Your cart is empty.</Typography>
          )}
        </Grid>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Success!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
          <Button
            variant="contained"
            style={{ marginTop: "20px" }}
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Order"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to place your order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handlePlaceOrder();
              setOpenDialog(false);
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Modal
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
      </Modal> */}

<Modal
  open={isProductModalOpen}
  onClose={() => setIsProductModalOpen(false)}
  aria-labelledby="product-modal-title"
  aria-describedby="product-modal-description"
>
  <Box
    sx={{
      display: "flex",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 600, // Adjust the width as per your requirement
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: 2,
      outline: "none",
      border: "1px solid rgba(0, 0, 0, 0.12)",
    }}
  >
    <Box sx={{ flex: 1 }}>
      {selectedProduct && (
        <img
          src={`data:image/jpeg;base64,${selectedProduct.image}`}
          alt={selectedProduct.product_type}
          style={{
            width: "100%",
            height: "auto",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
        />
      )}
    </Box>
    <Box sx={{ flex: 1, p: 3 }}>
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
      <Typography
        id="product-modal-title"
        variant="h6"
        component="h2"
        sx={{ fontWeight: "medium", mb: 2 }}
      >
        Product Details
      </Typography>
      {selectedProduct && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "regular" }}>
            Brand: {selectedProduct.brand}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "regular" }}>
            Price: ₹{selectedProduct.price.toFixed(2)}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "regular" }}>
            Product Type: {selectedProduct.product_type}
          </Typography>
        </>
      )}
      {/* <Button
        variant="contained"
        sx={{
          marginTop: "20px",
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
          color: "white",
          padding: "8px 16px",
          textTransform: "none",
        }}
        onClick={() => setIsProductModalOpen(false)}
      >
        Close
      </Button> */}
    </Box>
  </Box>
</Modal>



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
    </>
  );
};

export default CartPage;
