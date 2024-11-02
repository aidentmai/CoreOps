import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router";
import { UserProvider } from "./Context/UserAuth";
import { ToastContainer } from "react-toastify";
import { NotificationsProvider } from "./Context/Notification";

function App() {
  return (
    <>
      <UserProvider>
        <NotificationsProvider>
          <Outlet />
          <ToastContainer />
        </NotificationsProvider>
      </UserProvider>
    </>
  );
}

export default App;
