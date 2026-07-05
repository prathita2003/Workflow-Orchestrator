import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import WorkflowCanvas from "../components/WorkflowCanvas";
import { useParams } from "react-router-dom";

function CreateWorkflow() {

    const navigate = useNavigate();
    const [workflowName, setWorkflowName] = useState("");
    const [tasks, setTasks] = useState([
        {
            id: "T1",
            name: "",
            type: "REST"
        }
    ]);
    const {id}=useParams();
    const editing=Boolean(id);

    const [dependencies, setDependencies] = useState([]);

    const addTask = () => {
        setTasks([
            ...tasks,
            {
                id: `T${tasks.length + 1}`,
                name: "",
                type: "REST"
            }
        ]);
    };

    const removeTask = (index) => {
        const updated = [...tasks];
        updated.splice(index, 1);
        setTasks(updated);
    };

    const updateTask = (index, field, value) => {
        const updated = [...tasks];
        updated[index][field] = value;
        setTasks(updated);
    };

    const addDependency = () => {

        if (tasks.length < 2) {
            alert("At least 2 tasks are required.");
            return;
        }

        setDependencies([
            ...dependencies,
            {
                from: tasks[0].id,
                to: tasks[1].id
            }
        ]);

    };

    const updateDependency = (index, field, value) => {
        const updated = [...dependencies];
        updated[index][field] = value;
        setDependencies(updated);
    };

    const removeDependency = (index) => {
        const updated = [...dependencies];
        updated.splice(index, 1);
        setDependencies(updated);
    };

    const saveWorkflow = () => {

        if (workflowName.trim() === "") {
            alert("Enter workflow name");
            return;
        }

        for (const task of tasks) {
            if (task.name.trim() === "") {
                alert("Every task must have a name.");
                return;
            }
        }

        const payload = {
            name: workflowName,
            tasks,
            dependencies
        };

        console.log(payload);

        api.post("/workflows", payload)
            .then(() => {
                alert("Workflow created successfully!");
                navigate("/workflows");
            })
            .catch(err => {
                console.error(err);
                alert("Failed to create workflow.");
            });

    };

    return (
        <>
            <h1>Create Workflow</h1>

            <p style={{ color: "#6B7280", marginBottom: "25px" }}>
                Build a workflow using tasks and dependencies.
            </p>

            <input
                style={input}
                placeholder="Workflow Name"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
            />

            <h2>Tasks</h2>

            {tasks.map((task, index) => (

                <div key={task.id} style={card}>

                    <h3>{task.id}</h3>

                    <input
                        style={input}
                        placeholder="Task Name"
                        value={task.name}
                        onChange={(e) => updateTask(index, "name", e.target.value)}
                    />

                    <select
                        style={input}
                        value={task.type}
                        onChange={(e) => updateTask(index, "type", e.target.value)}
                    >
                        <option value="REST">🌐 REST</option>
                        <option value="DATABASE">🗄 DATABASE</option>
                        <option value="FILE">📁 FILE</option>
                        <option value="PYTHON">🐍 PYTHON</option>
                        <option value="KAFKA">📨 KAFKA</option>
                        <option value="EMAIL">✉ EMAIL</option>
                    </select>

                    <button style={deleteButton} onClick={() => removeTask(index)}>
                        Remove Task
                    </button>

                </div>

            ))}

            <button style={greenButton} onClick={addTask}>
                + Add Task
            </button>

            <h2 style={{ marginTop: "40px" }}>Dependencies</h2>

            {dependencies.map((dependency, index) => (

                <div key={index} style={card}>

                    <select
                        style={input}
                        value={dependency.from}
                        onChange={(e) => updateDependency(index, "from", e.target.value)}
                    >
                        {tasks.map(task => (
                            <option key={task.id}>{task.id}</option>
                        ))}
                    </select>

                    <div style={{ textAlign: "center", fontSize: "28px" }}>
                        ↓
                    </div>

                    <select
                        style={input}
                        value={dependency.to}
                        onChange={(e) => updateDependency(index, "to", e.target.value)}
                    >
                        {tasks.map(task => (
                            <option key={task.id}>{task.id}</option>
                        ))}
                    </select>

                    <button
                        style={deleteButton}
                        onClick={() => removeDependency(index)}
                    >
                        Remove Dependency
                    </button>

                </div>

            ))}

            <button
    style={greenButton}
    onClick={addDependency}
>
    + Add Dependency
</button>

<h2 style={{ marginTop: "40px" }}>
    Visual Workflow
</h2>

<WorkflowCanvas
    tasks={tasks}
    dependencies={dependencies}
    onDependenciesChange={setDependencies}
/>

<br /><br />

<button
    style={blueButton}
    onClick={saveWorkflow}
>
    Save Workflow
</button>
        </>
    );
}

const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB"
};

const card = {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const greenButton = {
    background: "#22C55E",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
};

const blueButton = {
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer"
};

const deleteButton = {
    background: "#EF4444",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer"
};

const previewContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "30px"
};

const previewTask = {
    width: "320px",
    background: "white",
    padding: "18px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #2563EB"
};

const previewArrow = {
    fontSize: "40px",
    color: "#2563EB",
    margin: "15px 0",
    textAlign: "center"
};
export default CreateWorkflow;