import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import WorkflowsPage from "./pages/WorkflowsPage";
import ExecutionsPage from "./pages/ExecutionsPage";
import AuditPage from "./pages/AuditPage";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import WorkflowDetails from "./pages/WorkflowDetails";
import ExecutionMonitor from "./pages/ExecutionMonitor";
import CreateWorkflow from "./pages/CreateWorkflow";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import ExecutionDetails from "./pages/ExecutionDetails";
import KafkaMonitor from "./pages/KafkaMonitor";
import Users from "./pages/Users";
import MLInsights from "./pages/MLInsights";

function App()
{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>}/>
      <Route path="/workflows" element={<Layout><WorkflowsPage /></Layout>}/>
      <Route path="/executions" element={<Layout><ExecutionsPage /></Layout>}/>
      <Route path="/audit/:executionId" element={<Layout><AuditPage /></Layout>}/>
      <Route path="/workflows/:id" element={<WorkflowDetails />}/>
      <Route path="/executions/:id" element={<Layout><ExecutionMonitor /></Layout>}/>
      <Route path="/workflows/create" element={<Layout><CreateWorkflow /></Layout>}/>
      <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
      <Route path="/workflows/edit/:id" element={<ProtectedRoute><Layout><CreateWorkflow /></Layout></ProtectedRoute>} />
      <Route path="/kafka" element={<ProtectedRoute><Layout><KafkaMonitor /></Layout></ProtectedRoute>} />
      <Route path="/users" element={<Layout><Users /></Layout>} />
      <Route path="/ml" element={<ProtectedRoute><Layout><MLInsights /></Layout></ProtectedRoute>} />
      <Route path="/workflows/edit/:id" element={<ProtectedRoute><Layout><CreateWorkflow /></Layout></ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;