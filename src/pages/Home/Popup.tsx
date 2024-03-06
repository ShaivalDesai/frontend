import React, { useState } from "react";
import { Modal, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PopupOffer: React.FC = () => {
  const [open, setOpen] = useState(true); // Set initial state to open the modal

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={styles.popupContainer}>
        <button style={styles.closeButton} onClick={handleClose}>
          <CloseIcon style={styles.closeIcon} />
        </button>
        <Typography variant="h5" style={styles.popupHeading} gutterBottom>
          Special Offer!
        </Typography>
        <Typography variant="body1" style={styles.popupText} gutterBottom>
          Get 20% off on your first purchase.
        </Typography>
        {/* Add other content here */}
      </div>
    </Modal>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  popupContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    width: "300px", /* Adjust width as needed */
  },
  popupHeading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  popupText: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  closeIcon: {
    width: "24px",
    height: "24px",
    fill: "#333",
  },
};

export default PopupOffer;
