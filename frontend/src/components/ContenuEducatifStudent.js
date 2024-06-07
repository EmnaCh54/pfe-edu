// Layout.js
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LearningContent from "../Services/LearningContent";
import { convertDate } from "../helpers";
import { useState } from "react";
export default function ContentEducatifStudentTable(props) {
  const navigate = useNavigate();
  const { data, refreshData, type } = props;

  const [selectedItem, setSelectedItem] = useState({});

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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
