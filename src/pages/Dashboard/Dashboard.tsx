import { useGetData } from "../../hooks/dashboard";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth";
import styles from "./dashboard.module.scss";
import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthContext();
  console.log("inside dashboard", isAuthenticated);
  const { data, isSuccess, isLoading, isError, error } = useGetData(
    Boolean(isAuthenticated)
  );

  useEffect(() => {
    console.log("inside useeffect")
    if (isError) {
      let e = error as AxiosError;
      if (e?.response?.status == 401) {
        console.log("inside dashboard error", isError, error);
        logout();
        navigate("/");
      }
    }
  }, [isError, error]);

  return (
    <>
      <Navbar />
      <div className={styles.dashboard}>
        {isLoading && <h1>loading...</h1>}
        {isSuccess && <h1>{data}</h1>}
        {isError && <h1>Error</h1>}
      </div>
    </>
  );
};

export default Dashboard;
