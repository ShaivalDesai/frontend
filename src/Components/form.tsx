import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";

interface FormValues {
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

const ProfessionalForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    image: "",
    title: "",
    size: "",
    brand: "",
    material: "",
    color: "",
    product_type: "",
    description: "",
    complete_the_look: "",
    specification: "",
    price: 0,
    category: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", selectedFile as Blob);
      formData.append("size", formValues.size);
      formData.append("brand", formValues.brand);
      formData.append("material", formValues.material);
      formData.append("title", formValues.title);
      formData.append("color", formValues.color);
      formData.append("product_type", formValues.product_type);
      formData.append("description", formValues.description);
      formData.append("complete_the_look", formValues.complete_the_look);
      formData.append("specification", formValues.specification);
      formData.append("price", formValues.price.toString());
      formData.append("category", formValues.category);

      const response = await axios.post(
        `${process.env.REACT_APP_FAST_API}add_product/?size=${formValues.size}&brand=${formValues.brand}&material=${formValues.material}&title=${formValues.title}&color=${formValues.color}&product_type=${formValues.product_type}&description=${formValues.description}&complete_the_look=${formValues.complete_the_look}&specification=${formValues.specification}&price=${formValues.price}&category=${formValues.category}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data submitted successfully:", response.data);
      // Clear form values after successful submission
      setFormValues({
        image: "",
        title: "",
        size: "",
        brand: "",
        material: "",
        color: "",
        product_type: "",
        description: "",
        complete_the_look: "",
        specification: "",
        price: 0,
        category: "",
      });
      setSelectedFile(null);
      // Close the modal or perform other actions as needed
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle errors if the POST request fails
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Check file size (1MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        // toast.error("File size should be less than 1MB");
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/heic",
        "image/avif",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        // toast.error("Only JPG, HEIC, and AVIF file types are allowed");
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

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      {/* <h2 style={{ marginBottom: "20px" }}>Add Product</h2> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              value={formValues.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Size"
              variant="outlined"
              fullWidth
              name="size"
              value={formValues.size}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Brand"
              variant="outlined"
              fullWidth
              name="brand"
              value={formValues.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Material"
              variant="outlined"
              fullWidth
              name="material"
              value={formValues.material}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Color"
              variant="outlined"
              fullWidth
              name="color"
              value={formValues.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Product type"
              variant="outlined"
              fullWidth
              name="product_type"
              value={formValues.product_type}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              value={formValues.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Complete the Look"
              variant="outlined"
              fullWidth
              name="complete_the_look"
              value={formValues.complete_the_look}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Specification"
              variant="outlined"
              fullWidth
              name="specification"
              value={formValues.specification}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              name="category"
              value={formValues.category}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <input type="file" onChange={handleFileChange} />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ProfessionalForm;
