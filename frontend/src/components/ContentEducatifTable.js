// Layout.js
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LearningContent from "../Services/LearningContent";
import { convertDate } from "../helpers";
import { useState } from "react";
export default function ContentEducatifTable(props) {
  const navigate = useNavigate();
  const { data, refreshData, type } = props;

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

  const [selectedItem, setSelectedItem] = useState({});

  const selectItem = (item) => {
    console.log("item", item);
    setSelectedItem(item);
    setType_contenus(item?.contenu_id?.type_contenus);
    setTitre(item?.contenu_id?.titre);
    setDescription(item?.contenu_id?.description);
    setTrimestre(item?.contenu_id?.trimestre);
    setNiveauScolaire(item?.contenu_id?.niveau_scolaire);
  };

  const resetForm = () => {
    setType_contenus("");
    setTitre("");
    setDescription("");
    setTrimestre("");
    setNiveauScolaire("");
  };
  const editLearningContent = async (e) => {
    e.preventDefault();
    try {
      const res = await LearningContent.update(type, selectedItem?._id, {
        type_contenus,
        titre,
        description,
        trimestre,
        niveau_scolaire,
        ...{ reporteur: localStorage.getItem("userId") },
        fichier_joint,
        image,
      });
      if (res.status === 200) {
        handleClose();
        resetForm();
        toast.success(`${type_contenus} mettre a jour avec success`);
        refreshData();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };

  const deleteData = async (dataId) => {
    try {
      const res = await LearningContent.delete(type, dataId);
      if (res.status === 200) {
        console.log(res);
        toast.success("Contenu educatif supprime avec succes.");
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
        <h3>Liste des {type}</h3>
        <Table responsive>
          <thead>
            <tr>
              <th> # </th>
              <th> Titre </th>
              <th> Document </th>
              <th> Niveau </th>
              <th> Trimestre </th>
              <th> Date d'ajout </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {/* {JSON.stringify(data)} */}
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.contenu_id.titre}</td>
                <td>
                  {" "}
                  <a
                    className="btn btn-primary"
                    href={`http://localhost:4000${item.contenu_id.fichier_joint}`}
                  >
                    Telecharger
                  </a>{" "}
                </td>
                <td>{item.contenu_id.niveau_scolaire}</td>
                <td>{item.contenu_id.trimestre}</td>
                <td>{convertDate(item.contenu_id.date_pub)}</td>
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
        <Form onSubmit={editLearningContent}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier un contenu educatif</Modal.Title>
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
