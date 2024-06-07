// Layout.js
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";

export default function TableDataStudent(props) {
  const { data, refreshData, type } = props;

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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
