// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   TextField,
//   Grid,
//   Paper,
//   Typography,
//   Container,
//   MenuItem,
// } from "@mui/material";
// import Navbar from "./Navbar";
// import axios from "axios";
// import { Country, State, City } from "country-state-city";
// import Select from "react-select";
// import {
//   validatezip,
//   validateEmail,
//   validatePassword,
//   validateUserType,
//   validateConfirmPassword,
//   validateConfirmEmail,
//   validateName,
//   validateDate,
//   validatePhoneNumber,
//   validateGender,
//   validateState,
//   validateAddress,
//   validateCountry,
//   validateCity,
// } from "../../validation";

// interface FormData {
//   name: string;
//   email: string;
//   number1: string;
//   number2: string;
//   dob: string;
//   gender: string;
//   address1: string;
//   zip1: string;
//   address2: string;
//   zip2: string;
//   country: string;
//   state: string;
//   city: string;
// }

// const initialFormData: FormData = {
//   name: "",
//   email: "",
//   number1: "",
//   number2: "",
//   dob: "",
//   gender: "",
//   address1: "",
//   zip1: "",
//   address2: "",
//   zip2: "",
//   country: "",
//   state: "",
//   city: "",
// };

// const Home_Profile: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>(initialFormData);
//   const [country, setCountry] = useState<string>("");
//   const [selectedCountry, setSelectedCountry] = useState<any>(null);
//   const [selectedState, setSelectedState] = useState<any>(null);
//   const [selectedCity, setSelectedCity] = useState<any>(null);
//   const [countryOptions, setCountryOptions] = useState<any[]>([]);
//   const [stateOptions, setStateOptions] = useState<any[]>([]);
//   const [cityOptions, setCityOptions] = useState<any[]>([]);
//   const [isLocked, setIsLocked] = useState(true);
//   const [gender, setGender] = useState<any>("");
//   const [zip1, setZip1] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [number1, setNumber1] = useState<string>("");
//   const [number2, setNumber2] = useState<string>("");
//   const [dob, setDob] = React.useState<string>("");
//   const [email, setEmail] = React.useState<string>("");
//   const [errors, setErrors] = React.useState<Partial<FormData>>({});

//   useEffect(() => {
//     const fetchCountries = async () => {
//       const countries: any = await Country.getAllCountries();
//       const formattedCountries = countries.map((country: any) => ({
//         value: country.isoCode,
//         label: country.name,
//       }));
//       setCountryOptions(formattedCountries);
//     };
//     // fetchData();
//     fetchCountries();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("YOUR_API_ENDPOINT");
//         const userData = response.data;

//         setFormData({
//           name: userData.user_update.name,
//           email: userData.user_update.email,
//           number1: String(userData.user_update.number),
//           number2: String(userData.customer_update.number_2),
//           dob: userData.customer_update.dob,
//           gender: userData.customer_update.gender,
//           address1: userData.customer_update.address,
//           zip1: String(userData.customer_update.pincode),
//           address2: userData.customer_update.address_2,
//           zip2: String(userData.customer_update.number_2),
//           country: userData.customer_update.country,
//           state: userData.customer_update.state,
//           city: userData.customer_update.city,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCountryChange = async (selectedOption: any) => {
//     setSelectedCountry(selectedOption);
//     const states: any = await State.getStatesOfCountry(selectedOption.value);
//     const formattedStates = states.map((state: any) => ({
//       value: state.isoCode,
//       label: state.name,
//     }));
//     setStateOptions(formattedStates);
//     setSelectedState(null);
//     setCityOptions([]);
//     setSelectedCity(null);

//     // Update formData for country, state, and city
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       country: selectedOption.label, // Assuming you want to store the label
//       state: "", // Reset state
//       city: "", // Reset city
//     }));

//     // Reset errors for country, state, and city
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       country: "",
//       state: "",
//       city: "",
//     }));
//   };

//   const handleStateChange = async (selectedOption: any) => {
//     setSelectedState(selectedOption);
//     console.log("Selected State:", selectedOption);
//     console.log("Selected Country:", selectedCountry);

//     if (selectedCountry && selectedOption) {
//       const cities: any = await City.getCitiesOfState(
//         selectedCountry.value,
//         selectedOption.value
//       );
//       console.log("Cities:", cities);
//       const formattedCities = cities.map((city: any) => ({
//         value: city.name,
//         label: city.name,
//       }));
//       setCityOptions(formattedCities);
//       setSelectedCity(null);
//     }
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       state: selectedOption.label, // Assuming you want to store the label
//       // state: "", // Reset state
//       city: "", // Reset city
//     }));

