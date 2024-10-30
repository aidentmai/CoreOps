import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router";
import { UserProvider } from "./Context/UserAuth";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <UserProvider>
        <div className="main-container">
          <Outlet />
          <ToastContainer />
        </div>
      </UserProvider>
    </>
  );
}

export default App;
