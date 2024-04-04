import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Container,
  MenuItem,
  Avatar,
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
  validatereg,
  validateGender,
  validateState,
  validateAddress,
  validateCountry,
  validateCity,
} from "../../validation";
import { ToastContainer } from "react-bootstrap";
import DashboardN from "../../Components/DashboardNavbar";

interface FormData {
  name: string;
  email: string;
  number: string;
  number_2: string;
  est_date: string;
  reg_number: string;

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
  est_date: "",

  address: "",
  pincode: "",
  address_2: "",
  reg_number: "",
  country: "",
  state: "",
  city: "",
};

const Vendor_Profile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [country, setCountry] = useState<string>("");
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [stateOptions, setStateOptions] = useState<any[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const [isLocked, setIsLocked] = useState(true);
  const [number2, setNumber2] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [est_date, setEst_date] = React.useState<string>("");
  const [reg_number, setReg_number] = useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [selected, setSelected] = useState({
    country: "",
    state: "",
    city: "",
  });
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
        const u_id = 1;
        const c_id = 1;
        const response = await axios.get(
          // "http://127.0.0.1:8000/user_and_vendor/" + u_id + "/" + c_id
          "http://127.0.0.1:8000/user_and_vendor/1/1"
        );
        const userData = response.data;

        // Extract user, vendor, and vendor data
        const { user, vendor } = userData;

        // Set user data
        setName(user.name);
        setEmail(user.email);
        setNumber(String(user.number));
        setReg_number(String(vendor.reg_number));

        // Set vendor data
        setFormData({
          ...formData,
          name: user.name,
          email: user.email,
          number: String(user.number),
          number_2: String(vendor.number_2),
          est_date: vendor.est_date,
          address: vendor.address,
          pincode: String(vendor.pincode),
          address_2: vendor.address_2,
          country: vendor.country,
          state: vendor.state,
          city: vendor.city,
          reg_number: String(vendor.reg_number),
        });

        // Set other state values
        setNumber2(String(vendor.number_2));
        setPincode(String(vendor.pincode));
        setSelected({
          country: vendor.country,
          state: vendor.state,
          city: vendor.city,
        });

        // Fetch list of countries and find the ID of the desired country
        const countries = await Country.getAllCountries();
        const desiredCountry = countries.find(
          (country) => country.name === vendor.country
        );
        if (!desiredCountry) {
          console.error("Desired country not found");
          return;
        }
        const countryId = desiredCountry.isoCode;

        // Now you have the country ID, you can use it to fetch states
        const states = await State.getStatesOfCountry(countryId);
        const desiredState = states.find(
          (state) => state.name === vendor.state
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
        const u_id = 1;
        const c_id = 1;
        await axios.put(
          "http://127.0.0.1:8000/VendorProfile/" + u_id + "/" + c_id,
          {
            user_update: {
              name: formData.name,
              email: formData.email,
              number: parseInt(formData.number),
            },
            vendor_update: {
              address: formData.address,
              city: formData.city,
              state: formData.state,
              country: formData.country,
              pincode: parseInt(formData.pincode),
              address_2: formData.address_2,
              number_2: parseInt(formData.number_2),
              reg_number: parseInt(formData.reg_number),
              est_date: formData.est_date,
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
      <ToastContainer />
      <DashboardN />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url('p2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          marginTop: "64px",
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
            <Avatar
              alt="Profile Picture"
              src={avatarImage}
              sx={{
                width: 100,
                height: 100,
                margin: "auto",
                marginBottom: 2,
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  General Information
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div style={{ color: "red" }}>
                  {errors.name && <span>{errors.name}</span>}
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number 1"
                  name="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  inputProps={{ maxLength: 10 }}
                />
                <div style={{ color: "red" }}>
                  {errors.number && <span>{errors.number}</span>}
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number 2"
                  name="number2"
                  value={number2}
                  onChange={(e) => setNumber2(e.target.value)}
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Registration Number"
                  name="reg_number"
                  value={reg_number}
                  onChange={(e) => setReg_number(e.target.value)}
                  inputProps={{ maxLength: 8 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Establishment Date"
                  name="est_date"
                  type="date"
                  value={formData.est_date}
                  onChange={handleChange}
                />
                <div style={{ color: "red" }}>
                  {errors.est_date && <span>{errors.est_date}</span>}
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
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
                />
                <div style={{ color: "red" }}>
                  {errors.address && <span>{errors.address}</span>}
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  inputProps={{ maxLength: 6 }}
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
                />
              </Grid>
              <Grid item xs={4}>
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
                />
                <div style={{ color: "red" }}>
                  {errors.country && <span>{errors.country}</span>}
                </div>
              </Grid>
              <Grid item xs={4}>
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
                />
                <div style={{ color: "red" }}>
                  {errors.state && <span>{errors.state}</span>}
                </div>
              </Grid>
              <Grid item xs={4}>
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
                />
                <div style={{ color: "red" }}>
                  {errors.city && <span>{errors.city}</span>}
                </div>
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

export default Vendor_Profile;
