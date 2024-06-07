// Layout.js
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import EmploiService from "../../Services/Emploi";
import EmploiTable from "../../components/EmploiTable";
export default function StudentEmplois() {
  const [matiere, setMatiere] = useState("");
  const [date, setDate] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [emplois, setEmplois] = useState([]);
  const addEmploi = async (e) => {
    e.preventDefault();

    try {
      const res = await EmploiService.add({
        matiere,
        date,
        ...{ etudiant: localStorage.getItem("userId") },
      });
      if (res.status === 201) {
        handleClose();
        setDate("");
        setMatiere("");
        toast.success(`Emploi ajoute avec success`);
        getAllEmplois();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du emploi.");
    }
  };

  const getAllEmplois = async () => {
    try {
      const res = await EmploiService.getAllByUser(
        localStorage.getItem("userId")
      );
      if (res.status === 200) {
        console.log(res);
        setEmplois(res.data);
        // setUpdate((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur .");
    }
  };
  useEffect(() => {
    getAllEmplois();
  }, []);
  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="card">
          <div className="card-header">
            <h6>
              {" "}
              Espace Etudiant : Welcome{" "}
              <span className="text-primary">
                {localStorage.getItem("fullname")}{" "}
              </span>
            </h6>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <a className="btn btn-success text-white" onClick={handleShow}>
                <i className="fa-solid fa-circle-plus"></i> Ajouer un emploi
              </a>
            </div>
            <hr />
            <EmploiTable data={emplois} refreshData={() => getAllEmplois()} />
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={addEmploi}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un emploi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label> Matiere </Form.Label>

              <Form.Control
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Date </Form.Label>

              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
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
