import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Enseignant/Home";
import LearningContent from "./pages/Enseignant/LearningContent";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Correction from "./pages/Enseignant/Correction";
import Documents from "./pages/Enseignant/Documents";
import Quizs from "./pages/Enseignant/Quizs";
import HomeStudent from "./pages/Student/Home";
import StudentDocuments from "./pages/Student/Documents";
import StudentEmplois from "./pages/Student/Emploi";
import LearningContentStudent from "./pages/Student/LearningContent";
import ProfileStudent from "./pages/Student/Profile";
import ProfileEnseignant from "./pages/Enseignant/Profile";
import ProfileParent from "./pages/Parent/Profile";
import ProfileAdmin from "./pages/Admin/Profile";
import HomeEnseignant from "./pages/Enseignant/Home";
import HomeAdmin from "./pages/Admin/Home";
import HomeParent from "./pages/Parent/Home";
import UsersAdmin from "./pages/Admin/Users";
import LearningContentParent from "./pages/Parent/LearningContent";
import Landing from "./pages/Landing";

import Guest from "./layouts/Guest";
import QuizsStudent from "./pages/Student/Quizs";
import CorrectionStudent from "./pages/Student/Correction";
const NotFound = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
    </>
  );
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Guest />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path="/enseignant" element={<Layout />}>
          <Route index element={<HomeEnseignant />} />
          <Route path="learning/content" element={<LearningContent />} />
          <Route path="corrections" element={<Correction />} />
          <Route path="quizs" element={<Quizs />} />
          <Route path="documents" element={<Documents />} />
          <Route path="profile" element={<ProfileEnseignant />} />
        </Route>
        <Route path="/etudiant" element={<Layout />}>
          <Route index element={<HomeStudent />} />
          <Route path="learning/content" element={<LearningContentStudent />} />
          <Route path="emplois" element={<StudentEmplois />} />
          <Route path="documents" element={<StudentDocuments />} />
          <Route path="profile" element={<ProfileStudent />} />
          <Route path="corrections" element={<CorrectionStudent />} />
          <Route path="quizs" element={<QuizsStudent />} />
        </Route>
        <Route path="/parent" element={<Layout />}>
          <Route index element={<HomeParent />} />
          <Route path="learning/content" element={<LearningContentParent />} />

          <Route path="profile" element={<ProfileParent />} />
        </Route>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<HomeAdmin />} />
          <Route path="users" element={<UsersAdmin />} />

          <Route path="profile" element={<ProfileAdmin />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
