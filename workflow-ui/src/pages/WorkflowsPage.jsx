import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function WorkflowsPage() {

    const [workflows, setWorkflows] = useState([]);
    const navigate=useNavigate();
    const loadWorkflows = () => {

    const request =
        search.trim() === ""
            ? api.get("/workflows")
            : api.get(`/workflows/search?q=${search}`);

    request
        .then(response => {
            setWorkflows(response.data);
        })
        .catch(error => {
            console.error(error);
        });

};
    const role=localStorage.getItem("role");
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadWorkflows();
    }, [search]);

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
          
<div style={topBar}>

<input
    style={searchInput}
    placeholder="🔍 Search by Workflow Name or ID"
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
/>

{role==="ROLE_ADMIN" &&(

<button
    style={createButton}
    onClick={() => navigate("/workflows/create")}
    onMouseEnter={(e) => {
        e.target.style.background = "#1D4ED8";
    }}
    onMouseLeave={(e) => {
        e.target.style.background = "#2563EB";
    }}
>
    + Create Workflow
</button>

)}

</div>

            <table style={tableStyle}>

                <thead>

                    <tr>
                        <th style={headerCell}>ID</th>
                        <th style={headerCell}>Workflow Name</th>
                        <th style={headerCell}>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {workflows
    .slice()
    .sort((a, b) => b.id - a.id)
    .map(workflow => (

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
    onMouseEnter={(e) => {
        e.target.style.background = "#16A34A";
    }}
    onMouseLeave={(e) => {
        e.target.style.background = "#22C55E";
    }}
>
    ▶ Start
</button>

    <button
    style={viewButton}
    onClick={() => navigate(`/workflows/${workflow.id}`)}
    onMouseEnter={(e) => {
        e.target.style.background = "#1D4ED8";
    }}
    onMouseLeave={(e) => {
        e.target.style.background = "#2563EB";
    }}
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

const createButton={

background:"#2563EB",

color:"white",

padding:"14px 24px",

border:"none",

borderRadius:"12px",

fontWeight:"600",

cursor:"pointer",

whiteSpace:"nowrap",

boxShadow:"0 4px 10px rgba(37,99,235,.3)",
transition:"0.2s"

};

const startButton = {
    padding:"10px 18px",

fontWeight:"600",

boxShadow:"0 3px 8px rgba(34,197,94,.3)",
    background: "#22C55E",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition:"0.2s"
};

const tableStyle={

width:"100%",

borderCollapse:"separate",

borderSpacing:0,

background:"white",

borderRadius:"16px",

overflow:"hidden",

boxShadow:"0 8px 24px rgba(0,0,0,.08)"

};

const headerCell={

padding:"18px",

background:"#2563EB",

color:"white",

fontWeight:"700",

fontSize:"15px"

};

const bodyCell={

padding:"18px",

borderBottom:"1px solid #E5E7EB",

fontSize:"15px"

};
const viewButton = {
    padding:"10px 18px",

fontWeight:"600",

boxShadow:"0 3px 8px rgba(37,99,235,.3)",
    marginLeft: "10px",
    background: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition:"0.2s"
};
const searchInput={

flex:1,

padding:"14px 18px",

fontSize:"16px",

borderRadius:"12px",

border:"1px solid #D1D5DB",

boxShadow:"0 2px 8px rgba(0,0,0,.05)"

};

const topBar={

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"25px",

gap:"20px"

};
export default WorkflowsPage;