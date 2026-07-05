import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType
} from "reactflow";

import { useEffect, useCallback } from "react";

function WorkflowCanvas({ tasks, dependencies, onDependenciesChange }) {

    const getColor = (type) => {

        switch (type) {

            case "REST":
                return "#2563EB";

            case "DATABASE":
                return "#22C55E";

            case "FILE":
                return "#9333EA";

            case "PYTHON":
                return "#F97316";

            case "KAFKA":
                return "#EF4444";

            case "EMAIL":
                return "#EAB308";

            default:
                return "#6B7280";

        }

    };

    const getIcon = (type) => {

        switch (type) {

            case "REST":
                return "🌐";

            case "DATABASE":
                return "🗄️";

            case "FILE":
                return "📁";

            case "PYTHON":
                return "🐍";

            case "KAFKA":
                return "📨";

            case "EMAIL":
                return "✉️";

            default:
                return "⚙️";

        }

    };

    const initialNodes = tasks.map((task, index) => ({

        id: task.id,

        position: {
            x: 250,
            y: index * 140
        },

        data: {
            label: `${getIcon(task.type)} ${task.name || task.id}`
        },

        style: {
            width: 180,
            borderRadius: 12,
            border: `3px solid ${getColor(task.type)}`,
            background: "white",
            fontWeight: "600",
            padding: 10
        }

    }));

    const initialEdges = dependencies.map((dependency, index) => ({

        id: `e${index}`,

        source: dependency.from,

        target: dependency.to,

        animated: true,

        markerEnd: {
            type: MarkerType.ArrowClosed
        }

    }));

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {

        setNodes(initialNodes);

    }, [tasks]);

    useEffect(() => {

        setEdges(initialEdges);

    }, [dependencies]);

    const onConnect = useCallback((params) => {

        const updatedEdges = addEdge({

            ...params,

            animated: true,

            markerEnd: {
                type: MarkerType.ArrowClosed
            }

        }, edges);

        setEdges(updatedEdges);

        onDependenciesChange(

            updatedEdges.map(edge => ({

                from: edge.source,

                to: edge.target

            }))

        );

    }, [edges, onDependenciesChange]);

    const onEdgesDelete = useCallback((deletedEdges) => {

        const remaining = edges.filter(

            edge => !deletedEdges.find(d => d.id === edge.id)

        );

        onDependenciesChange(

            remaining.map(edge => ({

                from: edge.source,

                to: edge.target

            }))

        );

    }, [edges, onDependenciesChange]);

    return (

        <div
            style={{
                width: "100%",
                height: "600px",
                border: "1px solid #D1D5DB",
                borderRadius: "12px",
                marginTop: "20px"
            }}
        >

            <ReactFlow

                nodes={nodes}

                edges={edges}

                onNodesChange={onNodesChange}

                onEdgesChange={onEdgesChange}

                onConnect={onConnect}

                onEdgesDelete={onEdgesDelete}

                fitView

                deleteKeyCode="Delete"

            >

                <Background />

                <MiniMap zoomable pannable />

                <Controls />

            </ReactFlow>

        </div>

    );

}

export default WorkflowCanvas;