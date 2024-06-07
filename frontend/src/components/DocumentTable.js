// Layout.js
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";
import { toast } from "sonner";
import { useState } from "react";
import DocumentService from "../Services/Document";
import { Link } from "react-router-dom";
export default function DocumentTable(props) {
  const { data, refreshData } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const deleteData = async (dataId) => {
    try {
      const res = await DocumentService.delete(dataId);
      if (res.status === 200) {
        console.log(res);
        toast.success(`Document supprime avec succes.`);
        refreshData();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };
  const selectItem = (item) => {
    console.log("item", item);
    setSelectedItem(item);
    setName(item.name);
    setDescription(item.description);
  };
  const updateDocument = async (e) => {
    e.preventDefault();

    try {
      const res = await DocumentService.update(selectedItem._id, {
        name,
        description,
      });
      if (res.status === 200) {
        handleClose();
        setName("");
        setDescription("");

        toast.success(`Document mettre a jour avec success`);
        refreshData();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de la modification du document.");
    }
  };
  return (
    <>
      <div className="table">
        <h3>Liste des documents</h3>
        <Table responsive>
          <thead>
            <tr>
              <th> # </th>
              <th> Nom </th>
              <th> Descripion </th>

              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {/* {JSON.stringify(data)} */}
            {data.map(
              (item, index) =>
                item.description && (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`http://localhost:4000${item.url}`}>
                        {item.name}
                      </Link>
                    </td>
                    <td>{item.description}</td>

                    <td>
                      <Button
                        onClick={() => {
                          selectItem(item);
                          setShow(true);
                        }}
                        variant="success"
                        className="ms-2 btn-sm"
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
                )
            )}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={updateDocument}>
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
