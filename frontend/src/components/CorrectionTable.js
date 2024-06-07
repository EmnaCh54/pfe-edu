// Layout.js
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LearningContent from "../Services/LearningContent";
import CorrectionService from "../Services/Corrections";
import { useState } from "react";
export default function TableData(props) {
  const { data, refreshData, type } = props;

  const [titre, setTitre] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [niveau_scolaire, setNiveauScolaire] = useState("");
  const [fichier_joint, setFichierJoint] = useState("test");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedItem, setSelectedItem] = useState({});

  const selectItem = (item) => {
    console.log("item", item);
    setSelectedItem(item);
    setTitre(item?.titre);
    setTrimestre(item?.trimestre);
    setNiveauScolaire(item?.niveau_scolaire);
  };

  const resetForm = () => {
    setTitre("");
    setTrimestre("");
    setNiveauScolaire("");
  };
  const editCorrection = async (e) => {
    e.preventDefault();
    try {
      const res = await CorrectionService.update(selectedItem._id, {
        titre,
        trimestre,
        niveau_scolaire,
        ...{ enseignant_id: localStorage.getItem("userId") },
        fichier_joint,
      });
      if (res.status === 200) {
        handleClose();
        resetForm();
        toast.success(`Correction mettre a jour avec success`);
        refreshData();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };

  const deleteData = async (dataId) => {
    try {
      if (type === "correction") {
        const res = await CorrectionService.delete(dataId);
        if (res.status === 200) {
          console.log(res);
          toast.success(`${type} supprime avec succes.`);
          refreshData();
        }
      } else {
        const res = await CorrectionService.delete(dataId);
        if (res.status === 200) {
          console.log(res);
          toast.success(`${type} supprime avec succes.`);
          refreshData();
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };

  return (
    <>
      <div className="table">
        <h3>Liste des {type}</h3>
        <Table responsive>
          <thead>
            <tr>
              <th> # </th>
              <th> Titre </th>
              <th> Niveau </th>
              <th> Trimestre </th>
              <th> Fichier </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {/* {JSON.stringify(data)} */}
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.titre}</td>
                <td>{item.niveau_scolaire}</td>
                <td>{item.trimestre}</td>
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
        <Form onSubmit={editCorrection}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier Correction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label> Titre </Form.Label>

              <Form.Control
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
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
              Modifier
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
