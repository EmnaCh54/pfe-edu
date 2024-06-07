// Layout.js

import { useEffect, useState } from "react";
import TableData from "../../components/CorrectionTable";
import QuizService from "../../Services/Quiz";
import { toast } from "sonner";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Modal,
  Nav,
  Row,
} from "react-bootstrap";

import QuizTableStudent from "../../components/QuizTableStudent";
export default function QuizsStudent() {
  const [quizs, setQuizs] = useState([]);
  const getAllQuizs = async () => {
    try {
      const res = await QuizService.getAllContent();
      if (res.status === 200) {
        console.log(res);
        setQuizs(res.data);
        // setUpdate((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur .");
    }
  };
  useEffect(() => {
    getAllQuizs();
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
            <QuizTableStudent data={quizs} refreshData={() => getAllQuizs()} />
          </div>
        </div>
      </div>
    </>
  );
}
