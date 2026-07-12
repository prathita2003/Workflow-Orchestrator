function StatusBadge({ status }) {

    const colors = {
        COMPLETED: "#22C55E",
        RUNNING: "#F59E0B",
        FAILED: "#EF4444",
        PENDING: "#6B7280",
        STOPPED: "#c5bbbb"
    };

    return (
        <span
            style={{
                backgroundColor: colors[status] || "#6B7280",
                color: "white",
                padding: "8px 18px",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "0.4px",
                display: "inline-block",
                minWidth: "95px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,.15)",
                borderRadius: "20px",
            }}
        >
            {status}
        </span>
    );
}

export default StatusBadge;