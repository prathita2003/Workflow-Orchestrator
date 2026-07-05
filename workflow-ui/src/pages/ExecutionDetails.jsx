import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ExecutionDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const [execution, setExecution] = useState(null);

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadExecution = () => {

        Promise.all([
            api.get(`/executions/${id}`),
            api.get(`/executions/${id}/allTasks`)
        ])
            .then(([executionResponse, taskResponse]) => {

                setExecution(executionResponse.data);

                setTasks(taskResponse.data);

                setLoading(false);

            })
            .catch(error => {

                console.error(error);

                alert("Failed to load execution.");

                setLoading(false);

            });

    };

    useEffect(() => {

        loadExecution();

        const interval = setInterval(() => {

            loadExecution();

        }, 5000);

        return () => clearInterval(interval);

    }, [id]);

    const completeTask = async (taskId) => {

        try {

            await api.post(`/executions/${id}/tasks/${taskId}/complete`);

            alert("Task completed.");

            loadExecution();

        }

        catch (err) {

            console.error(err);

            alert("Failed to complete task.");

        }

    };

    const failTask = async (taskId) => {

        try {

            await api.post(`/executions/${id}/tasks/${taskId}/fail`);

            alert("Task failure processed.");

            loadExecution();

        }

        catch (err) {

            console.error(err);

            alert("Failed.");

        }

    };

    const retryTask = async (taskId) => {

    try{

        await api.post(`/executions/${id}/tasks/${taskId}/retry`);

        loadExecution();

    }

    catch(err){

        console.error(err);

        alert("Retry failed.");

    }

};

    const getStatusStyle = (status) => {

        switch (status) {

            case "COMPLETED":
                return completedStatus;

            case "FAILED":
                return failedStatus;

            case "RUNNING":
                return runningStatus;

            default:
                return pendingStatus;

        }

    };

    if (loading) {

        return <h2>Loading Execution...</h2>;

    }

    if (!execution) {

        return <h2>Execution not found.</h2>;

    }

    return (

        <>

            <button
                style={backButton}
                onClick={() => navigate("/executions")}
            >
                ← Back to Executions
            </button>

            <h1>

                Execution #{execution.id}

            </h1>

            <p
                style={{
                    color: "#6B7280",
                    marginBottom: "30px"
                }}
            >
                Workflow Execution Details
            </p>

            <div style={infoCard}>

                <div style={infoItem}>

                    <h3>Workflow</h3>

                    <h2>{execution.workflowName}</h2>

                </div>

                <div style={infoItem}>

                    <h3>Status</h3>

                    <span style={getStatusStyle(execution.status)}>

                        {execution.status}

                    </span>

                </div>

                <div style={infoItem}>

                    <h3>Started</h3>

                    <p>

                        {execution.startTime
                            ? new Date(execution.startTime).toLocaleString()
                            : "-"}

                    </p>

                </div>

                <div style={infoItem}>

                    <h3>Finished</h3>

                    <p>

                        {execution.endTime
                            ? new Date(execution.endTime).toLocaleString()
                            : "-"}

                    </p>

                </div>

            </div>

            <h2 style={sectionTitle}>

                Task Executions

            </h2>

            <table style={tableStyle}>

                <thead>

                    <tr>

                        <th style={headerCell}>Task</th>

                        <th style={headerCell}>Type</th>

                        <th style={headerCell}>Status</th>

                        <th style={headerCell}>Retries</th>

                        <th style={headerCell}>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {tasks.map(task => (

                        <tr key={task.taskId}>

                            <td style={bodyCell}>

                                {task.taskName}

                            </td>

                            <td style={bodyCell}>

                                {task.taskType}

                            </td>

                            <td style={bodyCell}>

                                <span style={getStatusStyle(task.status)}>

                                    {task.status}

                                </span>

                            </td>

                            <td style={bodyCell}>

                                {task.retryCount}

                            </td>

                            <td style={bodyCell}>

                                {role === "ROLE_ADMIN" &&

                                        <>
                                                                                    {task.status==="RUNNING" &&

<button
style={completeButton}
onClick={()=>completeTask(task.taskId)}
>
Complete
</button>

}

{task.status==="RUNNING" &&

<button
style={failButton}
onClick={()=>failTask(task.taskId)}
>
Fail
</button>

}

{task.status==="FAILED" &&

<button
style={retryButton}
onClick={()=>retryTask(task.taskId)}
>
Retry
</button>

}

                                        </>

                                    }

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </>

    );

}

const infoCard = {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "20px",
    marginBottom: "35px"
};

const infoItem = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const sectionTitle = {
    marginBottom: "20px",
    marginTop: "35px"
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
    background: "#F3F4F6",
    padding: "14px",
    textAlign: "left",
    borderBottom: "1px solid #E5E7EB"
};

const bodyCell = {
    padding: "14px",
    borderBottom: "1px solid #E5E7EB"
};

const backButton = {
    background: "none",
    border: "none",
    color: "#2563EB",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    marginBottom: "20px"
};

const completeButton = {
    background: "#22C55E",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px"
};

const failButton = {
    background: "#EF4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px"
};

const retryButton = {
    background: "#F59E0B",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
};

const completedStatus = {
    background: "#DCFCE7",
    color: "#15803D",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "600"
};

const runningStatus = {
    background: "#DBEAFE",
    color: "#1D4ED8",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "600"
};

const pendingStatus = {
    background: "#FEF3C7",
    color: "#92400E",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "600"
};

const failedStatus = {
    background: "#FEE2E2",
    color: "#B91C1C",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "600"
};

export default ExecutionDetails;
