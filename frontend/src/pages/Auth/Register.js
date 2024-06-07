// Layout.js
import AuthService from "../../Services/Auth";
import bgLogin from "../../assets/bg-login.jpg";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { getCurrentUser } from "../../helpers";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mot_de_passe, setPassword] = useState("");
  const [adresse, setAdresse] = useState("");
  const [role, setRole] = useState("");
  const [date_naissance, setDate_naissance] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [niveau_educatif, setNiveau_educatif] = useState("");
  const [inscriptionNumber, setInscriptionNumber] = useState("");

  const [errors, setErrors] = useState({});

  const verifForm = () => {
    if (nom.length < 1) {
      setErrors({ nom: "Nom est obligatoire" });
      return false;
    }
    if (prenom.length < 1) {
      setErrors({ prenom: "Prenom est obligatoire" });
      return false;
    }
    if (email.length < 1) {
      setErrors({ email: "Email est obligatoire" });
      return false;
    }
    if (mot_de_passe.length < 1) {
      setErrors({ mot_de_passe: "Mot de passe est obligatoire" });
      return false;
    }
    if (adresse.length < 1) {
      setErrors({ adresse: "Adresse est obligatoire" });
      return false;
    }

    if (date_naissance.length < 1) {
      setErrors({ date_naissance: "Date de naissance est obligatoire" });
      return false;
    }
    if (niveau_educatif.length < 1) {
      setErrors({ niveau_educatif: "Niveau Educatif est obligatoire" });
      return false;
    }

    if (role === "Enseignant" && specialite.length < 1) {
      setErrors({ specialite: "Specialite est obligatoire" });
      return false;
    }

    if (role === "Parent" && inscriptionNumber.length < 1) {
      setErrors({ inscriptionNumber: "Numero inscription est obligatoire" });
      return false;
    }

    return true;
  };

  const signup = async (e) => {
    e.preventDefault();
    if (verifForm()) {
      try {
        const res = await AuthService.register({
          nom,
          prenom,
          mot_de_passe,
          email,
          adresse,
          date_naissance,
          role,
          specialite,
          inscriptionNumber,
          niveau_educatif,
        });
        // if (res.status === 201) {
        // toast.success(
        //   ` Compte ${role} créé avec succes , cette page sera redirigé vers la page connexion.`
        // );
        // setTimeout(() => navigate("/login"), 3000);
        if (res.status === 200) {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem(
            "fullname",
            res.data.prenom + ` ` + res.data.nom
          );
          navigate(`/${res.data.role.toLowerCase()}`);
        }
        // }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message || "Verifier Vos Coordones");
      }
    }
  };
  useEffect(() => {
    setUser(getCurrentUser());
    if (user) {
      navigate(`/${localStorage.getItem("role").toLowerCase()}`);
    }
  }, [user]);
  return (
    <>
      <Toaster richColors />

      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Creer votre compte</h2>
              <small>Et explorer des fonctionalites</small>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div
                  className="img"
                  style={{ backgroundImage: `url(${bgLogin})` }}
                ></div>
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Inscription</h3>
                    </div>
                    <div className="w-100">
                      <p className="social-media d-flex justify-content-end">
                        <a
                          href="#"
                          className="social-icon d-flex align-items-center justify-content-center"
                        >
                          <span className="fa-brands fa-facebook"></span>
                        </a>
                        <a
                          href="#"
                          className="social-icon d-flex align-items-center justify-content-center"
                        >
                          <span className="fa-brands fa-twitter"></span>
                        </a>
                      </p>
                    </div>
                  </div>
                  <form onSubmit={signup}>
                    <div className="form-group">
                      <label>Vous etes un ?</label>
                      <select
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="Enseignant">Enseignant</option>
                        <option value="Etudiant">Etudiant</option>
                        <option value="Parent">Parent</option>
                      </select>
                    </div>
                    <div className="form-group mb-3">
                      <label>Nom</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                      />
                      {errors && errors.nom && (
                        <p className="text-danger"> {errors.nom} </p>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <label>Prenom</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Prenom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                      />
                      {errors && errors.prenom && (
                        <p className="text-danger"> {errors.prenom} </p>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors && errors.email && (
                        <p className="text-danger"> {errors.email} </p>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={mot_de_passe}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors && errors.mot_de_passe && (
                        <p className="text-danger"> {errors.mot_de_passe} </p>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <label>Adresse</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Adresse"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                      />
                      {errors && errors.adresse && (
                        <p className="text-danger"> {errors.adresse} </p>
                      )}
                    </div>
                    {role && role === "Enseignant" && (
                      <div className="form-group mb-3">
                        <label>Speciality</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Speciality"
                          value={specialite}
                          onChange={(e) => setSpecialite(e.target.value)}
                        />
                        {errors && errors.specialite && (
                          <p className="text-danger"> {errors.specialite} </p>
                        )}
                      </div>
                    )}

                    {role && role === "Parent" && (
                      <div className="form-group mb-3">
                        <label>Numéro Inscription Étudiant</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="numero_inscription"
                          value={inscriptionNumber}
                          onChange={(e) => setInscriptionNumber(e.target.value)}
                        />
                        {errors && errors.inscriptionNumber && (
                          <p className="text-danger">
                            {" "}
                            {errors.inscriptionNumber}{" "}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="form-group mb-3">
                      <label>Date de naissance</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Date de naissance ..."
                        value={date_naissance}
                        onChange={(e) => setDate_naissance(e.target.value)}
                      />
                      {errors && errors.date_naissance && (
                        <p className="text-danger"> {errors.date_naissance} </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Niveau Educatif</label>
                      <select
                        className="form-control"
                        value={niveau_educatif}
                        onChange={(e) => setNiveau_educatif(e.target.value)}
                      >
                        <option value="">
                          == Choisir un niveau scolaire ==
                        </option>
                        <option value="1">1er anne primaire</option>
                        <option value="2">2er anne primaire</option>
                        <option value="3">3er anne primaire</option>
                        <option value="4">4er anne primaire</option>
                        <option value="5">5er anne primaire</option>
                        <option value="6">6er anne primaire</option>
                        <option value="7">7eme anne</option>
                        <option value="8">8eme anne</option>
                        <option value="9">9eme anne</option>
                        <option value="1s">1er anne secondaire</option>
                        <option value="2s">2er anne secondaire</option>
                        <option value="3s">3er anne secondaire</option>
                        <option value="4s">Baccaloruat</option>
                      </select>
                      {errors && errors.niveau_educatif && (
                        <p className="text-danger">
                          {" "}
                          {errors.niveau_educatif}{" "}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary rounded submit px-3"
                      >
                        Creer votre compte
                      </button>
                    </div>
                  </form>
                  <p className="text-center">
                    Vous avez deja un compte?{" "}
                    <Link to={"/login"}>Connexion</Link>
                  </p>
                  <p className="text-center">
                    <Link to={"/"}>Revenir vers l'acceuil</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
