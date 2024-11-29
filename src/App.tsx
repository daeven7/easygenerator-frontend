import "./App.css";
import SignUpPage from "./pages/SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignIn/SignIn";
import AppPage from "./pages/App/AppPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import "./global.scss";
import { CONSTANTS } from "./utils/constants.utils";

function App() {
  return (
    <div className="app">
      {/* <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<SignInPage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              {" "}
              <AppPage />{" "}
            </ProtectedRoute>
          }
        />
      </Routes> */}
      <Routes>
        <Route path={CONSTANTS.SIGN_UP_PAGE} element={<SignUpPage />} />
        <Route path={CONSTANTS.SIGN_IN_PAGE} element={<SignInPage />} />
        <Route
          path={CONSTANTS.APP_PAGE}
          element={
            <ProtectedRoute>
              {" "}
              <AppPage />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

// {/* <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div> */}
//       {/* <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p> */}
