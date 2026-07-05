import ReactFlow,{
    Background, Controls, MarkerType
} from "reactflow";

function WorkflowGraph({workflow})
{
    const nodes=workflow.tasks.map((task,index)=>({
        id: task.id,
        data:{
            label:task.name
        },
        position: {
            x:250, y:index*120
        },
        style:
        {
            background: "#ffffff",
            border: "2px solid @2563EB",
            borderRadius: "10px",
            width:220,
            padding:10,
            textAlign:"center",
            fontWeight:"bold"
        }
    }));

     const edges = workflow.dependencies.map((dependency, index) => ({
        id: "e" + index,
        source: dependency.from,
        target: dependency.to,
        animated: true,
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    }));

    return (

        <div
            style={{
                width: "100%",
                height: "600px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                marginTop: "25px"
            }}
        >

            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
            >

                <Background />

                <Controls />

            </ReactFlow>

        </div>

    );
}
export default WorkflowGraph;