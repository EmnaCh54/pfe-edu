import { Toaster } from "sonner";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../helpers";
import NotifService from "../Services/Notification";
import FloatingButton from "../pages/FloatingButton";

function Layout() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [notifications, setNotifications] = useState([]);
  const getNotifications = async () => {
    try {
      const res = await NotifService.getAllContent();
      if (res.status === 200) {
        console.log(res);
        setNotifications(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(currentUser);
    if (
      localStorage.getItem("token") == null ||
      localStorage.getItem("token") == undefined
    ) {
      navigate("/login");
    }
    getNotifications();
  }, []);
  return (
    <div>
      <Toaster richColors />
      <div className="d-flex">
        <Sidebar user={currentUser} />
        <div style={{ width: "calc(100vw - 220px)" }}>
          <Navbar user={currentUser} notifications={notifications} />
          <div
            style={{
              width: "98%",
              zIndex: "0",
              marginLeft: "220px",
              marginTop: "100px",
            }}
            className="p-3"
          >
            <Outlet />
          </div>
        </div>
      </div>
      <FloatingButton />
    </div>
  );
}

export default Layout;
