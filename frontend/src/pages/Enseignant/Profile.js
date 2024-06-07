import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getCurrentUser } from "../../helpers";
import { Toaster, toast } from "sonner";
import StudentService from "../../Services/StudentService";

export default function ProfileEnseignant() {
  const [currentUser, setCurrentUser] = useState();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const [adresse, setAdresse] = useState("");
  const [date_naissance, setDate_naissance] = useState("");

  const [errors, setErrors] = useState({});
  const verifForm = () => {
    setErrors({});
    if (nom.length < 1) {
      setErrors({
        ...errors,
        nom: "le nom est obligatoire",
      });
      return false;
    }
    if (prenom.length < 1) {
      setErrors({
        ...errors,
        prenom: "le prenom est obligatoire",
      });
      return false;
    }
    if (adresse.length < 1) {
      setErrors({
        ...errors,
        adresse: "l'adresse est obligatoire",
      });
      return false;
    }
    if (date_naissance.length < 1) {
      setErrors({
        ...errors,
        date_naissance: "la date de naissance est obligatoire",
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    console.log("update declanched");
    if (verifForm()) {
      try {
        const res = await StudentService.updateProfile(
          localStorage.getItem("userId"),
          {
            nom,
            prenom,
            adresse,
            date_naissance,
          }
        );
        if (res.status === 200) {
          setCurrentUser(res.data);
          localStorage.setItem("fullname", prenom + " " + nom);
          toast.success("Profile mettre a jour.");
        }
      } catch (err) {
        console.log(err);
        toast.error("Erreur lors de la modification du profile.");
      }
    }
  };

  const getProfile = async () => {
    try {
      const res = await StudentService.getUser(localStorage.getItem("userId"));
      if (res.status === 200) {
        setCurrentUser(res.data);
        setDate_naissance(res.data?.date_naissance);
        setNom(res.data?.nom);
        setPrenom(res.data?.prenom);
        setAdresse(res.data?.adresse);
      }
    } catch (err) {}
  };
  useEffect(() => {
    getProfile();
    console.log("current user", currentUser);
  }, []);
  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="card">
          <div className="card-header">
            <h6>
              {" "}
              Espace Enseignant : Welcome{" "}
              <span className="text-primary">
                {localStorage.getItem("fullname")}{" "}
              </span>
            </h6>
          </div>
          <div className="card-body">
          <div>
              <Form onSubmit={updateProfile}>
                <Form.Group>
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  ></Form.Control>
                  {errors && errors.nom && (
                    <p className="text-danger"> {errors.nom} </p>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  ></Form.Control>
                   {errors && errors.prenom && (
                    <p className="text-danger"> {errors.prenom} </p>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date de naissance</Form.Label>
                  <Form.Control
                    type="date"
                    value={date_naissance}
                    onChange={(e) => setDate_naissance(e.target.value)}
                  ></Form.Control>
                   {errors && errors.date_naissance && (
                    <p className="text-danger"> {errors.date_naissance} </p>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                  ></Form.Control>
                   {errors && errors.adresse && (
                    <p className="text-danger"> {errors.adresse} </p>
                  )}
                </Form.Group>
                <div className="d-flex justify-content-end pt-3">
                  <Button type="submit">Mettre a jour </Button>
                </div>
              </Form>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}