//     // Reset errors for country, state, and city
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       country: "",
//       state: "",
//       city: "",
//     }));
//   };

//   const handleCityChange = (selectedOption: any) => {
//     setSelectedCity(selectedOption);

//     // Clear city related validation error
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       city: selectedOption.name, // Change this to selectedOption.name
//     }));

//     // Reset errors for country, state, and city
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       country: "",
//       state: "",
//       city: "",
//     }));
//   };

//   const handleChange = (event: any) => {
//     const { name, value } = event.target;

//     setFormData({ ...formData, [name]: String(value) });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   const handleLockToggle = () => {
//     setIsLocked(!isLocked);
//   };

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const validationErrors: Partial<FormData> = {
//       name: validateName(formData.name),
//       email: validateEmail(formData.email),
//       number1: validatePhoneNumber(formData.number1),
//       dob: validateDate(formData.dob),
//       gender: validateGender(formData.gender),
//       state: validateState(formData.state),
//       zip1: validatezip(formData.zip1),
//       address1: validateAddress(formData.address1),
//       country: validateCountry(formData.country),
//       city: validateCity(formData.city),
//     };

//     setErrors(validationErrors);

//     const hasErrors = Object.values(validationErrors).some((error) => !!error);

//     if (!hasErrors) {
//       try {
//         await axios.put("YOUR_API_ENDPOINT", {
//           user_update: {
//             name: formData.name,
//             email: formData.email,
//             number: parseInt(formData.number1), // Assuming number is a string
//           },
//           customer_update: {
//             address: formData.address1,
//             city: formData.city,
//             state: formData.state,
//             country: formData.country,
//             pincode: parseInt(formData.zip1), // Assuming pincode is a string
//             address_2: formData.address2,
//             number_2: parseInt(formData.zip2), // Assuming number_2 is a string
//             gender: formData.gender,
//             dob: formData.dob,
//           },
//         });
//         console.log("Data updated successfully");
//         // Optionally show a success message to the user
//       } catch (error) {
//         console.error("Error updating data:", error);
//         // Optionally show an error message to the user
//       }
//     }
//   };

//   return (

//     <>
//     <Navbar/>
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundImage: `url('p2.jpg')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//       }}
//     >
//       <Container maxWidth="sm">
//         <Paper
//           elevation={3}
//           sx={{
//             padding: 4,
//             backgroundColor: "rgba(255,255,255,0.9)",
//             borderRadius: "25px",
//           }}
//         >
//           <Typography variant="h5" gutterBottom>
//             General Information
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 name="name"
//                 label="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 // disabled={isLocked}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.name && <span>{errors.name}</span>}
//               </div>
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 name="email"
//                 label="Email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 // disabled={isLocked}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.email && <span>{errors.email}</span>}
//               </div>
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Phone Number 1"
//                 name="number1"
//                 value={formData.number1}
//                 // disabled={isLocked}
//                 onChange={handleChange}
//                 inputProps={{ maxLength: 10 }}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.number1 && <span>{errors.number1}</span>}
//               </div>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 // required
//                 fullWidth
//                 id="number2"
//                 label="Phone Number 2"
//                 name="number2"
//                 value={number2}
//                 // disabled={isLocked}
//                 onChange={(e) => setNumber2(e.target.value)}
//                 inputProps={{ maxLength: 10 }}
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 name="dob"
//                 type="date"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 // disabled={isLocked}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.dob && <span>{errors.dob}</span>}
//               </div>
//             </Grid>

//             <Grid item xs={6} style={{ position: "relative" }}>
//               <Select
//                 options={[
//                   { value: "male", label: "Male" },
//                   { value: "female", label: "Female" },
//                   { value: "other", label: "Other" },
//                 ]}
//                 value={gender}
//                 onChange={(selectedOption) => {
//                   setGender(selectedOption);

//                   setErrors((prevErrors) => ({ ...prevErrors, gender: "" }));
//                 }}
//                 // isDisabled={isLocked}
//                 placeholder="Gender"
//                 styles={{
//                   menu: (provided) => ({
//                     ...provided,
//                     position: "absolute",
//                     zIndex: 9999,
//                     width: "100%",
//                     marginTop: "8px",
//                   }),
//                   control: (provided) => ({
//                     ...provided,
//                     minHeight: "56px",
//                   }),
//                 }}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.gender && <span>{errors.gender}</span>}
//               </div>
//             </Grid>

//             <Grid item xs={12}>
//               <Typography
//                 variant="h5"
//                 style={{ marginBottom: -8 }}
//                 gutterBottom
//               >
//                 Address Details
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Address 1"
//                 name="address1"
//                 value={formData.address1}
//                 onChange={handleChange}
//                 // disabled={isLocked}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.address1 && <span>{errors.address1}</span>}
//               </div>
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 name="zip1"
//                 label="Zip Code"
//                 value={formData.zip1}
//                 onChange={handleChange}
//                 inputProps={{ maxLength: 6 }}
//                 // disabled={isLocked}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.zip1 && <span>{errors.zip1}</span>}
//               </div>
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Address 2"
//                 name="address2"
//                 value={formData.address2}
//                 onChange={handleChange}
//                 // disabled={isLocked}
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 name="zip2"
//                 label="Zip Code 2"
//                 value={formData.zip2}
//                 onChange={handleChange}
//                 // disabled={isLocked}
//               />
//             </Grid>

//             <Grid item xs={4}>
//               <Select
//                 options={countryOptions}
//                 value={selectedCountry}
//                 onChange={handleCountryChange}
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
//                     backgroundColor: "transparent",
//                   }),
//                 }}
//                 menuPlacement="auto"
//                 menuPosition="fixed"
//                 menuPortalTarget={document.body}
//                 // isDisabled={isLocked}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.country && <span>{errors.country}</span>}
//               </div>
//             </Grid>
//             <Grid item xs={4}>
//               <Select
//                 options={stateOptions}
//                 value={selectedState}
//                 onChange={handleStateChange}
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
//                     backgroundColor: "white",
//                   }),
//                 }}
//                 menuPlacement="auto"
//                 menuPosition="fixed"
//                 menuPortalTarget={document.body}
//                 // isDisabled={isLocked}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.state && <span>{errors.state}</span>}
//               </div>
//             </Grid>

//             <Grid item xs={4}>
//               <Select
//                 options={cityOptions}
//                 value={selectedCity}
//                 onChange={handleCityChange}
//                 styles={{
//                   control: (provided) => ({
//                     ...provided,
//                     backgroundColor: "white",
//                   }),
//                 }}
//                 menuPlacement="auto"
//                 menuPosition="fixed"
//                 menuPortalTarget={document.body}
//                 // isDisabled={isLocked}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.city && <span>{errors.city}</span>}
//               </div>
//             </Grid>

//             <Grid item xs={12}>
//               {/* <Button
//                   type="submit"
//                   onClick={handleLockToggle}
//                   variant="contained"
//                   color={isLocked ? "primary" : "secondary"}
//                 >
//                   {isLocked ? "Update" : "Save"}
//                 </Button> */}
//               <form onSubmit={handleRegister}>
//                 <Button type="submit" variant="contained" color="primary">
//                   Save
//                 </Button>
//               </form>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>
//     </div>
//     </>
//   );
// };

// export default Home_Profile;

import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import {
  validatezip,
  validateEmail,
  validatePassword,
  validateUserType,
  validateConfirmPassword,
  validateConfirmEmail,
  validateName,
  validateDate,
  validatePhoneNumber,
  validateGender,
  validateState,
  validateAddress,
  validateCountry,
  validateCity,
} from "../../validation";
import Navbar from "./Navbar";

interface FormData {
  name: string;
  email: string;
  number: string;
  number_2: string;
  dob: string;
  gender: string;
  address: string;
  pincode: string;
  address_2: string;
  country: string;
  state: string;
  city: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  number: "",
  number_2: "",
  dob: "",
  gender: "",
  address: "",
  pincode: "",
  address_2: "",
  // zip2: "",
  country: "",
  state: "",
  city: "",
};

const Home_Profile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [country, setCountry] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [stateOptions, setStateOptions] = useState<any[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const [isLocked, setIsLocked] = useState(true);

  const [gender, setGender] = useState<any>("");
  const [pincode, setpincode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [number, setnumber] = useState<string>("");
  const [number_2, setnumber_2] = useState<string>("");
  const [dob, setDob] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [selected, setSelected] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [errors, setErrors] = React.useState<Partial<FormData>>({});
  const [genderOptions, setGenderOptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchGenderOptions = async () => {
      const genders = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
      ];
      setGenderOptions(genders);
    };
    fetchGenderOptions();
  }, []);

  // Function to handle gender change
  const handleGenderChange = (selectedOption: any) => {
    setFormData({
      ...formData,
      gender: selectedOption.value,
    });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const countries: any = await Country.getAllCountries();
      const formattedCountries = countries.map((country: any) => ({
        value: country.isoCode,
        label: country.name,
      }));
      setCountryOptions(formattedCountries);
    };
    // fetchData();
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u_id = 1;
        const c_id = 1;
        const response = await axios.get(
          "http://127.0.0.1:8000/user_and_customer/" + u_id + "/" + c_id
        );
        const userData = response.data;
        console.log("userData", userData.customer.country);

        const countries = await Country.getAllCountries();
        const desiredCountry = countries.find(
          (country) => country.name === userData.customer.country
        );
        if (!desiredCountry) {
          console.error("Desired country not found");
          return;
        }
        const countryId = desiredCountry.isoCode;

        setFormData({
          name: userData.user.name,
          email: userData.user.email,
          number: String(userData.user.number),
          number_2: String(userData.customer.number_2),
          dob: userData.customer.dob,
          gender: userData.customer.gender,
          address: userData.customer.address,
          pincode: String(userData.customer.pincode),
          address_2: userData.customer.address_2,
          country: userData.customer.country,
          state: userData.customer.state,
          city: userData.customer.city,
        });

        // Now you have the country ID, you can use it to fetch states
        const states = await State.getStatesOfCountry(countryId);
        const desiredState = states.find(
          (state) => state.name === userData.customer.state
        );
        if (!desiredState) {
          console.error("Desired state not found");
          return;
        }
        const stateCode = desiredState.isoCode;
        setStateOptions(
          states.map((state: any) => ({
            value: state.isoCode,
            label: state.name,
          }))
        );

        const cities = await City.getCitiesOfState(countryId, stateCode);
        setCityOptions(
          cities.map((city: any) => ({
            value: city.name,
            label: city.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCountryChange = async (selectedOption: any) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setSelectedCity(null);

    try {
      const states: any = await State.getStatesOfCountry(selectedOption.value);
      const formattedStates = states.map((state: any) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setStateOptions(formattedStates);
      setCityOptions([]);
      setFormData({
        ...formData,
        country: selectedOption.label, // Use full name instead of short form
        state: "",
        city: "",
      });
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = async (selectedOption: any) => {
    setSelectedState(selectedOption);
    setSelectedCity(null);

    try {
      const cities: any = await City.getCitiesOfState(
        selectedCountry.value,
        selectedOption.value
      );
      const formattedCities = cities.map((city: any) => ({
        value: city.name,
        label: city.name,
      }));
      setCityOptions(formattedCities);
      setFormData({
        ...formData,
        state: selectedOption.label, // Use full name instead of short form
        city: "",
      });
    } catch (error) {
      console.error("Error fetching cities:", error);
      // Handle error appropriately, such as displaying an error message
    }
  };

  const handleCityChange = (selectedOption: any) => {
    setSelectedCity(selectedOption);
    setFormData({
      ...formData,
      city: selectedOption.label, // Use full name instead of short form
    });
    setSelected({ ...selected, city: selectedOption.label });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: String(value) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleLockToggle = () => {
    setIsLocked(!isLocked);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: Partial<FormData> = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      number: validatePhoneNumber(formData.number),
      dob: validateDate(formData.dob),
      gender: validateGender(formData.gender),
      state: validateState(formData.state),
      pincode: validatezip(formData.pincode),
      address: validateAddress(formData.address),
      country: validateCountry(formData.country),
      city: validateCity(formData.city),
    };

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((error) => !!error);

    if (!hasErrors) {
      try {
        const u_id = 1;
        const c_id = 1;
        await axios.put(
          "http://127.0.0.1:8000/CustomerProfile/" + u_id + "/" + c_id,
          {
            user_update: {
              name: formData.name,
              email: formData.email,
              number: parseInt(formData.number), // Assuming number is a string
            },
            customer_update: {
              address: formData.address,
              city: formData.city,
              state: formData.state,
              country: formData.country,
              pincode: parseInt(formData.pincode), // Assuming pincode is a string
              address_2: formData.address_2,
              number_2: parseInt(formData.number_2), // Assuming number_2 is a string
              gender: formData.gender,
              dob: formData.dob,
            },
          }
        );
        console.log("Data updated successfully");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  return (

    <>
    <Navbar/>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('p2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        // marginTop:"-40px"
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: "25px",
            marginTop:"-40px"
          }}
        >
          <Typography variant="h5" gutterBottom>
            General Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                // disabled={isLocked}
              />
              <div style={{ color: "red" }}>
                {errors.name && <span>{errors.name}</span>}
              </div>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                // disabled={isLocked}
              />
              <div style={{ color: "red" }}>
                {errors.email && <span>{errors.email}</span>}
              </div>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number 1"
                name="number"
                value={formData.number}
                // disabled={isLocked}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
              />
              <div style={{ color: "red" }}>
                {errors.number && <span>{errors.number}</span>}
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                // required
                fullWidth
                id="number_2"
                label="Phone Number 2"
                name="number_2"
                value={number_2}
                // disabled={isLocked}
                onChange={(e) => setnumber_2(e.target.value)}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                // disabled={isLocked}
              />
              <div style={{ color: "red" }}>
                {errors.dob && <span>{errors.dob}</span>}
              </div>
            </Grid>
            <Grid item xs={6} style={{ position: "relative" }}>
              <Select
                options={genderOptions}
                value={genderOptions.find(
                  (option) => option.value === formData.gender
                )}
                onChange={handleGenderChange}
                placeholder="Gender"
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    position: "absolute",
                    zIndex: 9999,
                    width: "100%",
                    marginTop: "8px",
                  }),
                  control: (provided) => ({
                    ...provided,
                    background: "transparent",
                    minHeight: "56px",
                  }),
                }}
              />
              <div style={{ color: "red" }}>
                {errors.gender && <span>{errors.gender}</span>}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                style={{ marginBottom: -8 }}
                gutterBottom
              >
                Address Details
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address 1"
                name="address"
                value={formData.address}
                onChange={handleChange}
                // disabled={isLocked}
              />
              <div style={{ color: "red" }}>
                {errors.address && <span>{errors.address}</span>}
              </div>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="pincode"
                label="Zip Code"
                value={formData.pincode}
                onChange={handleChange}
                inputProps={{ maxLength: 6 }}
                // disabled={isLocked}
              />
              <div style={{ color: "red" }}>
                {errors.pincode && <span>{errors.pincode}</span>}
              </div>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Address 2"
                name="address_2"
                value={formData.address_2}
                onChange={handleChange}
                // disabled={isLocked}
              />
            </Grid>

            <Grid item xs={6}>
              <Select
                options={countryOptions}
                value={countryOptions.find(
                  (option) => option.label === formData.country
                )}
                onChange={handleCountryChange}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "transparent",
                    minHeight: "56px",
                  }),
                }}
                menuPlacement="auto"
                menuPosition="fixed"
                menuPortalTarget={document.body}
                // isDisabled={isLocked}
              />
              {/* <div style={{ color: "red" }}>
                {errors.country && <span>{errors.country}</span>}
              </div> */}
            </Grid>
            <Grid item xs={6}>
              <Select
                options={stateOptions}
                value={stateOptions.find(
                  (option) => option.label === formData.state
                )}
                onChange={handleStateChange}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "transparent",
                    minHeight: "56px",
                  }),
                }}
                menuPlacement="auto"
                menuPosition="fixed"
                menuPortalTarget={document.body}
              />
              {/* <div style={{ color: "red" }}>
                {errors.state && <span>{errors.state}</span>}
              </div> */}
            </Grid>

            <Grid item xs={6}>
              <Select
                options={cityOptions}
                value={cityOptions.find(
                  (option) => option.label === formData.city
                )}
                onChange={handleCityChange}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "transparent",
                    minHeight: "56px",
                  }),
                }}
                menuPlacement="auto"
                menuPosition="fixed"
                menuPortalTarget={document.body}
              />
              {/* <div style={{ color: "red" }}>
                {errors.city && <span>{errors.city}</span>}
              </div> */}
            </Grid>

            <Grid item xs={12}>
              <form onSubmit={handleRegister}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
    </>
  );
};

export default Home_Profile;
