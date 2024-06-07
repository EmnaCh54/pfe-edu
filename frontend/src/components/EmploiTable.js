// Layout.js
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";
import { toast } from "sonner";
import { useState } from "react";
import EmploiService from "../Services/Emploi";
import { convertDate } from "../helpers";

export default function EmploiTable(props) {
  const { data, refreshData } = props;
  const deleteData = async (dataId) => {
    try {
      const res = await EmploiService.delete(dataId);
      if (res.status === 200) {
        console.log(res);
        toast.success(`Emploi supprime avec succes.`);
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
        <h3>Liste des emplois</h3>
        <Table responsive>
          <thead>
            <tr>
              <th> # </th>
              <th> Matiere </th>
              <th> Date </th>

              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {/* {JSON.stringify(data)} */}
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.matiere}</td>
                <td>{convertDate(item.date)}</td>

                <td>
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
    </>
  );
}
