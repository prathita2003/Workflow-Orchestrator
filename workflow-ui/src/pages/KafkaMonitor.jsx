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