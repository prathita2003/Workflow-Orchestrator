import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function WorkflowsPage() {

    const [workflows, setWorkflows] = useState([]);
    const navigate=useNavigate();
    const loadWorkflows = () => {
        api.get("/workflows")
            .then(response => {
                setWorkflows(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };
    const role=localStorage.getItem("role");

    useEffect(() => {
        loadWorkflows();
    }, []);

    const startWorkflow = (workflowId) => {

        api.post(`/executions/start/${workflowId}`)
            .then(() => {
                alert("Workflow Started Successfully!");
            })
            .catch(error => {
                console.error(error);
                alert("Failed to start workflow.");
            });

    };

    return (
        <>

            <h1>Workflow Management</h1>

            <p
                style={{
                    color: "#6B7280",
                    fontSize: "17px",
                    marginBottom: "30px"
                }}
            >
                Create, manage, and execute workflow definitions.
            </p>
                {role==="ROLE_ADMIN" &&(
            <button style={createButton} onClick={()=>navigate("/workflows/create")}>
                + Create Workflow
            </button>
                )}

            <table style={tableStyle}>

                <thead>

                    <tr>
                        <th style={headerCell}>ID</th>
                        <th style={headerCell}>Workflow Name</th>
                        <th style={headerCell}>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {workflows.map(workflow => (

                        <tr key={workflow.id}>

                            <td style={bodyCell}>
                                {workflow.id}
                            </td>

                            <td style={bodyCell}>
                                {workflow.name}
                            </td>
                            <td style={bodyCell}>

    <button
        style={startButton}
        onClick={() => startWorkflow(workflow.id)}
    >
        ▶ Start
    </button>

    <button
        style={viewButton}
        onClick={() => navigate(`/workflows/${workflow.id}`)}
    >
        👁 View
    </button>

</td>
                            
                        </tr>

                    ))}

                </tbody>

            </table>

        </>
    );
}

const createButton = {
    padding: "10px 20px",
    background: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "30px"
};

const startButton = {
    padding: "8px 16px",
    background: "#22C55E",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const headerCell = {
    padding: "14px",
    background: "#F3F4F6",
    textAlign: "left",
    borderBottom: "1px solid #E5E7EB"
};

const bodyCell = {
    padding: "14px",
    borderBottom: "1px solid #E5E7EB"
};
const viewButton = {
    padding: "8px 16px",
    marginLeft: "10px",
    background: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
};

export default WorkflowsPage;