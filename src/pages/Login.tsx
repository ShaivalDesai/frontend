import React, { useState } from "react";
import AuthForm from "./AuthForm";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    // Login logic here
  };

  return (
    <AuthForm
      formType="login"
      credentials={credentials}
      onChange={handleChange}
      onSubmit={handleLogin}
    />
  );
};

export default Login;
