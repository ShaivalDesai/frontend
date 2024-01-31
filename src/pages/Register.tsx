import React, { useState } from "react";
import AuthForm from "./AuthForm";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {};

  return (
    <AuthForm
      formType="register"
      credentials={credentials}
      onChange={handleChange}
      onSubmit={handleRegister}
    />
  );
};

export default Register;
