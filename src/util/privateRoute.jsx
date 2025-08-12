import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get("/login/check", { withCredentials: true }).then((res) => {
      setAuth(res.data.loggedIn);
    });
  }, []);

  if (auth === null) return null; // 또는 로딩 화면
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
