// Layout.js

import { useEffect, useState } from "react";
import CorrectionService from "../../Services/Corrections";
import { toast } from "sonner";
import TableDataStudent from "../../components/CorrectionTableStudent";
export default function CorrectionStudent() {
  const [corrections, setCorrections] = useState([]);
  const getAllCorrections = async () => {
    try {
      const res = await CorrectionService.getAllContent();
      if (res.status === 200) {
        console.log(res);
        setCorrections(res.data);
        // setUpdate((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur .");
    }
  };
  useEffect(() => {
    getAllCorrections();
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="card">
          <div className="card-header">
            <h6>
              {" "}
              Espace Elève : Welcome{" "}
              <span className="text-primary">
                {localStorage.getItem("fullname")}{" "}
              </span>
            </h6>
          </div>
          <div className="card-body">
            <TableDataStudent
              data={corrections}
              type={"correction"}
              refreshData={() => getAllCorrections()}
            />
          </div>
        </div>
      </div>
    </>
  );
}
