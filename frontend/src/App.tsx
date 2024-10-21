import "react-toastify/dist/ReactToastify.css"
import { Outlet } from "react-router";
import { UserProvider } from "./Context/UseAuth";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <UserProvider>
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
