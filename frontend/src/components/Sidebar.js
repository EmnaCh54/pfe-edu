// Layout.js
import { Link } from "react-router-dom";
import "./sidebar.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Sidebar(props) {
  const { currentUser } = props;
  const [role, setRole] = useState(localStorage.getItem("role"));
  const location = useLocation();

  const renderSidebarLinks = () => {
    console.log("role", currentUser?.role);
    switch (role) {
      case "Admin":
        return (
          <ul>
            <li className={isActive("/admin") ? "active" : ""}>
              <i className="fa-solid fa-house"></i>
              <Link to={"/admin"}>Dashboard</Link>
            </li>
            <li className={isActive("/admin/users") ? "active" : ""}>
              <i className="fa-solid fa-users"></i>
              <Link to={"/admin/users"}>Utilisateurs</Link>
            </li>
          </ul>
        );
      case "Enseignant":
        return (
          <ul>
            <li className={isActive("/enseignant") ? "active" : ""}>
              <i className="fa-solid fa-house"></i>
              <Link to={"/enseignant"}>Home</Link>
            </li>
            <li
              className={
                isActive("/enseignant/learning/content") ? "active" : ""
              }
            >
              <i className="fa-solid fa-folder-tree"></i>
              <Link to={"/enseignant/learning/content"}>Contenu Educatif</Link>
            </li>
            <li className={isActive("/enseignant/corrections") ? "active" : ""}>
              <i className="fa-solid fa-file-pen"></i>
              <Link to={"/enseignant/corrections"}>Corrections</Link>
            </li>
            <li className={isActive("/enseignant/quizs") ? "active" : ""}>
              <i className="fa-solid fa-feather-pointed"></i>
              <Link to={"/enseignant/quizs"}>Quizs</Link>
            </li>
            <li className={isActive("/enseignant/documents") ? "active" : ""}>
              <i className="fa-regular fa-file-pdf"></i>
              <Link to={"/enseignant/documents"}>Documents</Link>
            </li>
          </ul>
        );
      case "Etudiant":
        return (
          <ul>
            <li className={isActive("/etudiant") ? "active" : ""}>
              <i className="fa-solid fa-house"></i>
              <Link to={"/etudiant"}>Home</Link>
            </li>
            <li
              className={isActive("/etudiant/learning/content") ? "active" : ""}
            >
              <i className="fa-solid fa-folder-tree"></i>
              <Link to={"/etudiant/learning/content"}>Contenu Educatif</Link>
            </li>
            <li className={isActive("/etudiant/emplois") ? "active" : ""}>
              <i className="fa-solid fa-file-pen"></i>
              <Link to={"/etudiant/emplois"}>Emplois</Link>
            </li>
            <li className={isActive("/etudiant/corrections") ? "active" : ""}>
              <i className="fa-solid fa-file-pen"></i>
              <Link to={"/etudiant/corrections"}>Corrections</Link>
            </li>
            <li className={isActive("/etudiant/quizs") ? "active" : ""}>
              <i className="fa-solid fa-feather-pointed"></i>
              <Link to={"/etudiant/quizs"}>Quizs</Link>
            </li>
            <li>
              <i className="fa-regular fa-file-pdf"></i>
              <Link to={"/etudiant/documents"}>Documents</Link>
            </li>
          </ul>
        );

      default:
        return (
          <ul>
            <li className={isActive("/parent") ? "active" : ""}>
              <i className="fa-solid fa-house"></i>
              <Link to={"/parent"}>Home</Link>
            </li>
            <li
              className={isActive("/parent/learning/content") ? "active" : ""}
            >
              <i className="fa-solid fa-folder-tree"></i>
              <Link to={"/parent/learning/content"}>Contenu Educatif</Link>
            </li>
          </ul>
        );
    }
  };

  const isActive = (path) => location.pathname === path;
  useEffect(() => {
    console.log(location.pathname);
  }, [location, currentUser]);
  return (
    <div>
      <header className="sidebar">
        <Link to={"/"}>
          <h3 className="text-center pt-4 logo">EducatioNET</h3>
        </Link>
        <nav>{role && renderSidebarLinks()}</nav>
      </header>
    </div>
  );
}
