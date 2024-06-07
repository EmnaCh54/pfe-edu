// Layout.js

import { Bar } from "react-chartjs-2";
import BarChartUser from "../../components/BarChartUser";
import AdminService from "../../Services/Admin";
import { useEffect, useState } from "react";
import PolarChartContent from "../../components/PolarChartContent";
import { Col, Row } from "react-bootstrap";

export default function HomeAdmin() {
  const [userStat, setUserStat] = useState();
  const [contentStat, setContentStat] = useState();
  const getStatUser = async () => {
    try {
      const res = await AdminService.userStat();
      if (res.status === 200) setUserStat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getContentStat = async () => {
    try {
      const res = await AdminService.contentData();
      if (res.status === 200) setContentStat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStatUser();
    getContentStat();
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="card">
          <div className="card-header">Bienvenue Administrateur</div>
          <div className="card-body">
            <h5> Liste des utilisateurs par role</h5>
            <hr />
            <div className="mb-5 d-flex justify-content-center">
              <BarChartUser dataUser={userStat} />{" "}
            </div>

            <h5> Liste des Cotenu educatif par type</h5>
            <hr />
            <div className=" d-flex justify-content-center">
              <PolarChartContent dataContent={contentStat} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
