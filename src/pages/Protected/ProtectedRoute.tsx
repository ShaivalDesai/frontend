import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Protected(props: any) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = sessionStorage.getItem("login");
    if (!login) {
      navigate("/login");
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
