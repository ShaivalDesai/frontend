import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import {
  validateTitle,
  validateSize,
  validateBrand,
  validateMaterial,
  validateColor,
  validateProduct_type,
  validatePrice,
  validateDes,
  validatelook,
  validateSpecification,
  validateCategory,
} from "../validation";

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
  price: string;
  category: string;
}

const EditForm: React.FC = () => {
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
    price: "",
    category: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = React.useState<Partial<FormValues>>({});




  useEffect(() => {
    const fetchData = async (productId: number) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/view/${productId}`);
        const data = response.data(); 
        setFormValues({
          image: data.image,
          title: data.title,
          size: data.size,
          brand: data.brand,
          material: data.material,
          color: data.color,
          product_type: data.product_type,
          description: data.description,
          complete_the_look: data.complete_the_look,
          specification: data.specification,
          price: data.price.toString(),
          category: data.category,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    
    fetchData(1); // Fetch data for product with ID 1
  }, []);
  



  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const validationErrors: Partial<FormValues> = {};

//     validationErrors.title = validateTitle(formValues.title);
//     validationErrors.size = validateSize(formValues.size);
//     validationErrors.brand = validateBrand(formValues.brand);
//     validationErrors.material = validateMaterial(formValues.material);
//     validationErrors.color = validateColor(formValues.color);
//     validationErrors.product_type = validateProduct_type(
//       formValues.product_type
//     );
//     validationErrors.description = validateDes(formValues.description);
//     validationErrors.complete_the_look = validatelook(
//       formValues.complete_the_look
//     );
//     validationErrors.specification = validateSpecification(
//       formValues.specification
//     );
//     validationErrors.price = validatePrice(formValues.price);
//     validationErrors.category = validateCategory(formValues.category);

//     if (!selectedFile) {
//       validationErrors.image = "Please select an image file";
//     }

//     setErrors(validationErrors);

//     try {
//       const formData = new FormData();
//       formData.append("image", selectedFile as Blob);
//       formData.append("size", formValues.size);
//       formData.append("brand", formValues.brand);
//       formData.append("material", formValues.material);
//       formData.append("title", formValues.title);
//       formData.append("color", formValues.color);
//       formData.append("product_type", formValues.product_type);
//       formData.append("description", formValues.description);
//       formData.append("complete_the_look", formValues.complete_the_look);
//       formData.append("specification", formValues.specification);
//       formData.append("price", formValues.price.toString());
//       formData.append("category", formValues.category);

//       const response = await axios.get(
//         `http://127.0.0.1:8000/view/1`,
//         {
//         //   headers: {
//         //     "Content-Type": "multipart/form-data",
//         //   },
//         }
//       );
//       console.log("Data submitted successfully:", response.data);
//       // Clear form values after successful submission
//       setFormValues({
//         image: "",
//         title: "",
//         size: "",
//         brand: "",
//         material: "",
//         color: "",
//         product_type: "",
//         description: "",
//         complete_the_look: "",
//         specification: "",
//         price: "",
//         category: "",
//       });
//       setSelectedFile(null);
      
//     } catch (error) {
//       console.error("Error submitting data:", error);
   
//     }
//   };






const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: Partial<FormValues> = {};
  
    validationErrors.title = validateTitle(formValues.title);
    validationErrors.size = validateSize(formValues.size);
    validationErrors.brand = validateBrand(formValues.brand);
    validationErrors.material = validateMaterial(formValues.material);
    validationErrors.color = validateColor(formValues.color);
    validationErrors.product_type = validateProduct_type(
      formValues.product_type
    );
    validationErrors.description = validateDes(formValues.description);
    validationErrors.complete_the_look = validatelook(
      formValues.complete_the_look
    );
    validationErrors.specification = validateSpecification(
      formValues.specification
    );
    validationErrors.price = validatePrice(formValues.price);
    validationErrors.category = validateCategory(formValues.category);
  
    if (!selectedFile) {
      validationErrors.image = "Please select an image file";
    }
  
    // Check if there are any validation errors
    if (Object.values(validationErrors).some(error => !!error)) {
      setErrors(validationErrors);
      return; // Exit function if there are validation errors
    }
  
    // If no validation errors, proceed with form submission
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
  
      const response = await axios.get(`http://127.0.0.1:8000/view/1`);
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
        price: "",
        category: "",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Check file size (1MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        setErrors((prevErrors) => ({
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
        setErrors((prevErrors) => ({
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
            <div style={{ color: "red" }}>
              {errors.title && <span>{errors.title}</span>}
            </div>
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
            <div style={{ color: "red" }}>
              {errors.size && <span>{errors.size}</span>}
            </div>
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
            <div style={{ color: "red" }}>
              {errors.brand && <span>{errors.brand}</span>}
            </div>
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
            <div style={{ color: "red" }}>
              {errors.material && <span>{errors.material}</span>}
            </div>
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
            <div style={{ color: "red" }}>
              {errors.color && <span>{errors.color}</span>}
            </div>
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
            <div style={{ color: "red" }}>
              {errors.product_type && <span>{errors.product_type}</span>}
            </div>
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
            <div style={{ color: "red" }}>
              {errors.description && <span>{errors.description}</span>}
            </div>
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
            <div style={{ color: "red" }}>
              {errors.complete_the_look && (
                <span>{errors.complete_the_look}</span>
              )}
            </div>
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
            <div style={{ color: "red" }}>
              {errors.specification && <span>{errors.specification}</span>}
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              type="text"
              value={formValues.price}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>
              {errors.price && <span>{errors.price}</span>}
            </div>
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
            <div style={{ color: "red" }}>
              {errors.category && <span>{errors.category}</span>}
            </div>
          </Grid>

          <Grid item xs={12}>
            <input type="file" onChange={handleFileChange} />
            {errors.image && <span>{errors.image}</span>}
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditForm;
