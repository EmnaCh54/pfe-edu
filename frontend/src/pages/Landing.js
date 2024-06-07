import React from "react";
import bg from "../assets/bg-1.jpg";
import { useNavigate } from "react-router-dom";
import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
export default function () {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ marginTop: "70px" }} class="container py-4">
        <div class="p-5 mb-4 bg-body-tertiary rounded-3">
          <div id="about"
            class="container-fluid p-0"
            style={{
              backgroundImage: `url(${bg})`,
            }}
          >
            <div
              className="p-5"
              style={{
                backgroundColor: "rgba(255,255,255,.8)",
                width: "100%",
                height: "100%",
              }}
            >
              <h1 class="display-5 fw-bold text-primary">
                {" "}
                <i class="fa-solid fa-school-flag"></i> {` `} EducatioNET
              </h1>
              <hr />
              <p class="col-md-12 fs-4">
                Découvrez EducatioNET, une plateforme complète et intégrée
                conçue pour faciliter le suivi continu et la communication entre
                les étudiants, les parents et les enseignants. EducatioNET
                rassemble tous les acteurs éducatifs dans un environnement
                numérique fluide, améliorant l'expérience d'apprentissage grâce
                à une interaction en temps réel, un accès facile aux ressources
                et un suivi efficace des progrès.
                <br />
                <br />
                EducatioNET est la solution ultime pour l'éducation moderne,
                comblant le fossé entre la maison et l'école, et assurant que
                chaque étudiant reçoive l'attention et le soutien nécessaires
                pour réussir. Rejoignez EducatioNET aujourd'hui et transformez
                votre expérience éducative !
              </p>
              <button
                class="btn btn-primary btn-lg"
                type="button"
                onClick={() => navigate("/register")}
              >
                <i className="fa-solid fa-circle-plus"></i> Créer votre compte
              </button>
            </div>
          </div>
        </div>

        <div class="row align-items-md-stretch">
          <div class="col-md-6">
            <div class="h-100 p-5 text-bg-dark rounded-3">
              <h1 className="text-center mb-3">
                {" "}
                <i class="fa-solid fa-graduation-cap"></i>{" "}
              </h1>
              <h2>Espace Étudiants</h2>
              <p>
                L'Espace Étudiants sur EducatioNET est conçu pour offrir aux
                étudiants un environnement d'apprentissage interactif, intuitif
                et enrichissant. Cet espace personnalisé permet aux étudiants de
                gérer leurs cours, de suivre leurs progrès et de communiquer
                facilement avec leurs enseignants et camarades.
              </p>
              <button
                class="btn btn-outline-light"
                type="button"
                onClick={() => navigate("/login")}
              >
                Acceder a votre espace
              </button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="h-100 p-5 bg-body-tertiary border rounded-3">
              <h1 className="text-center mb-3">
                {" "}
                <i class="fa-solid fa-chalkboard-user"></i>{" "}
              </h1>

              <h2>Espace Enseignants</h2>
              <p>
                L'Espace Enseignants sur EducatioNET est conçu pour offrir aux
                enseignants un ensemble complet d'outils et de ressources pour
                gérer leurs cours, suivre les progrès des étudiants et faciliter
                la communication avec les parents et les étudiants. Cet espace
                personnalisé aide les enseignants à optimiser leur temps et à
                améliorer l'efficacité de leur enseignement.
              </p>
              <button
                class="btn btn-outline-secondary"
                type="button"
                onClick={() => navigate("/login")}
              >
                Acceder a votre espace
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5" id="temoignages">
        <div className="col-12">
          <hr />
          <h2 className="my-2 text-center">Témoignages</h2>
          <hr />
        </div>
        <div class="row">
          <div class="col-lg-4 text-center">
            <div
              style={{ width: "150px", height: "150px" }}
              className="rounded-circle overflow-hidden mx-auto"
            >
              <img src={user1} width="150" />
            </div>

            <h6 class="fw-normal mt-2">
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star"></span>
            </h6>
            <h5>Ahmed Ben Ali</h5>
            <p>
              "Cette plateforme m'a permis de suivre des cours à mon propre
              rythme. Les ressources disponibles sont incroyablement utiles et
              le support est toujours là pour répondre à mes questions. Une
              expérience d'apprentissage exceptionnelle !"
            </p>
          </div>
          <div class="col-lg-4 text-center">
            <div
              style={{ width: "150px", height: "150px" }}
              className="rounded-circle overflow-hidden mx-auto"
            >
              <img src={user2} width="150" />
            </div>

            <h6 class="fw-normal mt-2">
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star"></span>
            </h6>
            <h5>Lucie Martin</h5>
            <p>
              "Je suis très satisfait des résultats que j'ai obtenus grâce à
              cette plateforme. Les enseignants sont très compétents et le
              contenu est toujours à jour. J'ai pu préparer mes examens avec
              confiance et succès."
            </p>
          </div>
          <div class="col-lg-4 text-center">
            <div
              style={{ width: "150px", height: "150px" }}
              className="rounded-circle overflow-hidden mx-auto"
            >
              <img src={user3} width="150" />
            </div>

            <h6 class="fw-normal mt-2">
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star text-warning"></span>
              <span className="fa-solid fa-star"></span>
            </h6>
            <h5>Marie Dupont</h5>
            <p>
              "Grâce à cette plateforme, j'ai pu améliorer mes compétences en
              mathématiques de manière significative. Les cours sont clairs et
              les exercices m'ont beaucoup aidée. Je recommande fortement !"
            </p>
          </div>
        </div>
      </div>
      <div class="container mt-5" id="contact">
        <hr />
        <h2 className="text-center">Contact Us</h2>
        <hr />
        <form>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <input
              type="text"
              class="form-control"
              id="subject"
              placeholder="Enter the subject"
            />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              class="form-control"
              id="message"
              rows="5"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="container">
        <footer class="pt-3 mt-4 text-body-secondary border-top">
          &copy; 2024
        </footer>
      </div>
    </>
  );
}
