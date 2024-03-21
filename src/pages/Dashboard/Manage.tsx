import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardN from "../../Components/DashboardNavbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Product {
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
  const [modalHeight, setModalHeight] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const a = 2;
        const response = await axios.get<{ [key: string]: Product }>(
          "http://127.0.0.1:8000/view/" + a
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const customCategorySort = (a: string, b: string) => {
    const order = ["men", "women", "girls", "boys"];
    return order.indexOf(a.toLowerCase()) - order.indexOf(b.toLowerCase());
  };

  const handleEdit = (productId: string) => {
    // Handle edit action here
    console.log("Edit product:", productId);
  };

  return (
    <>
    <ToastContainer />
      <DashboardN />
      <div
        className="container"
        style={{ textAlign: "center", marginTop: "100px" }}
      >
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
                width: "80%",
                maxHeight: modalHeight ? `${modalHeight}px` : undefined,
                overflowY: "auto",
              }}
            >
              <span
                className="close"
                style={{
                  color: "#aaa",
                  float: "right",
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
                    style={{ width: "100%", height: "auto" }}
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
