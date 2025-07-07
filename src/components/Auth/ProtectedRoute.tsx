import React from "react";
import { Navigate } from "react-router-dom";

import { AUTH_ROUTE } from "utils/api/routes/clientRoute";
import { localStorageEnum } from "utils/enum/enum";
import { getLocalStorageValue } from "utils/helper/helper";

interface ProtectedRouteProps {
  Component: React.ElementType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Component }) => {
  const token = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);

  return token ? <Component /> : <Navigate to={AUTH_ROUTE.LOGIN} />;
};

export default ProtectedRoute;
