import React, { useState } from "react";
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
    price: "",
    category: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [fileError, setFileError] = useState("");

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
    setFileError(""); // Reset file error state each time the form is submitted

    // File selection validation
    if (!selectedFile) {
      setFileError("Please select a file.");
      return; // Stop the form submission if no file is selected
    }

    const validationErrors: Partial<FormValues> = {};

    // Your existing validations here...
    validationErrors.title = validateTitle(formValues.title);
    validationErrors.size = validateSize(formValues.size);
    validationErrors.brand = validateBrand(formValues.brand);
    validationErrors.material = validateMaterial(formValues.material);
    validationErrors.color = validateColor(formValues.color);
    validationErrors.product_type = validateProduct_type(formValues.product_type);
    validationErrors.description = validateDes(formValues.description);
    validationErrors.complete_the_look = validatelook(formValues.complete_the_look);
    validationErrors.specification = validateSpecification(formValues.specification);
    validationErrors.price = validatePrice(formValues.price);
    validationErrors.category = validateCategory(formValues.category);

    setErrors(validationErrors);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      // Append other form values here
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        `${process.env.REACT_APP_FAST_API}/add_product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data submitted successfully:", response.data);
      // Reset form and file after successful submission
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
      if (file.size > 1024 * 1024) {
        setFileError("File size should be less than 1MB");
        return;
      }

      const allowedTypes = ["image/jpeg", "image/heic", "image/avif", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setFileError("Only JPG, HEIC, AVIF, and PNG file types are allowed");
        return;
      }

      setSelectedFile(file);
      setFileError(""); // Reset file error if file is valid
    }
  };










// import React, { useState } from "react";
// import { Grid, TextField, Button } from "@mui/material";
// import axios from "axios";
// import {
//   validateTitle,
//   validateSize,
//   validateBrand,
//   validateMaterial,
//   validateColor,
//   validateProduct_type,
//   validatePrice,
//   validateDes,
//   validatelook,
//   validateSpecification,
//   validateCategory,
// } from "../validation";

// interface FormValues {
//   image: string;
//   title: string;
//   size: string;
//   brand: string;
//   material: string;
//   color: string;
//   product_type: string;
//   description: string;
//   complete_the_look: string;
//   specification: string;
//   price: string;
//   category: string;
// }

// const ProfessionalForm: React.FC = () => {
//   const [formValues, setFormValues] = useState<FormValues>({
//     image: "",
//     title: "",
//     size: "",
//     brand: "",
//     material: "",
//     color: "",
//     product_type: "",
//     description: "",
//     complete_the_look: "",
//     specification: "",
//     price: "",
//     category: "",
//   });
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [errors, setErrors] = React.useState<Partial<FormValues>>({});

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormValues((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     // e.preventDefault();
//     e.preventDefault();
//     console.log("Inside");
//     // const validationErrors: Partial<Record<keyof FormValues, string>> = {};
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

//       const response = await axios.post(
//         `${process.env.REACT_APP_FAST_API}add_product/?size=${formValues.size}&brand=${formValues.brand}&material=${formValues.material}&title=${formValues.title}&color=${formValues.color}&product_type=${formValues.product_type}&description=${formValues.description}&complete_the_look=${formValues.complete_the_look}&specification=${formValues.specification}&price=${formValues.price}&category=${formValues.category}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
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
//       // Close the modal or perform other actions as needed
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       // Handle errors if the POST request fails
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];

//     if (file) {
//       // Check file size (1MB = 1024 * 1024 bytes)
//       if (file.size > 1024 * 1024) {
//         // toast.error("File size should be less than 1MB");
//         return;
//       }

//       const allowedTypes = [
//         "image/jpeg",
//         "image/heic",
//         "image/avif",
//         "image/png",
//       ];
//       if (!allowedTypes.includes(file.type)) {
//         // toast.error("Only JPG, HEIC, and AVIF file types are allowed");
//         return;
//       }

//       setSelectedFile(file);
//       // Set the selected file as the source of the avatar image
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           //   setAvatarImage(reader.result as string);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

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
              {errors.complete_the_look && <span>{errors.complete_the_look}</span>}
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
            {fileError && <div style={{ color: "red" }}>{fileError}</div>}
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
