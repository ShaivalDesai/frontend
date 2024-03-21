import React, { useState } from "react";
import Navbar from "./Navbar";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
    <Navbar/>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ width: "175px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ width: "90%" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ width: "90%" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            style={{ width: "90%" }}
          />
        </div>
        <button type="submit" style={{ width: "100%" }}>
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default ContactUsPage;

