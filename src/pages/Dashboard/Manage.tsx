import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardN from "../../Components/DashboardNavbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfessionalForm from "../../Components/form";
import EditForm from "../../Components/edit";
import { Button, Grid, TextField } from "@mui/material";

interface Product {
  photo: any;
  product_id: number;
  image: string;
  title: string;
  size: string;
  brand: string;
  material: string;
  color: string;
  product_type: string;
  description: string;
  complete_the_look: string;
  specification: string;
  price: number;
  category: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [modalHeight, setModalHeight] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isProductListModalOpen, setIsProductListModalOpen] = useState(false);
  const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = React.useState<Partial<Product>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const a = 2;
        const response = await axios.get<{ [key: string]: Product }>(
          `${process.env.REACT_APP_FAST_API}view/` + a
        );
        if (response.data && typeof response.data === "object") {
          setProducts(response.data);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, []);

  const handleDelete = async (productId: string) => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/remove/2/${productId}`
    );
    if (response.status === 200) {
      const updatedProducts = { ...products };
      delete updatedProducts[productId];
      setProducts(updatedProducts);
      setIsConfirmOpen(false);
      toast.success("Product deleted successfully");
    } else {
      toast.error("Failed to delete product");
    }
  };

  const openConfirmDialog = (productId: string) => {
    setDeleteProductId(productId);
    setIsConfirmOpen(true);
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setDeleteProductId(null);
  };

  const confirmDelete = () => {
    if (deleteProductId) {
      handleDelete(deleteProductId);
    }
  };

  const handleImageClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    const contentHeight =
      document.getElementById("modal-content")?.clientHeight;
    setModalHeight(contentHeight || null);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditListModalOpen(true);

    const contentHeight =
      document.getElementById("modal-content")?.clientHeight;
    setModalHeight(contentHeight || null);
  };

  const handleAddClick = (product: Product) => {
    setSelectedProduct(product);
    setIsAddOpen(true);

    const contentHeight =
      document.getElementById("modal-content")?.clientHeight;
    setModalHeight(contentHeight || null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsProductListModalOpen(false);
    setIsEditListModalOpen(false);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
  };

  // const customCategorySort = (a: string, b: string) => {
  //   const order = ["men", "women", "girls", "boys"];
  //   return order.indexOf(a.toLowerCase()) - order.indexOf(b.toLowerCase());
  // };

  const handleEdit = (productId: string) => {
    console.log("Edit product:", productId);
  };

  const fetchProductList = async () => {
    try {
      const response = await axios.get<Product[]>(
        `${process.env.REACT_APP_FAST_API}to_add`
      );
      setProductList(response.data);
    } catch (error) {
      console.error("Failed to fetch product list:", error);
    }
  };

  const handleProductClick = (productDetails: any) => {
    setSelectedProduct(productDetails);
    fetchProductDetails(productDetails);
  };

  const fetchProductDetails = async (productDetails: any) => {
    if (productDetails) {
      try {
        const a = 2;

        await axios.put(
          `${process.env.REACT_APP_FAST_API}add/${a}/${productDetails.product_id}`,
          productDetails
        );

        setSelectedProduct(null);
      } catch (error) {
        console.error("Failed to add product:", error);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Check file size (1MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          image: "File size should be less than 1MB",
        }));
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/heic",
        "image/avif",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          image: "Only JPG, HEIC, and AVIF file types are allowed",
        }));
        return;
      }

      setSelectedFile(file);
      // Set the selected file as the source of the avatar image
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          //   setAvatarImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   field: keyof Product
  // ) => {
  //   const { value } = e.target;
  //   if (selectedProduct !== null) {
  //     setSelectedProduct((prevProduct) => ({
  //       ...(prevProduct || {}),
  //       [field]: value,
  //     }));
  //   }
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProducts((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <DashboardN />
      <div>
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => {
              setIsProductListModalOpen(true);
              // fetchProductList();
            }}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#724c31",
              color: "white",
              border: "none",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ marginRight: "8px", display: "inline-block" }}>
              +
            </span>
            Add Product
          </button>
        </div>

        <div className="container" style={{ textAlign: "center" }}>
          <div
            className="table-container"
            style={{
              margin: "0 auto",
              width: "80%",
              overflowX: "auto",
              borderRadius: "10px",
              border: "1px solid #ddd",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <table
              className="product-table"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderRadius: "10px",
              }}
            >
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Image</th>
                  <th style={tableHeaderStyle}>Brand</th>
                  <th style={tableHeaderStyle}>Product Type</th>
                  <th style={tableHeaderStyle}>Color</th>
                  <th style={tableHeaderStyle}>Category</th>
                  <th style={tableHeaderStyle}>Size</th>
                  <th style={tableHeaderStyle}>Price</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(products).map(([productId, product]) => (
                  <tr
                    key={productId}
                    style={{
                      cursor: "pointer",
                    }}
                    // onClick={() => handleImageClick(product)}
                  >
                    <td style={tableCellStyle}>
                      <img
                        src={`data:image/jpeg;base64,${product.image}`}
                        alt="Product"
                        style={{
                          width: "50px",
                          height: "50px",
                          cursor: "pointer",
                          borderRadius: "5px",
                        }}
                      />
                    </td>
                    <td style={tableCellStyle}>
                      <button
                        // onClick={() => handleImageClick(product)}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                      >
                        {product.brand}
                      </button>
                    </td>

                    <td style={tableCellStyle}>{product.product_type}</td>
                    <td style={tableCellStyle}>{product.color}</td>
                    <td style={tableCellStyle}>{product.category}</td>
                    <td style={tableCellStyle}>{product.size}</td>
                    <td style={tableCellStyle}>₹{product.price}</td>
                    <td style={tableCellStyle}>
                      <FaEdit
                        onClick={() => handleEditClick(product)}
                        // onClick={()=> {setIsEditListModalOpen(true)

                        style={{ cursor: "pointer", marginRight: "5px" }}
                      />

                      <FaTrash
                        onClick={(e) => {
                          e.stopPropagation();
                          openConfirmDialog(productId);
                        }}
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <div
              className="modal"
              style={{
                marginTop: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                zIndex: 1,
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              <div
                className="modal-content"
                id="modal-content"
                style={{
                  display: "flex",
                  backgroundColor: "#fefefe",
                  padding: "20px",
                  border: "1px solid #888",
                  height: "80%",
                  width: "60%",
                  maxHeight: "80%",
                  overflowY: "auto",
                  borderRadius: "10px",
                  position: "relative",
                }}
              >
                <span
                  className="close"
                  style={{
                    color: "#aaa",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "28px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={closeModal}
                >
                  &times;
                </span>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: "1" }}>
                    <img
                      src={`data:image/jpeg;base64,${selectedProduct?.image}`}
                      alt="Product"
                      style={{
                        width: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      flex: "1",
                      paddingLeft: "20px",
                      textAlign: "left",
                    }}
                  >
                    <h2>{selectedProduct?.title}</h2>

                    <p>
                      <strong>Size:</strong> {selectedProduct?.size}
                    </p>
                    <p>
                      <strong>Price:</strong>{" "}
                      <span
                        style={{
                          color: selectedProduct ? "red" : "inherit",
                          fontWeight: selectedProduct ? "bold" : "normal",
                        }}
                      >
                        ₹{selectedProduct?.price}
                      </span>
                    </p>
                    <p>
                      <strong>Category:</strong> {selectedProduct?.category}
                    </p>

                    <p>
                      <strong>Brand:</strong> {selectedProduct?.brand}
                    </p>
                    <p>
                      <strong>Material:</strong> {selectedProduct?.material}
                    </p>
                    <p>
                      <strong>Color:</strong> {selectedProduct?.color}
                    </p>

                    <p>
                      <strong>Product Type:</strong>{" "}
                      {selectedProduct?.product_type}
                    </p>
                    <p>
                      <strong>Specification:</strong>{" "}
                      {selectedProduct?.specification}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedProduct?.description}
                    </p>
                    <p>
                      <strong>Complete the Look:</strong>{" "}
                      {selectedProduct?.complete_the_look}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isEditListModalOpen && (
          <div
            className="modal"
            style={{
              marginTop: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              zIndex: 1,
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="modal-content"
              id="modal-content"
              style={{
                display: "flex",
                backgroundColor: "#fefefe",
                padding: "20px",
                border: "1px solid #888",
                height: "80%",
                width: "60%",
                maxHeight: "80%",
                overflowY: "auto",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              <span
                className="close"
                style={{
                  color: "#aaa",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "28px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={closeModal}
              >
                &times;
              </span>
              <div style={{ display: "flex" }}>
                <Grid container spacing={2}>
                  <div style={{ flex: "1" }}>
                    <img
                      src={`data:image/jpeg;base64,${selectedProduct?.image}`}
                      alt="Product"
                      style={{
                        width: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <Grid item xs={6}>
                    <TextField
                      label="Title"
                      variant="outlined"
                      fullWidth
                      name="title"
                      value={selectedProduct?.title}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Size"
                      variant="outlined"
                      fullWidth
                      name="size"
                      value={selectedProduct?.size || ""}
                      // onChange={(e) => handleInputChange(e, "size")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Brand"
                      variant="outlined"
                      fullWidth
                      name="brand"
                      value={selectedProduct?.brand || ""}
                      // onChange={(e) => handleInputChange(e, "brand")}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Material"
                      variant="outlined"
                      fullWidth
                      name="material"
                      value={selectedProduct?.material || ""}
                      // onChange={(e) => handleInputChange(e, "material")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Color"
                      variant="outlined"
                      fullWidth
                      name="color"
                      value={selectedProduct?.color || ""}
                      // onChange={(e) => handleInputChange(e, "color")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Product type"
                      variant="outlined"
                      fullWidth
                      name="product_type"
                      value={selectedProduct?.product_type || ""}
                      // onChange={(e) => handleInputChange(e, "product_type")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      variant="outlined"
                      fullWidth
                      name="description"
                      value={selectedProduct?.description || ""}
                      // onChange={(e) => handleInputChange(e, "description")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Complete the Look"
                      variant="outlined"
                      fullWidth
                      name="complete_the_look"
                      value={selectedProduct?.complete_the_look || ""}
                      // onChange={(e) =>
                      //   handleInputChange(e, "complete_the_look")
                      // }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Specification"
                      variant="outlined"
                      fullWidth
                      name="specification"
                      value={selectedProduct?.specification || ""}
                      // onChange={(e) => handleInputChange(e, "specification")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Price"
                      variant="outlined"
                      fullWidth
                      name="price"
                      type="text"
                      value={selectedProduct?.price || ""}
                      // onChange={(e) => handleInputChange(e, "price")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Category"
                      variant="outlined"
                      fullWidth
                      name="category"
                      value={selectedProduct?.category || ""}
                      // onChange={(e) => handleInputChange(e, "category")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <input type="file" onChange={handleFileChange} />
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        )}

        {/* {isEditListModalOpen && (
          <div
            className="modal"
            style={{
              marginTop: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              zIndex: 1,
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="modal-content"
              id="modal-content"
              style={{
                display: "flex",
                backgroundColor: "#fefefe",
                padding: "20px",
                border: "1px solid #888",
                height: "80%",
                width: "60%",
                maxHeight: "80%",
                overflowY: "auto",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              <span
                className="close"
                style={{
                  color: "#aaa",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "28px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={closeModal}
              >
                &times;
              </span>
              <div style={{ display: "flex" }}>
                <Grid container spacing={2}>
                  <div style={{ flex: "1" }}>
                    <img
                      src={`data:image/jpeg;base64,${selectedProduct?.image}`}
                      alt="Product"
                      style={{
                        width: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <Grid item xs={6}>
                    <TextField
                      label="Title"
                      variant="outlined"
                      fullWidth
                      name="title"
                      value={selectedProduct?.title || ""}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Size"
                      variant="outlined"
                      fullWidth
                      name="size"
                      value={selectedProduct?.size || ""}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Brand"
                      variant="outlined"
                      fullWidth
                      name="brand"
                      value={selectedProduct?.brand || ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Material"
                      variant="outlined"
                      fullWidth
                      name="material"
                      value={selectedProduct?.material || ""}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Color"
                      variant="outlined"
                      fullWidth
                      name="color"
                      value={selectedProduct?.color || ""}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Product type"
                      variant="outlined"
                      fullWidth
                      name="product_type"
                      value={selectedProduct?.product_type || ""}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      variant="outlined"
                      fullWidth
                      name="description"
                      value={selectedProduct?.description || ""}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Complete the Look"
                      variant="outlined"
                      fullWidth
                      name="complete_the_look"
                      value={selectedProduct?.complete_the_look || ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Specification"
                      variant="outlined"
                      fullWidth
                      name="specification"
                      value={selectedProduct?.specification || ""}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Price"
                      variant="outlined"
                      fullWidth
                      name="price"
                      type="text"
                      value={selectedProduct?.price || ""}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Category"
                      variant="outlined"
                      fullWidth
                      name="category"
                      value={selectedProduct?.category || ""}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <input type="file" onChange={handleFileChange} />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        )} */}

        {isConfirmOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>Are you sure you want to delete this product?</p>
              <div style={{ marginTop: "20px" }}>
                <button onClick={confirmDelete} style={{ marginRight: "10px" }}>
                  Yes
                </button>
                <button onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}

        {isProductListModalOpen && (
          <div
            className="modal"
            style={{
              marginTop: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              zIndex: 1,
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="modal-content"
              id="modal-content"
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fefefe",
                padding: "20px",
                border: "1px solid #888",
                height: "80%",
                width: "60%",
                maxHeight: "80%",
                overflowY: "auto",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              <span
                className="close"
                style={{
                  color: "#aaa",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "28px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={closeModal}
              >
                &times;
              </span>

              <ProfessionalForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ConfirmationDialog: React.FC<{
  onClose: () => void;
  onConfirm: () => void;
}> = ({ onClose, onConfirm }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p>Are you sure you want to delete this product?</p>
      <button onClick={onConfirm} style={{ marginRight: "10px" }}>
        Confirm
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  </div>
);

export default ProductTable;

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
