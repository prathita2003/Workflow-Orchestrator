import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import WorkflowGraph from "../components/WorkflowGraph";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function WorkflowDetails() {

    const { id } = useParams();

    const [workflow, setWorkflow] = useState(null);

    const navigate=useNavigate();
    const role=localStorage.getItem("role");
const startWorkflow=()=>{
    api.post(`/executions/start/${workflow.id}`)
    .then(()=>{
        alert("Workflow started successfully");
    })
    .catch(error=>{
        console.error(error);
        alert("Failed to start workflow");
    });
};
    useEffect(() => {

        api.get(`/workflows/${id}`)
            .then(response => {
                setWorkflow(response.data);
            })
            .catch(error => console.error(error));

    }, [id]);

    if (!workflow) {
        return <h2>Loading workflow...</h2>;
    }
    const getTaskName=(id)=>{
        const task=workflow.tasks.find(t=>t.id===id);
        return task ? task.name:id;
    };
    const cloneWorkflow = async () => {

    try {

        await api.post(`/workflows/${workflow.id}/clone`);

        alert("Workflow cloned successfully!");

        navigate("/workflows");

    }

    catch(err){

        console.error(err);

        alert("Failed to clone workflow.");

    }

};

const deleteWorkflow = async () => {

    if(!window.confirm("Are you sure you want to delete this workflow?"))
        return;

    try{

        await api.delete(`/workflows/${workflow.id}`);

        alert("Workflow deleted successfully!");

        navigate("/workflows");

    }

    catch(err){

        console.error(err);

        alert("Failed to delete workflow.");

    }

};

const editWorkflow = () => {

    alert(
`🚧 Edit Workflow

This feature is planned for the next release.

You can currently:

• Create workflows
• Clone workflows
• Delete workflows
• Execute workflows
• Monitor executions

Editing existing workflows will be added soon.`
    );

};

    return (
        <Layout>
            <button
            style={backButton}
                onClick={() => navigate("/workflows")}
                >
             ← Back to Workflows
            </button>
            <h1>{workflow.name}</h1>

            <p
                style={{
                    color: "#6B7280",
                    marginBottom: "30px"
                }}
            >
                Workflow Details
            </p>

            <div style={infoCard}>

                <div style={infoItem}>
                    <h3>Workflow ID</h3>
                    <h2>{workflow.id}</h2>
                </div>

                <div style={infoItem}>
                    <h3>Tasks</h3>
                    <h2>{workflow.tasks.length}</h2>
                </div>

                <div style={infoItem}>
                    <h3>Dependencies</h3>
                    <h2>{workflow.dependencies.length}</h2>
                </div>

            </div>
            <div style={buttonContainer}>
                <button
        style={startButton}
        onClick={startWorkflow}
    >
        ▶ Start
    </button>

{role === "ROLE_ADMIN" && (

    <>

        <button
            style={editButton}
            onClick={editWorkflow}
        >
            ✏ Edit
        </button>

        <button
            style={cloneButton}
            onClick={cloneWorkflow}
        >
            📄 Clone
        </button>

        <button
            style={deleteButton}
            onClick={deleteWorkflow}
        >
            🗑 Delete
        </button>

    </>

)}

</div>

            <h2 style={sectionTitle}>
                Tasks
            </h2>

            <table style={tableStyle}>

                <thead>

                    <tr>
                        <th style={headerCell}>Task ID</th>
                        <th style={headerCell}>Task Name</th>
                        <th style={headerCell}>Type</th>
                    </tr>

                </thead>

                <tbody>

                    {workflow.tasks.map(task => (

                        <tr key={task.id}>

                            <td style={bodyCell}>
                                {task.id}
                            </td>

                            <td style={bodyCell}>
                                {task.name}
                            </td>

                            <td style={bodyCell}>
                                {task.type}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <h2 style={sectionTitle}>
    Workflow Graph
</h2>

<WorkflowGraph workflow={workflow} />
</Layout>
               
    );
}

const infoCard = {
    display: "flex",
    gap: "25px",
    marginBottom: "40px"
};

const infoItem = {
    flex: 1,
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const sectionTitle = {
    marginTop: "40px",
    marginBottom: "20px"
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

const flowContainer = {
    marginTop: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

const taskBox = {
    width: "320px",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #2563EB"
};

const arrow = {
    fontSize: "42px",
    margin: "15px 0",
    color: "#2563EB",
    fontWeight: "bold"
};

const connector={
    height:"25px"
}

const backButton = {
    background: "none",
    border: "none",
    color: "#2563EB",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
    fontWeight: "600"
};

const startButton = {
    background: "#22C55E",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer"
};

const editButton = {
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer"
};

const cloneButton = {
    background: "#F59E0B",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer"
};

const deleteButton = {
    background: "#EF4444",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer"
};
const buttonContainer = {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
    marginTop: "20px"
};


export default WorkflowDetails;