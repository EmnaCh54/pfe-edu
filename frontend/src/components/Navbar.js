// Layout.js
import { useNavigate } from "react-router-dom";
import "./navbar.scss";
import { Button, Badge } from "react-bootstrap";
import { useState } from "react";
export default function Navbar(props) {
  const navigate = useNavigate();
  const { user, notifications } = props;
  const [display, setDisplay] = useState(false);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const showNotif = () => {
    setDisplay(true);
  };
  return (
    <nav className="navbar fixed-top d-flex justify-content-end w-100">
      <div style={{ position: "relative" }}>
        {notifications.length > 0 &&
        ["Parent", "Etudiant"].includes(localStorage.getItem("role")) ? (
          <Button variant="primary" onClick={() => showNotif()}>
            <i className="fa-solid fa-bell"></i>{" "}
            <Badge bg="danger">{notifications.length} </Badge>
            <span className="visually-hidden">unread messages</span>
          </Button>
        ) : (
          <div>
            {" "}
            <i className="fa-solid fa-bell"></i>
          </div>
        )}

        {display ? (
          <div
            className="notifications-block bg-white"
            onMouseLeave={() => setDisplay(false)}
          >
            {notifications.map((n) => (
              <div
                onClick={() =>
                  navigate(`/${localStorage.getItem("role")}/learning/content`)
                }
              >
                {" "}
                <i className="fa-solid fa-bell"></i> {n.text}{" "}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="user-dropdown">
        <button className="dropbtn">
          <i className="fa-solid fa-user"></i>{" "}
          {localStorage.getItem("fullname")}
        </button>
        <div className="user-dropdown-content">
          <a
            role="button"
            onClick={() => navigate(`/${localStorage.getItem("role")}/profile`)}
          >
            {" "}
            <i className="fa-solid fa-address-card"></i> Profile
          </a>
          <a onClick={logout} role="button">
            <i className="fa-solid fa-right-from-bracket"></i> Deconnexion
          </a>
        </div>
      </div>
    </nav>
  );
}
