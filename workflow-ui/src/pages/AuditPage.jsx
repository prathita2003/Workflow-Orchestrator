import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function AuditPage()
{
    const {executionId}=useParams();
    const navigate=useNavigate();

    const[logs,setLogs]=useState([]);

    useEffect(() => {

        api.get(`/audit/${executionId}`)
            .then(response => {
                setLogs(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [executionId]);

    return (

        <>

            <button
                style={backButton}
                onClick={() => navigate(`/executions/${executionId}`)}
            >
                ← Back to Execution
            </button>

            <h1>Audit Timeline</h1>

            <p
                style={{
                    color:"#6B7280",
                    marginBottom:"40px"
                }}
            >
                Complete execution history for Execution #{executionId}
            </p>

            <div style={timeline}>

                {logs.map(log => (

                    <div
                        key={log.id}
                        style={timelineItem}
                    >

                        <div style={circle}></div>

                        <div style={content}>

                            <h3>{log.eventType}</h3>

                            <p
                                style={{
                                    color:"#6B7280",
                                    margin:"6px 0"
                                }}
                            >
                                {log.message}
                            </p>

                            <small>
                                {new Date(log.timestamp).toLocaleString()}
                            </small>

                        </div>

                    </div>

                ))}

            </div>

        </>

    );
}
const backButton = {
    background:"none",
    border:"none",
    color:"#2563EB",
    cursor:"pointer",
    marginBottom:"20px",
    fontWeight:"600"
};

const timeline = {
    borderLeft:"4px solid #2563EB",
    marginLeft:"20px",
    paddingLeft:"35px"
};

const timelineItem = {
    position:"relative",
    marginBottom:"35px"
};

const circle = {
    width:"18px",
    height:"18px",
    background:"#2563EB",
    borderRadius:"50%",
    position:"absolute",
    left:"-45px",
    top:"5px"
};

const content = {
    background:"white",
    padding:"18px",
    borderRadius:"10px",
    boxShadow:"0 2px 8px rgba(0,0,0,0.08)"
};

export default AuditPage;