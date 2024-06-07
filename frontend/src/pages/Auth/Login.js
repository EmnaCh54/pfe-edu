// Layout.js
import AuthService from "../../Services/Auth";
import bgLogin from "../../assets/bg-login.jpg";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { getCurrentUser } from "../../helpers";
export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [mot_de_passe, setPassword] = useState("");
  const signin = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthService.login({ email, mot_de_passe });
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("fullname", res.data.prenom + ` ` + res.data.nom);
        navigate(`/${res.data.role.toLowerCase()}`);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
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
              <h2 className="heading-section">Connecter a votre compte </h2>
              <small>et explorer votre dashboard</small>
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
                      <h3 className="mb-4">Connexion</h3>
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
                  <form onSubmit={signin} className="signin-form">
                    <div className="form-group mb-3">
                      <label className="label" for="name">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" for="password">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={mot_de_passe}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary rounded submit px-3"
                      >
                        Connecter
                      </button>
                    </div>
                    {/* <div className="form-group d-md-flex">
                      <div className="w-50 text-left">
                        <label className="checkbox-wrap checkbox-primary mb-0">
                          Remember Me
                          <input type="checkbox" checked />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="w-50 text-md-right">
                        <a href="#">Forgot Password</a>
                      </div>
                    </div> */}
                  </form>
                  <p className="text-center">
                    Vous n'avez pas un compte?{" "}
                    <Link to={"/register"}>Creer le</Link>
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
