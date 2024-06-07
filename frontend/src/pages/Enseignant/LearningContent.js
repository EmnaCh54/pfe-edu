// Layout.js
import { useEffect, useState } from "react";
import LearningContentService from "../../Services/LearningContent";
import { Toaster, toast } from "sonner";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Modal,
  Nav,
  Row,
} from "react-bootstrap";
import ContentEducatifTable from "../../components/ContentEducatifTable";
import NotifService from "../../Services/Notification";
import DocumentService from "../../Services/Document";
export default function LearningContent() {
  const [type_contenus, setType_contenus] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [niveau_scolaire, setNiveauScolaire] = useState("");
  const [fichier_joint, setFichierJoint] = useState("test");
  const [image, setImage] = useState("ttest");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [active, setActive] = useState("cours");
  const [data, setData] = useState([]);

  const [update, setUpdate] = useState(0);

  const resetForm = () => {
    setType_contenus("");
    setTitre("");
    setDescription("");
    setTrimestre("");
    setNiveauScolaire("");
  };
  const addLearningContent = async (e) => {
    e.preventDefault();
    try {
      const res = await LearningContentService.add({
        type_contenus,
        titre,
        description,
        trimestre,
        niveau_scolaire,
        ...{ reporteur: localStorage.getItem("userId") },
        fichier_joint,
        image,
      });
      if (res.status === 201) {
        handleClose();
        resetForm();
        toast.success(`${type_contenus} ajoute avec success`);
        getAllContent();
        const res1 = await NotifService.add({
          text: `${localStorage.getItem(
            "fullname"
          )} a ajoutee un contenu educatif de type ${type_contenus}`,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };
  const getAllContent = async () => {
    try {
      const res = await LearningContentService.getAllContent(active);
      if (res.status === 200) {
        console.log(res);
        setData(res.data);
        //console.log("courses", courses);
        setUpdate((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };

  const uploadFile = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("user", localStorage.getItem("userId"));

    try {
      const res = await DocumentService.add(formData);
      if (res.status === 200) {
        setFichierJoint(res.data.url);
        toast.success(`Document ajoute avec success`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du document.");
    }
  };

  useEffect(() => {
    getAllContent();
  }, [active]);

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="card">
          <div className="card-header">
            {" "}
            <h6>
              {" "}
              Espace Enseignant : Welcome{" "}
              <span className="text-primary">
                {localStorage.getItem("fullname")}{" "}
              </span>
            </h6>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <a className="btn btn-success text-white" onClick={handleShow}>
                <i className="fa-solid fa-circle-plus"></i> Ajouer un contenu
                educatif{" "}
              </a>
            </div>
            <hr />
            <ButtonGroup size="md" className="mb-2">
              <Button
                onClick={() => setActive("cours")}
                variant="secondary"
                className={active === "cours" && "active"}
              >
                Cours
              </Button>
              <Button
                onClick={() => setActive("exercices")}
                variant="secondary"
                className={active === "exercices" && "active"}
              >
                Exercices
              </Button>
              <Button
                onClick={() => setActive("devoirs")}
                className={active === "devoirs" && "active"}
                variant="secondary"
              >
                Devoirs
              </Button>
              <Button
                onClick={() => setActive("tests")}
                className={active === "tests" && "active"}
                variant="secondary"
              >
                Tests
              </Button>
            </ButtonGroup>
            <hr />

            <ContentEducatifTable
              data={data} // { cours , tests , exercices ... }
              type={active} //
              refreshData={() => getAllContent()}
            />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={addLearningContent}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un contenu educatif</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label> Type de contenu </Form.Label>
                  <select
                    className="form-control"
                    value={type_contenus}
                    onChange={(e) => setType_contenus(e.target.value)}
                  >
                    <option value="">== Choisir un type de contenu ==</option>
                    <option value="Cours">Cour</option>
                    <option value="Tests">Test</option>
                    <option value="Exercice">Exercice</option>
                    <option value="Devoir">Devoir</option>
                  </select>
                </Form.Group>
              </Col>
              <Col md={6}>
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label> Titre </Form.Label>

                  <Form.Control
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label> Description </Form.Label>

              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Fichier </Form.Label>

              <Form.Control
                type="file"
                onChange={(e) => uploadFile(e)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Niveau Scolaire</Form.Label>

                  <select
                    className="form-control"
                    value={niveau_scolaire}
                    onChange={(e) => setNiveauScolaire(e.target.value)}
                  >
                    <option value="">== Choisir un niveau scolaire ==</option>
                    <option value="1">1 ere année primaire</option>
                    <option value="2">2 éme année primaire</option>
                    <option value="3">3 éme année primaire</option>
                    <option value="4">4 éme année primaire</option>
                    <option value="5">5 éme année primaire</option>
                    <option value="6">6 éme année primaire</option>
                    <option value="7">7 éme année</option>
                    <option value="8">8 éme année</option>
                    <option value="9">9 éme année</option>
                    <option value="1s">1 ére année secondaire</option>
                    <option value="2s">2 éme année secondaire</option>
                    <option value="3s">3 éme année secondaire</option>
                    <option value="4s">Baccalauriat</option>
                  </select>
                </Form.Group>
              </Col>
              <Col md={6}>
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label> Trimestre </Form.Label>

                  <select
                    className="form-control"
                    value={trimestre}
                    onChange={(e) => setTrimestre(e.target.value)}
                  >
                    <option value="">
                      == Choisir un numero du trimestre ==
                    </option>
                    <option value="s1">Trimestre 1</option>
                    <option value="s2">Trimestre 2</option>
                    <option value="s3">Trimestre 3</option>
                  </select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
