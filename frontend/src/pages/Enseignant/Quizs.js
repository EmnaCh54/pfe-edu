// Layout.js

import { useEffect, useState } from "react";
import TableData from "../../components/CorrectionTable";
import QuizService from "../../Services/Quiz";
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
import QuizTable from "../../components/QuizTable";
import DocumentService from "../../Services/Document";
export default function Quizs() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [nb_questions, setNiveauScolaire] = useState([]);
  const [fichier_joint, setFichierJoint] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetForm = () => {
    setTitre("");
    setDescription("");
  };
  const addQuiz = async (e) => {
    e.preventDefault();
    try {
      const res = await QuizService.add({
        titre,
        ...{ enseignant_id: localStorage.getItem("userId") },
        description,
        nb_questions,
        fichier_joint,
      });
      if (res.status === 201) {
        handleClose();
        resetForm();
        toast.success(`Quiz ajoute avec success`);
        getAllQuizs();
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
  const [quizs, setQuizs] = useState([]);
  const getAllQuizs = async () => {
    try {
      const res = await QuizService.getAllContent();
      if (res.status === 200) {
        console.log(res);
        setQuizs(res.data);
        // setUpdate((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur .");
    }
  };
  useEffect(() => {
    getAllQuizs();
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
                <i className="fa-solid fa-circle-plus"></i> Ajouer un quiz
              </a>
            </div>
            <hr />
            <QuizTable data={quizs} refreshData={() => getAllQuizs()} />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={addQuiz}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un Quiz</Modal.Title>
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
            <Form.Group className="mb-3">
              <Form.Label> Description </Form.Label>

              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
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
