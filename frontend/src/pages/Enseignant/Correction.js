// Layout.js

import { useEffect, useState } from "react";
import TableData from "../../components/CorrectionTable";
import CorrectionService from "../../Services/Corrections";
import { toast } from "sonner";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Modal,
  Nav,
  Row,
} from "react-bootstrap";
import DocumentService from "../../Services/Document";
export default function Correction() {
  const [titre, setTitre] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [niveau_scolaire, setNiveauScolaire] = useState("");
  const [fichier_joint, setFichierJoint] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  const resetForm = () => {
    setTitre("");
    setTrimestre("");
    setNiveauScolaire("");
  };
  const addCorrection = async (e) => {
    e.preventDefault();
    try {
      const res = await CorrectionService.add({
        titre,
        trimestre,
        niveau_scolaire,
        ...{ enseignant_id: localStorage.getItem("userId") },
        fichier_joint,
      });
      if (res.status === 201) {
        handleClose();
        resetForm();
        toast.success(`Correction ajoute avec success`);
        getAllCorrections();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };
  const [corrections, setCorrections] = useState([]);
  const getAllCorrections = async () => {
    try {
      const res = await CorrectionService.getAllContent();
      if (res.status === 200) {
        console.log(res);
        setCorrections(res.data);
        // setUpdate((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur .");
    }
  };
  useEffect(() => {
    getAllCorrections();
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
            <div className="d-flex justify-content-end">
              <a className="btn btn-success text-white" onClick={handleShow}>
                <i className="fa-solid fa-circle-plus"></i> Ajouer une
                correction
              </a>
            </div>
            <hr />
            <TableData
              data={corrections}
              type={"correction"}
              refreshData={() => getAllCorrections()}
            />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={addCorrection}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un correction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label> Titre </Form.Label>

              <Form.Control
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
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
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
