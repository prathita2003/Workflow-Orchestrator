import { useEffect, useState } from "react";
import api from "../services/api";

function KafkaMonitor() {
    const [events, setEvents] = useState([]);

    const loadEvents = () => {
        api.get("/kafka/events")
            .then(res => setEvents(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        loadEvents();

        const interval = setInterval(loadEvents, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <h1>Kafka Event Monitor</h1>
            <h5 style={{ color: '#d71a1a', fontWeight: 'bold' }}>
  ⚠ Hosted Demo Notice<br/>

Apache Kafka powers the distributed workflow execution engine in the local version of this project.<br/>

Since Render does not provide a managed Kafka service, the hosted demo does not include live Kafka streaming.<br/>

All Kafka-based functionality can be experienced by running the project locally using Docker Compose. See the README for setup instructions.
</h5>

            <p
                style={{
                    color: "#6B7280",
                    marginBottom: "30px"
                }}
            >
                Live Event Stream
            </p>

            <table style={table}>
                <thead>
                    <tr>
                        <th style={head}>Event</th>
                        <th style={head}>Execution</th>
                        <th style={head}>Task</th>
                        <th style={head}>Message</th>
                    </tr>
                </thead>

                <tbody>
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td style={cell}>
                                {event.eventType}
                            </td>

                            <td style={cell}>
                                {event.workflowExecutionId}
                            </td>

                            <td style={cell}>
                                {event.taskId ?? "-"}
                            </td>

                            <td style={cell}>
                                {event.message}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

const table = {
    width: "100%",
    borderCollapse: "collapse",
    background: "white"
};

const head = {
    background: "#2563EB",
    color: "white",
    padding: "14px"
};

const cell = {
    padding: "14px",
    borderBottom: "1px solid #E5E7EB"
};

export default KafkaMonitor;