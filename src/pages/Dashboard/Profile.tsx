import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import { Country, State, City } from "country-state-city";
import Select from "react-select";

interface FormData {
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zip: "",
};

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [country, setCountry] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [stateOptions, setStateOptions] = useState<any[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries: any = await Country.getAllCountries();
      const formattedCountries = countries.map((country: any) => ({
        value: country.isoCode,
        label: country.name,
      }));
      setCountryOptions(formattedCountries);
    };
    fetchCountries();
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
  };

  const handleStateChange = async (selectedOption: any) => {
    setSelectedState(selectedOption);
    console.log("Selected State:", selectedOption);
    console.log("Selected Country:", selectedCountry); // Make sure selectedCountry is not null
    const cities: any = City.getCitiesOfState(
      selectedCountry.isoCode,
      selectedOption.value
    );
    console.log("Cities:", cities); // Check the cities received from the API
    const formattedCities = cities.map((city: any) => ({
      value: city.name,
      label: city.name,
    }));
    setCityOptions(formattedCities);
    setSelectedCity(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleLockToggle = () => {
    setIsLocked(!isLocked);
  };

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city });
  };

  const handleStateeChange = (state: string) => {
    setFormData({ ...formData, state });
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
        //   paddingTop: "50px",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" gutterBottom>
            General Information
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "transparent",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLocked} // disable if locked
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLocked} // disable if locked
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  // value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={isLocked} // disable if locked
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="phoneNumber2"
                  label="Phone Number 2"
                  // value={formData.phoneNumber2}
                  onChange={handleChange}
                  disabled={isLocked} // disable if locked
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="establishmentDate"
                  type="date"
                  // value={formData.establishmentDate}
                  onChange={handleChange}
                  disabled={isLocked} // disable if locked
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="registrationNumber"
                  label="Registration Number"
                  // value={formData.registrationNumber}
                  onChange={handleChange}
                  disabled={isLocked} // disable if locked
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Address Details
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  disabled={isLocked} // disable if locked
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="phoneNumber2"
                  label="Zip Code"
                  // value={formData.phoneNumber2}
                  onChange={handleChange}
                  disabled={isLocked} // disable if locked
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
                  menuPlacement="auto" // Adjust menu placement dynamically
                  menuPosition="fixed" // Use "fixed" positioning to attach the menu to the viewport
                  menuPortalTarget={document.body} // Render the menu within the body element to prevent overflow issues
                  isDisabled={isLocked} // disable if locked
                />
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
                  menuPlacement="auto" // Dynamically adjust menu placement
                  menuPosition="fixed" // Attach the menu to the viewport
                  menuPortalTarget={document.body} // Render the menu within the body element
                  isDisabled={isLocked} // disable if locked
                />
              </Grid>

              <Grid item xs={4}>
                <Select
                  options={cityOptions}
                  value={selectedCity}
                  onChange={setSelectedCity}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "white",
                    }),
                  }}
                  menuPlacement="auto" // Dynamically adjust menu placement
                  menuPosition="fixed" // Attach the menu to the viewport
                  menuPortalTarget={document.body} // Render the menu within the body element
                  isDisabled={isLocked} // disable if locked
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="button" // Use type button to prevent form submission
                  onClick={handleLockToggle} // Toggle edit mode
                  variant="contained"
                  color={isLocked ? "primary" : "secondary"} // Change button color based on edit mode
                >
                  {isLocked ? "Update" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default FormComponent;
