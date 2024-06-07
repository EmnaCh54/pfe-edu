// Layout.js
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import QuizService from "../Services/Quiz";
import { useState } from "react";
import { convertDate } from "../helpers";
export default function QuizTable(props) {
  const navigate = useNavigate();
  const { data, refreshData } = props;

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [nb_questions, setNiveauScolaire] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedItem, setSelectedItem] = useState({});
  const selectItem = (item) => {
    console.log("item", item);
    setSelectedItem(item);
    setTitre(item?.titre);
    setDescription(item?.description);
    setNiveauScolaire(item?.nb_questions);
  };
  const resetForm = () => {
    setTitre("");
    setDescription("");
  };
  const editQuiz = async (e) => {
    e.preventDefault();
    try {
      const res = await QuizService.update(selectedItem._id, {
        titre,
        ...{ enseignant_id: localStorage.getItem("userId") },
        description,
        nb_questions,
      });
      if (res.status === 200) {
        handleClose();
        resetForm();
        toast.success(`Quiz mettre a jour avec success`);
        refreshData();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };

  const deleteData = async (dataId) => {
    try {
      const res = await QuizService.delete(dataId);
      if (res.status === 200) {
        console.log(res);
        toast.success(`Quiz supprime avec succes.`);
        refreshData();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };

  return (
    <>
      <div className="table">
        <h3>Liste des Quizs</h3>
        <Table responsive>
          <thead>
            <tr>
              <th> # </th>
              <th> Titre </th>
              <th> Fichier </th>
              <th> Description </th>
              <th> Date de creation </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {/* {JSON.stringify(data)} */}
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.titre}</td>
                <td>
                  {" "}
                  <a
                    className="btn btn-success"
                    href={`http://localhost:4000${item.fichier_joint}`}
                  >
                    {" "}
                    Telecharger{" "}
                  </a>{" "}
                </td>
                <td>{item.description}</td>
                <td>{convertDate(item.date_creation)}</td>

                <td>
                  <Button
                    onClick={() => {
                      selectItem(item);
                      handleShow();
                    }}
                    variant="success"
                    className="btn-sm"
                  >
                    {" "}
                    <i className="fa-solid fa-pencil"> </i>{" "}
                  </Button>
                  <Button
                    onClick={() => deleteData(item._id)}
                    variant="danger"
                    className="ms-2 btn-sm"
                  >
                    {" "}
                    <i className="fa-solid fa-trash"> </i>{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={editQuiz}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier un Quiz</Modal.Title>
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
              Modifier
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
