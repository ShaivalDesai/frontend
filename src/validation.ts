
export const validateEmail = (email: string) => {
  if (!email.trim()) {
    return "Email is required";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return "Email is invalid";
  }
  return "";
};

export const validatePassword = (password: string) => {
  if (!password.trim()) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    return "Password must contain at least one uppercase and one lowercase letter";
  } else if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }
  return "";
};

export const validateLoginPassword = (password: string) => {
  if (!password.trim()) {
    return "Password is required";
  }
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (!confirmPassword.trim()) {
    return "Confirm Password is required";
  } else if (confirmPassword !== password) {
    return "Passwords do not match";
  }
  return "";
};

export const validateConfirmEmail = (email: string, confirmEmail: string) => {
  if (!confirmEmail.trim()) {
    return "Confirm Email is required";
  } else if (confirmEmail !== email) {
    return "Emails do not match";
  }
  return "";
};

export const validateName = (name: string) => {
  if (!name.trim()) {
    return "Name is required";
  }
  return "";
};

export const validatePhoneNumber = (number: string) => {
  const phoneRegex = /^[6789]\d{9}$/;
  if (!number) {
    return "Phone number is required";
  } else if (!phoneRegex.test(number)) {
    return "Invalid phone number";
  }
  return "";
};

export const validateUserType = (userType: string) => {
  if (!userType.trim()) {
    return "User Type selection is required";
  }
  return "";
};

export const validatezip = (zip: string) => {
  const isValid = /^\d{6}$/.test(zip);
  if (!zip.trim()) {
    return "Zip is required";
  }
  if (!isValid) {
    return "Pincode is invalid.";
  } else {
    return "";
  }
};


export const validateDate = (date: string) => {
  if (!date.trim()) {
    return "Date is required";
  }

  const inputDate = new Date(date);
  const currentDate = new Date();

  if (inputDate > currentDate) {
    return "Future date selection is not allowed";
  }
};

export const validateGender = (gender: string): string | undefined => {
  if (!gender.trim()) {
    return "Please select a gender";
  }
  return undefined; // Return undefined if there are no errors
};
export const validateState = (state: any): string | undefined => {
  if (!state) {
    return "State is required";
  }
  return "";
};

export const validateAddress = (address: string) => {
  if (!address.trim()) {
    return "Address is required";
  }
  return "";
};

export const validateCountry = (country: any): string | undefined => {
  if (!country) {
    return "Country is required";
  }
  return undefined;
};

export const validateCity = (city: any): string | undefined => {
  if (!city) {
    return "City is required";
  }
  return undefined;
};

export const validatereg = (reg:string) => {
  // Regular expression to match exactly 8 digits
  const regex = /^\d{8}$/;
  
  if (!regex.test(reg)) {
    return "Number must be exactly 8 digits.";
  }
  
  return ""; // Return an empty string if there's no error
};

