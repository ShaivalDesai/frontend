import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardN from "../../Components/DashboardNavbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfessionalForm from "../../Components/form";

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
  const [productList, setProductList] = useState<Product[]>([]);

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
      setIsConfirmOpen(false); // Close confirmation dialog
      toast.success("Product deleted successfully"); // Display success message
    } else {
      toast.error("Failed to delete product"); // Display error message
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
    // Calculate height dynamically based on content
    const contentHeight =
      document.getElementById("modal-content")?.clientHeight;
    setModalHeight(contentHeight || null); // Use null if contentHeight is undefined
  };

  const handleAddClick = (product: Product) => {
    setSelectedProduct(product);
    setIsAddOpen(true);
    // Calculate height dynamically based on content
    const contentHeight =
      document.getElementById("modal-content")?.clientHeight;
    setModalHeight(contentHeight || null); // Use null if contentHeight is undefined
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsProductListModalOpen(false);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
  };

  const customCategorySort = (a: string, b: string) => {
    const order = ["men", "women", "girls", "boys"];
    return order.indexOf(a.toLowerCase()) - order.indexOf(b.toLowerCase());
  };

  const handleEdit = (productId: string) => {
    // Handle edit action here
    console.log("Edit product:", productId);
  };






  const fetchProductList = async () => {
    try {
      const response = await axios.get<Product[]>(
        `${process.env.REACT_APP_FAST_API}to_add`
      ); // Update the endpoint as needed
      setProductList(response.data);
    } catch (error) {
      console.error("Failed to fetch product list:", error);
    }
  };

  const handleProductClick = (productDetails: any) => {
    setSelectedProduct(productDetails); // Assuming you want to use the entire product object
    fetchProductDetails(productDetails);
  };

  const fetchProductDetails = async (productDetails: any) => {
    if (productDetails) {
      try {
        const a = 2;
        // Use productDetails directly in your API call
        await axios.put(
          `${process.env.REACT_APP_FAST_API}add/${a}/${productDetails.product_id}`,
          productDetails
        );
        // Additional logic to handle response or refresh the product list
        setSelectedProduct(null);
      } catch (error) {
        console.error("Failed to add product:", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <DashboardN />

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
            fetchProductList(); // Fetch products when opening the modal
          }}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#724c31", // A shade of brown
            color: "white", // White text color for better contrast
            border: "none", // Remove default border
            borderRadius: "10px", // Smoothed corners
            display: "inline-flex", // Use flex to align icon and text
            alignItems: "center", // Center items vertically
            justifyContent: "center", // Center items horizontally
          }}
        >
          <span style={{ marginRight: "8px", display: "inline-block" }}>+</span>
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
              {Object.entries(products)
                .sort(([, a], [, b]) =>
                  customCategorySort(a.category, b.category)
                )
                .map(([productId, product]) => (
                  <tr
                    key={productId}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageClick(product)}
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
                    <td style={tableCellStyle}>{product.brand}</td>
                    <td style={tableCellStyle}>{product.product_type}</td>
                    <td style={tableCellStyle}>{product.color}</td>
                    <td style={tableCellStyle}>{product.category}</td>
                    <td style={tableCellStyle}>{product.size}</td>
                    <td style={tableCellStyle}>₹{product.price}</td>
                    <td style={tableCellStyle}>
                      <FaEdit
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(productId);
                        }}
                        style={{ cursor: "pointer", marginRight: "5px" }}
                      />

                      <FaTrash
                        onClick={(e) => {
                          e.stopPropagation();
                          openConfirmDialog(productId); // Call openConfirmDialog instead of handleDelete
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
                height: "80%", // Decreased overall height
                width: "60%", // Adjusted width
                maxHeight: "80%", // Set maximum height
                overflowY: "auto",
                borderRadius: "10px",
                position: "relative", // Added position relative to the modal content
              }}
            >
              <span
                className="close"
                style={{
                  color: "#aaa",
                  position: "absolute", // Set position to absolute
                  top: "10px", // Adjust top position
                  right: "10px", // Adjust right position
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
                    }} // Adjusted image size
                  />
                </div>
                <div
                  style={{ flex: "1", paddingLeft: "20px", textAlign: "left" }}
                >
                  <h2>{selectedProduct?.title}</h2>

                  <p>
                    <strong>Size:</strong> {selectedProduct?.size}
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
                    <strong>Description:</strong> {selectedProduct?.description}
                  </p>
                  <p>
                    <strong>Complete the Look:</strong>{" "}
                    {selectedProduct?.complete_the_look}
                  </p>
                  <p>
                    <strong>Specification:</strong>{" "}
                    {selectedProduct?.specification}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{selectedProduct?.price}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedProduct?.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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

      {/* {isProductListModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
              border: "1px solid #ddd", // Outer border
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Shadow for depth
              maxHeight: "90%",
              overflowY: "auto",
            }}
          >
            <h2>Select a Product</h2>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderRadius: "8px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <th style={tableHeaderStyle}>Image</th>
                  <th style={tableHeaderStyle}>Brand</th>
                  <th style={tableHeaderStyle}>Product Type</th>
                  <th style={tableHeaderStyle}>Price</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(productList).map(
                  ([productId, productDetails]) => (
                    <tr
                      key={productId}
                      style={{ borderBottom: "1px solid #ddd" }}
                      onClick={() => handleAddClick(productDetails)}
                    >
                      <td style={{ ...tableCellStyle, padding: "10px" }}>
                        <img
                          src={`data:image/jpeg;base64,${productDetails.photo}`}
                          alt="Product"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "5px",
                          }}
                        />
                      </td>
                      <td style={{ ...tableCellStyle, padding: "10px" }}>
                        {productDetails.brand}
                      </td>
                      <td style={{ ...tableCellStyle, padding: "10px" }}>
                        {productDetails.product_type}
                      </td>
                      <td style={{ ...tableCellStyle, padding: "10px" }}>
                        ₹{productDetails.price}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {isAddOpen && (
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
                  height: "80%",
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
                    height: "80%", // Decreased overall height
                    width: "60%", // Adjusted width
                    maxHeight: "80%", // Set maximum height
                    overflowY: "auto",
                    borderRadius: "10px",
                    position: "relative", // Added position relative to the modal content
                  }}
                >
                  <span
                    className="close"
                    style={{
                      color: "#aaa",
                      position: "absolute", // Set position to absolute
                      top: "10px", // Adjust top position
                      right: "10px", // Adjust right position
                      fontSize: "28px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={closeAddModal}
                  >
                    &times;
                  </span>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "1" }}>
                      <img
                        src={`data:image/jpeg;base64,${selectedProduct?.photo}`}
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
                        <strong>Brand:</strong> {selectedProduct?.brand}
                      </p>
                      <p>
                        <strong>Material:</strong> {selectedProduct?.material}
                      </p>

                      <p>
                        <strong>Product Type:</strong>{" "}
                        {selectedProduct?.product_type}
                      </p>

                      <p>
                        <strong>Price:</strong> ₹{selectedProduct?.price}
                      </p>
                      <p>
                        <strong>Category:</strong> {selectedProduct?.category}
                      </p>
                      {Object.entries(productList).map(
                        ([productId, productDetails]) => (
                          <button
                            onClick={() => handleProductClick(productDetails)}
                          >
                            Add product
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setIsProductListModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )} */}

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
        flexDirection: "column", // Added to arrange elements vertically
        backgroundColor: "#fefefe",
        padding: "20px",
        border: "1px solid #888",
        height: "80%", // Decreased overall height
        width: "60%", // Adjusted width
        maxHeight: "80%", // Set maximum height
        overflowY: "auto",
        borderRadius: "10px",
        position: "relative", // Added position relative to the modal content
      }}
    >
      <span
        className="close"
        style={{
          color: "#aaa",
          position: "absolute", // Set position to absolute
          top: "10px", // Adjust top position
          right: "10px", // Adjust right position
          fontSize: "28px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={closeModal}
      >
        &times;
      </span>
      {/* Title added */}
      <ProfessionalForm />
    </div>
  </div>
)}


      {/* 
{isProductListModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsProductListModalOpen(false)}>
              &times;
            </span>
            <ProfessionalForm />
          </div>
        </div>
      )} */}
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
