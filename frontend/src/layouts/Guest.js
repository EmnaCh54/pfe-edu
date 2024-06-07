import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FloatingButton from "../pages/FloatingButton";

function Guest() {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <>
      <header class="fixed-top p-3 text-bg-dark">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <svg
                class="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              ></svg>
            </a>

            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="#" class="nav-link px-2 text-secondary">
                  <i class="fa-solid fa-house"></i> Acceuil
                </a>
              </li>
              <li>
                <a href="#about" class="nav-link px-2 text-white">
                  <i class="fa-solid fa-circle-question"></i> A propos
                </a>
              </li>

              <li>
                <a href="#temoignages" class="nav-link px-2 text-white">
                  <i class="fa-solid fa-star"></i> Témoignages
                </a>
              </li>
              <li>
                <a href="#contact" class="nav-link px-2 text-white">
                  <i class="fa-solid fa-envelope"></i> Contact
                </a>
              </li>
            </ul>
            {localStorage.getItem("token") == null ||
            localStorage.getItem("token") == undefined ? (
              <div class="text-end">
                <button
                  type="button"
                  class="btn btn-outline-light me-2"
                  onClick={() => navigate("/login")}
                >
                  <i class="fa-solid fa-right-to-bracket"></i>
                  {` `}Connexion
                </button>
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => navigate("/register")}
                >
                  <i className="fa-solid fa-user-plus"></i> {` `}
                  Inscription
                </button>
              </div>
            ) : (
              <button
                type="button"
                class="btn btn-warning"
                onClick={() =>
                  navigate(`${localStorage.getItem("role").toLowerCase()}`)
                }
              >
                Mon compte
              </button>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <FloatingButton />
    </>
  );
}

export default Guest;
