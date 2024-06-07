// Layout.js
import { Button, Form, Modal, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LearningContent from "../Services/LearningContent";
import { convertDate } from "../helpers";
import { useState } from "react";
import UserService from "../Services/User";
export default function UsersTable(props) {
  const navigate = useNavigate();
  const { data, refreshData } = props;
  const changeStatue = async (id, statue) => {
    if (
      window.confirm("Voulez-vous vraiment changer le statue d'utilisateur ?")
    ) {
      try {
        const res = await UserService.changeStatue(id, { statut: statue });
        if (res.status === 200) {
          refreshData();
          toast.success("Changement de statue d'utilisateur vers " + statue);
        }
      } catch (err) {
        console.log(err);
        toast.error("Erreur lors de l'ajout du cours educattif.");
      }
    }
  };
  return (
    <>
      <div className="table">
        <h3>Liste des Utilisateurs</h3>
        <Table responsive>
          <thead>
            <tr>
              <th> # </th>
              <th> Nom complet </th>
              <th> Email </th>
              <th> Adresse </th>
              <th> Role </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {/* {JSON.stringify(data)} */}
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.nom}</td>
                <td>{item.email}</td>
                <td>{item.adresse}</td>
                <td>
                  {" "}
                  <span className="badge bg-primary"> {item.role} </span>
                </td>
                <td>
                  {item.statut === "actif" ? (
                    <Button
                      variant="danger"
                      onClick={() => changeStatue(item._id, "inactif")}
                      className="btn-sm"
                    >
                      Desactiver
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => changeStatue(item._id, "actif")}
                      className="btn-sm"
                    >
                      Activer
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
