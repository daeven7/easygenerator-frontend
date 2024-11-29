import Navbar from "../../components/Navbar";
import { useGetData } from "../../hooks/app";
import { AxiosError } from "axios";
import { authService } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth";

const AppPage = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetData();
  // const navigate = useNavigate();
  // const { logout } = useAuthContext();
  // if (error) {
  //   let e = error as AxiosError;
  //   if (e?.response?.status) {
  //     logout();
  //     navigate("/");
  //   }
  // }

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // marginTop: "5rem",
          height: "calc(100vh - 60px)"

        }}
      >
        {/* <h1>you are authenticated</h1>; */}
        {isLoading && <h1>loading...</h1>}
        {isSuccess && <h1>{data}</h1>}
        {isError && <h1>Error</h1>}
      </div>
    </>
  );
};

export default AppPage;
