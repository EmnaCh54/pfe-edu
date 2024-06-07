// Layout.js
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import QuizService from "../Services/Quiz";
import { useState } from "react";
import { convertDate } from "../helpers";
export default function QuizTableStudent(props) {
  const navigate = useNavigate();
  const { data, refreshData } = props;

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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
