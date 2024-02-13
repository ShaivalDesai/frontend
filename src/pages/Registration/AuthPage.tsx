import * as React from "react";
import LoginUser from "./LoginUser";
import Register from "./RegistrationUser";

export default function AuthPage() {
  const [showLoginForm, setShowLoginForm] = React.useState(true);

  return (
    <div>
      {showLoginForm ? <LoginUser /> : <Register />}
      <button onClick={() => setShowLoginForm(!showLoginForm)}>
        {showLoginForm ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
}
