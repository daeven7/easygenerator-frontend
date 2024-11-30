import { useGetData } from "../../hooks/dashboard";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth";
import styles from "./dashboard.module.scss";
import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Spin } from "antd";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthContext();
  const { data, isSuccess, isLoading, isError, error } = useGetData(
    Boolean(isAuthenticated)
  );

  useEffect(() => {
    if (isError) {
      let e = error as AxiosError;
      if (e?.response?.status == 401) {
        logout();
        navigate("/");
      }
    }
  }, [isError, error]);

  return (
    <>
      <Navbar />
      <div className={styles.dashboard}>
        <Spin spinning={isLoading} fullscreen />
        {isSuccess && <h1>{data}</h1>}
        {isError && <h1>Error</h1>}
      </div>
    </>
  );
};

export default Dashboard;
