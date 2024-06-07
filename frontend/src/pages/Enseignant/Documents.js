// Layout.js
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";

import { toast } from "sonner";

import { useState, useEffect } from "react";
import DocumentTable from "../../components/DocumentTable";
import DocumentService from "../../Services/Document";
export default function Documents() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [documents, setDocuments] = useState([]);
  const addDocument = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("user", localStorage.getItem("userId"));

    try {
      const res = await DocumentService.add(formData);
      if (res.status === 200) {
        handleClose();
        setName("");
        setDescription("");
        setFile("");
        toast.success(`Document ajoute avec success`);
        getAllDocuments();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du document.");
    }
  };

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state

    setFile(event.target.files[0]);
  };

  const getAllDocuments = async () => {
    try {
      const res = await DocumentService.getAllByUser(
        localStorage.getItem("userId")
      );
      if (res.status === 200) {
        console.log(res);
        setDocuments(res.data);
        // setUpdate((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur .");
    }
  };
  useEffect(() => {
    getAllDocuments();
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
                <i className="fa-solid fa-circle-plus"></i> Ajouer un document
              </a>
            </div>
            <hr />
            <DocumentTable
              data={documents}
              refreshData={() => getAllDocuments()}
            />
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={addDocument}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un document</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label> Nom </Form.Label>

              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Description </Form.Label>

              <Form.Control
                as={"textarea"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Document </Form.Label>

              <Form.Control
                type={"file"}
                onChange={(e) => onFileChange(e)}
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
