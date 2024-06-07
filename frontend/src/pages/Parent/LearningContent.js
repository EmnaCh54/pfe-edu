// Layout.js
import { useEffect, useState } from "react";
import LearningContentService from "../../Services/LearningContent";
import { Toaster, toast } from "sonner";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Modal,
  Nav,
  Row,
} from "react-bootstrap";

import ContentEducatifStudentTable from "../../components/ContenuEducatifStudent";
export default function LearningContentParent() {
  const [active, setActive] = useState("cours");
  const [data, setData] = useState([]);

  const [update, setUpdate] = useState(0);

  const getAllContent = async () => {
    try {
      const res = await LearningContentService.getAllContent(active);
      if (res.status === 200) {
        console.log(res);
        setData(res.data);
        //console.log("courses", courses);
        setUpdate((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };

  useEffect(() => {
    getAllContent();
  }, [active]);

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="card">
          <div className="card-header">
            {" "}
            <h6>
              {" "}
              Espace Parent : Welcome{" "}
              <span className="text-primary">
                {localStorage.getItem("fullname")}{" "}
              </span>
            </h6>
          </div>
          <div className="card-body">
            <hr />
            <ButtonGroup size="md" className="mb-2">
              <Button
                onClick={() => setActive("cours")}
                variant="secondary"
                className={active === "cours" && "active"}
              >
                Cours
              </Button>
              <Button
                onClick={() => setActive("exercices")}
                variant="secondary"
                className={active === "exercices" && "active"}
              >
                Exercices
              </Button>
              <Button
                onClick={() => setActive("devoirs")}
                className={active === "devoirs" && "active"}
                variant="secondary"
              >
                Devoirs
              </Button>
              <Button
                onClick={() => setActive("tests")}
                className={active === "tests" && "active"}
                variant="secondary"
              >
                Tests
              </Button>
            </ButtonGroup>
            <hr />

            <ContentEducatifStudentTable
              data={data} // { cours , tests , exercices ... }
              type={active} //
              refreshData={() => getAllContent()}
            />
          </div>
        </div>
      </div>
    </>
  );
}
