import React from "react";
import { Outlet,Navigate } from "react-router";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  let { employee, isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (employee) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default PublicRoute;
