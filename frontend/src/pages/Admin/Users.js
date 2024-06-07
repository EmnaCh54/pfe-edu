import { useEffect, useState } from "react";
import UserService from "../../Services/User";
import UsersTable from "../../components/UsersTable";
import { toast } from "sonner";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await UserService.all();
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du cours educattif.");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="card">
          <div className="card-header">Welcome Admin</div>
          <div className="card-body">
            <UsersTable data={users} refreshData={()=>getUsers()} />
          </div>
        </div>
      </div>
    </>
  );
}
