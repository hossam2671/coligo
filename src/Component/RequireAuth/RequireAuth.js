import React from "react";
import { useSelector } from "react-redux";

const RequireAuth = (WrappedComponent) => {
  return function WithAuthenticationWrapper() {
    const isLogged = useSelector((state) => state.MainSlice.isLogged);

    return isLogged ? <WrappedComponent /> : null;
  }
}

export default RequireAuth;
