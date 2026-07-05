import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";

function ExecutionsPage() {

    const [executions, setExecutions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        api.get("/executions")
            .then(response => {
                setExecutions(response.data);
            })
            .catch(error => console.error(error));

    }, []);

    return (

        <>

            <h1>Executions</h1>

            <p
                style={{
                    color:"#6B7280",
                    marginBottom:"30px"
                }}
            >
                Monitor every workflow execution in the system.
            </p>

            <table style={tableStyle}>

                <thead>

                    <tr>

                        <th style={headerCell}>Execution ID</th>

                        <th style={headerCell}>Workflow</th>

                        <th style={headerCell}>Status</th>

                        <th style={headerCell}>Started</th>

                        <th style={headerCell}>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {executions.map(execution => (

                        <tr key={execution.id}>

                            <td style={bodyCell}>
                                {execution.id}
                            </td>

                            <td style={bodyCell}>
                                {execution.workflowName}
                            </td>

                            <td style={bodyCell}>
                                <StatusBadge status={execution.status}/>
                            </td>

                            <td style={bodyCell}>
                                {new Date(execution.startTime).toLocaleString()}
                            </td>

                            <td style={bodyCell}>

                                <button
                                    style={viewButton}
                                    onClick={() =>
                                        navigate(`/executions/${execution.id}`)
                                    }
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

const tableStyle={
    width:"100%",
    borderCollapse:"collapse",
    background:"white",
    boxShadow:"0 2px 8px rgba(0,0,0,0.08)"
};

const headerCell={
    padding:"14px",
    background:"#F3F4F6",
    textAlign:"left"
};

const bodyCell={
    padding:"14px",
    borderBottom:"1px solid #E5E7EB"
};

const viewButton={
    background:"#2563EB",
    color:"white",
    border:"none",
    padding:"8px 16px",
    borderRadius:"6px",
    cursor:"pointer"
};

export default ExecutionsPage;