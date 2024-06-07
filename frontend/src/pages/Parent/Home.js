export default function HomeParent() {
  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="card">
          <div className="card-header">Welcome Etudiant</div>
          <div className="card-body">
          <h3>Hey, {localStorage.getItem("fullname")}!</h3>
            <p>
              Heureux de te revoir ! Continuons à avancer ensemble.
              <br /> Bonne chance pour aujourd'hui !
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
