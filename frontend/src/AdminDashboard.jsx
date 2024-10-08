import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AddCourse from "./Components/DashBoard/AddCourse";
import EditCourse from "./Components/DashBoard/EditCourse";
import AddQuestions from "./Components/DashBoard/AddQuestions";
import ManageAssessments from "./Components/DashBoard/ManageAssessments";
import ViewFeedback from "./Components/DashBoard/ViewFeedback";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/add-course" component={AddCourse} />
        <Route path="/edit-course" component={EditCourse} />
        <Route path="/add-questions" component={AddQuestions} />
        <Route path="/manage-assessments" component={ManageAssessments} />
        <Route path="/view-feedback" component={ViewFeedback} />
        {/* Add a fallback route */}
        <Route path="/" exact>
          <h1>Home Page</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
