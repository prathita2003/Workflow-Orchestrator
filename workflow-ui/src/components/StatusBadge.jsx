function StatusBadge({status})
{
    const colors={
        COMPLETED: "#22c55e",
        RUNNING: "#f59e0b",
        FAILED: "#ef4444",
        PENDING:"#6b7280"
    };
    return (
        <span
        style={{
            backgroundColor:colors[status],
            color:"white",
            padding:"6px 12px",
            borderRadius: "20px",
            fontSize:"13px",
            fontWeight:"bold"
        }}
    >
    {status} </span>);
}
export default StatusBadge;