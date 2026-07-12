import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    return (
        <>
            <button
                style={backButton}
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <h1>My Profile</h1>

            <div style={card}>
                <h2 style={{ marginBottom: "30px" }}>
                    👤 User Information
                </h2>

                <div style={row}>
                    <b>Username</b>
                    <span>{username}</span>
                </div>

                <div style={row}>
                    <b>Role</b>
                    <span>{role}</span>
                </div>

                <div style={row}>
                    <b>Authentication</b>
                    <span>JWT</span>
                </div>

                <div style={row}>
                    <b>Status</b>
                    <span style={{ color: "#22C55E" }}>
                        Active
                    </span>
                </div>
            </div>

            <div style={card}>
                <h2>Password</h2>

                <p style={{ color: "#6B7280" }}>
                    Password change support will be added in a future update.
                </p>

                <button style={button}>
                    Change Password
                </button>
            </div>
        </>
    );
}

const backButton = {
    background: "none",
    border: "none",
    color: "#2563EB",
    cursor: "pointer",
    marginBottom: "20px",
    fontSize: "16px"
};

const card = {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    marginTop: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const row = {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 0",
    borderBottom: "1px solid #E5E7EB"
};

const button = {
    marginTop: "20px",
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer"
};

export default ProfilePage;