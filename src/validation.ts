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
