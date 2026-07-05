import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";

function ExecutionMonitor() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [execution, setExecution] = useState(null);
    const [tasks, setTasks] = useState([]);
    const role=localStorage.getItem("role");

    useEffect(() => {

        loadExecution();
        const interval=setInterval(()=>{
            loadExecution();
        },5000);
        return ()=>clearInterval(interval);

    }, [id]);

    const loadExecution = () => {

        api.get(`/executions/${id}`)
            .then(res => setExecution(res.data))
            .catch(err => console.error(err));

        api.get(`/executions/${id}/allTasks`)
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));

    };
    const completeTask = async (taskId) => {

    try{

        await api.post(`/executions/${id}/tasks/${taskId}/complete`);

        loadExecution();

    }
    catch(err){

        console.error(err);

        alert("Failed to complete task.");

    }

};

const failTask = async (taskId) => {

    try{

        await api.post(`/executions/${id}/tasks/${taskId}/fail`);

        loadExecution();

    }
    catch(err){

        console.error(err);

        alert("Failed to fail task.");

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
    const taskTypeStyles = {

    REST: {
        borderLeft: "6px solid #2563EB",
        icon: "🌐"
    },

    DATABASE: {
        borderLeft: "6px solid #22C55E",
        icon: "🗄️"
    },

    FILE: {
        borderLeft: "6px solid #9333EA",
        icon: "📁"
    },

    PYTHON: {
        borderLeft: "6px solid #F97316",
        icon: "🐍"
    },

    KAFKA: {
        borderLeft: "6px solid #EF4444",
        icon: "📨"
    },

    EMAIL: {
        borderLeft: "6px solid #EAB308",
        icon: "✉️"
    }

};

    if (!execution) {
        return <h2>Loading...</h2>;
    }
    

    return (
        <>

            <button
                style={backButton}
                onClick={() => navigate("/executions")}
            >
                ← Back to Executions
            </button>

            <h1>Execution #{execution.id}</h1>

            <p
                style={{
                    color: "#6B7280",
                    marginBottom: "25px"
                }}
            >
                Workflow: <b>{execution.workflowName}</b>
            </p>

            <div style={summaryContainer}>

                <div style={summaryCard}>
                    <h3>Status</h3>
                    <StatusBadge status={execution.status} />
                </div>

                <div style={summaryCard}>
                    <h3>Total Tasks</h3>
                    <h2>{tasks.length}</h2>
                </div>

                <div style={summaryCard}>
                    <h3>Started</h3>
                    <p>
                        {new Date(execution.startTime).toLocaleTimeString()}
                    </p>
                </div>

            </div>
            <button style={auditButton} onClick={()=>navigate(`/audit/${execution.id}`)}>
                📋 View Audit Timeline
            </button>

            <h2
                style={{
                    marginTop: "45px",
                    marginBottom: "25px"
                }}
            >
                Workflow Progress
            </h2>

            <div style={flowContainer}>

                {tasks.map((task, index) => {

    const style = taskTypeStyles[task.taskType] || {
        borderLeft: "6px solid #2563EB",
        icon: "⚙️"
    };

    return (

        <div key={task.taskId}>

            <div
                style={{
                    ...taskCard,
                    ...style
                }}
            >

                            <h3>{style.icon} {task.taskName}</h3>
                            <p style={{color:"#6B7280", marginBottom:"10px"}}>
                                {task.taskType}
                            </p>

                            <div style={{ marginTop: "10px" }}>
    <StatusBadge status={task.status} />
</div>

{role === "ROLE_ADMIN" && (

<div
    style={{
        marginTop:"15px",
        display:"flex",
        justifyContent:"center",
        gap:"10px",
        flexWrap:"wrap"
    }}
>

{true && (

<>
<button
style={completeButton}
onClick={()=>completeTask(task.taskId)}
>
Complete
</button>

<button
style={failButton}
onClick={()=>failTask(task.taskId)}
>
Fail
</button>
</>

)}

{task.status==="FAILED" && (

<button
style={retryButton}
onClick={()=>retryTask(task.taskId)}
>
Retry
</button>

)}

</div>

)}

                        </div>

                        {index !== tasks.length - 1 && (

                            <div style={arrow}>
                                ↓
                            </div>

                        )}

                    </div>
    );

})}

            </div>
            <p
    style={{
        color: "#6B7280",
        fontSize: "14px",
        textAlign: "right",
        marginBottom: "20px"
    }}
>
    Auto-refreshing every 5 seconds
</p>

        </>
    );
    
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

const summaryContainer = {
    display: "flex",
    gap: "20px",
    marginBottom: "40px"
};

const summaryCard = {
    flex: 1,
    background: "white",
    padding: "20px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const flowContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

const taskCard = {
    width: "350px",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #2563EB"
};

const arrow = {
    fontSize: "42px",
    color: "#2563EB",
    margin: "15px 0",
    textAlign: "center"
};
const auditButton = {
    background:"#2563EB",
    color:"white",
    border:"none",
    padding:"10px 20px",
    borderRadius:"8px",
    cursor:"pointer",
    marginBottom:"30px"
};

const completeButton = {
    background:"#22C55E",
    color:"white",
    border:"none",
    padding:"8px 15px",
    borderRadius:"6px",
    cursor:"pointer"
};

const failButton = {
    background:"#EF4444",
    color:"white",
    border:"none",
    padding:"8px 15px",
    borderRadius:"6px",
    cursor:"pointer"
};

const retryButton = {
    background:"#F59E0B",
    color:"white",
    border:"none",
    padding:"8px 15px",
    borderRadius:"6px",
    cursor:"pointer"
};
export default ExecutionMonitor;