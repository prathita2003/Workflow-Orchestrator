import { useEffect, useState } from "react";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";

function Dashboard() {
    const [executions, setExecutions] = useState([]);

    useEffect(() => {
        api.get("/executions")
            .then(response => {
                console.log(response.data);
                setExecutions(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <h1>Dashboard</h1>

            <p
                style={{
                    color: "#6B7280",
                    fontSize: "17px",
                    marginBottom: "35px"
                }}
            >
                Monitor, execute, and manage distributed workflows from one place.
            </p>

            <div style={cardsContainer}>
                <div style={cardStyle}>
                    <div style={iconCircle}>📁</div>
                    <h2 style={numberStyle}>
                        {[...new Set(executions.map(e => e.workflowId))].length}
                    </h2>
                    <h3>Workflows</h3>
                    <p style={subtitle}>Total Workflows</p>
                </div>

                <div style={cardStyle}>
                    <div style={iconCircle}>▶</div>
                    <h2 style={numberStyle}>
                        {executions.filter(e => e.status === "RUNNING").length}
                    </h2>
                    <h3>Running</h3>
                    <p style={subtitle}>Active executions</p>
                </div>

                <div style={cardStyle}>
                    <div style={iconCircle}>✅</div>
                    <h2 style={numberStyle}>
                        {executions.filter(e => e.status === "COMPLETED").length}
                    </h2>
                    <h3>Completed</h3>
                    <p style={subtitle}>Successful executions</p>
                </div>

                <div style={cardStyle}>
                    <div style={iconCircle}>❌</div>
                    <h2 style={numberStyle}>
                        {executions.filter(e => e.status === "FAILED").length}
                    </h2>
                    <h3>Failed</h3>
                    <p style={subtitle}>Needs attention</p>
                </div>
            </div>

            <h2
                style={{
                    marginTop: "50px",
                    marginBottom: "20px"
                }}
            >
                Recent Executions
            </h2>

            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={headerCell}>ID</th>
                        <th style={headerCell}>Workflow</th>
                        <th style={headerCell}>Status</th>
                        <th style={headerCell}>Start Time</th>
                    </tr>
                </thead>

                <tbody>
                    {executions
                        .slice()
                        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
                        .slice(0, 5)
                        .map(execution => (
                            <tr key={execution.id}>
                                <td style={bodyCell}>
                                    {execution.id}
                                </td>

                                <td style={bodyCell}>
                                    {execution.workflowName}
                                </td>

                                <td style={bodyCell}>
                                    <StatusBadge status={execution.status} />
                                </td>

                                <td style={bodyCell}>
                                    {new Date(execution.startTime).toLocaleString("en-IN", {
                                        dateStyle: "medium",
                                        timeStyle: "short"
                                    })}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

const numberStyle = {
    fontSize: "46px",
    color: "#2563EB",
    margin: "18px 0 10px"
};

const cardStyle = {
    flex: 1,
    background: "#FFFFFF",
    borderRadius: "18px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,.08)",
    transition: "0.25s",
    cursor: "pointer",
    border: "1px solid #E5E7EB"
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const headerCell = {
    padding: "14px",
    background: "#2563EB",
    color: "white",
    textAlign: "left",
    borderBottom: "1px solid #E5E7EB"
};

const bodyCell = {
    padding: "14px",
    borderBottom: "1px solid #E5E7EB"
};

const iconCircle = {
    width: "70px",
    height: "70px",
    margin: "0 auto",
    borderRadius: "50%",
    background: "#DBEAFE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "34px"
};

const subtitle = {
    color: "#6B7280",
    marginTop: "8px"
};

const cardsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "25px",
    marginTop: "35px"
};

export default Dashboard;