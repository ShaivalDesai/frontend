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
  validatereg,
} from "../../validation";

interface FormData {
  name: string;
  email: string;
  number: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  address_2: string;
  number_2: string;
  reg_number: string;
  est_date: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  number: "",
  address: "",
  country: "",
  state: "",
  city: "",
  pincode: "",
  address_2: "",
  number_2: "",
  reg_number: "",
  est_date: "",
};

const Vendor_Profile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [stateOptions, setStateOptions] = useState<any[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const [isLocked, setIsLocked] = useState(true);

  const [number2, setNumber2] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [reg_number, setReg_number] = useState<string>("");
  const [errors, setErrors] = React.useState<Partial<FormData>>({});

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
        const response = await axios.get("YOUR_API_ENDPOINT");
        const userData = response.data;

        setFormData({
          name: userData.user_update.name,
          email: userData.user_update.email,
          number: String(userData.user_update.number),
          number_2: String(userData.vendor_update.number_2),
          est_date: userData.vendor_update.est_date,
          address: userData.vendor_update.address,
          pincode: String(userData.vendor_update.pincode),
          address_2: userData.vendor_update.address_2,
          country: userData.vendor_update.country,
          state: userData.vendor_update.state,
          city: userData.vendor_update.city,
          reg_number: String(userData.vendor_update.reg_number),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCountryChange = async (selectedOption: any) => {
    setSelectedCountry(selectedOption);
    const states: any = await State.getStatesOfCountry(selectedOption.value);
    const formattedStates = states.map((state: any) => ({
      value: state.isoCode,
      label: state.name,
    }));
    setStateOptions(formattedStates);
    setSelectedState(null);
    setCityOptions([]);
    setSelectedCity(null);

    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedOption.label, // Assuming you want to store the label
      state: "",
      city: "",
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      country: "",
      state: "",
      city: "",
    }));
  };

  const handleStateChange = async (selectedOption: any) => {
    setSelectedState(selectedOption);
    console.log("Selected State:", selectedOption);
    console.log("Selected Country:", selectedCountry);

    if (selectedCountry && selectedOption) {
      const cities: any = await City.getCitiesOfState(
        selectedCountry.value,
        selectedOption.value
      );
      console.log("Cities:", cities);
      const formattedCities = cities.map((city: any) => ({
        value: city.name,
        label: city.name,
      }));
      setCityOptions(formattedCities);
      setSelectedCity(null);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      state: selectedOption.label,

      city: "",
    }));

    // Reset errors for country, state, and city
    setErrors((prevErrors) => ({
      ...prevErrors,
      country: "",
      state: "",
      city: "",
    }));
  };

  const handleCityChange = (selectedOption: any) => {
    setSelectedCity(selectedOption);

    // Clear city related validation error
    setFormData((prevFormData) => ({
      ...prevFormData,
      city: selectedOption.label, // Assuming you want to store the label
      // state: "", // Reset state
      // Reset city
    }));

    // Reset errors for country, state, and city
    setErrors((prevErrors) => ({
      ...prevErrors,
      country: "",
      state: "",
      city: "",
    }));
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
      est_date: validateDate(formData.est_date),
      state: validateState(formData.state),
      pincode: validatezip(formData.pincode),
      address: validateAddress(formData.address),
      country: validateCountry(formData.country),
      city: validateCity(formData.city),
      reg_number: validatereg(formData.reg_number),
    };

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((error) => !!error);

    if (!hasErrors) {
      try {
        await axios.put("YOUR_API_ENDPOINT", {
          user_update: {
            name: formData.name,
            email: formData.email,
            number: parseInt(formData.number), // Assuming number is a string
          },
          vendor_update: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            pincode: parseInt(formData.pincode), // Assuming pincode is a string
            address_2: formData.address_2,
            number_2: parseInt(formData.pincode),
            reg_number: parseInt(formData.reg_number), // Assuming number_2 is a string
            est_date: formData.est_date,
          },
        });
        console.log("Data updated successfully");
        // Optionally show a success message to the user
      } catch (error) {
        console.error("Error updating data:", error);
        // Optionally show an error message to the user
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('p2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: "25px",
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
                id="number2"
                label="Phone Number 2"
                name="number2"
                value={number2}
                // disabled={isLocked}
                onChange={(e) => setNumber2(e.target.value)}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="est_date"
                type="date"
                value={formData.est_date}
                onChange={handleChange}
                // disabled={isLocked}
              />
              <div style={{ color: "red" }}>
                {errors.est_date && <span>{errors.est_date}</span>}
              </div>
            </Grid>

            <Grid item xs={6}>
              <TextField
                // required
                fullWidth
                // id="reg_number"
                label="Registration Number"
                name="reg_number"
                value={formData.reg_number}
                onChange={handleChange}
                inputProps={{ maxLength: 8 }}
              />
              <div style={{ color: "red" }}>
                {errors.reg_number && <span>{errors.reg_number}</span>}
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
                name="address"
                label="Address 1"
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
                label="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                inputProps={{ maxLength: 6 }}
                // disabled={isLocked}
              />
              <div style={{ color: "red" }}>
                {errors.pincode && <span>{errors.pincode}</span>}
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address 2"
                name="address_2"
                value={formData.address_2}
                onChange={handleChange}
                // disabled={isLocked}
              />
            </Grid>

            <Grid item xs={4}>
              <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={handleCountryChange}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "transparent",
                  }),
                }}
                menuPlacement="auto"
                menuPosition="fixed"
                menuPortalTarget={document.body}
                // isDisabled={isLocked}
              />
              <div style={{ color: "red" }}>
                {errors.country && <span>{errors.country}</span>}
              </div>
            </Grid>
            <Grid item xs={4}>
              <Select
                options={stateOptions}
                value={selectedState}
                onChange={handleStateChange}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "white",
                  }),
                }}
                menuPlacement="auto"
                menuPosition="fixed"
                menuPortalTarget={document.body}
                // isDisabled={isLocked}
              />
              <div style={{ color: "red" }}>
                {errors.state && <span>{errors.state}</span>}
              </div>
            </Grid>

            <Grid item xs={4}>
              <Select
                options={cityOptions}
                value={selectedCity}
                onChange={handleCityChange}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "white",
                  }),
                }}
                menuPlacement="auto"
                menuPosition="fixed"
                menuPortalTarget={document.body}
                // isDisabled={isLocked}
              />
              <div style={{ color: "red" }}>
                {errors.city && <span>{errors.city}</span>}
              </div>
            </Grid>

            <Grid item xs={12}>
              {/* <Button
                  type="submit"
                  onClick={handleLockToggle}
                  variant="contained"
                  color={isLocked ? "primary" : "secondary"}
                >
                  {isLocked ? "Update" : "Save"}
                </Button> */}
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
  );
};

export default Vendor_Profile;
