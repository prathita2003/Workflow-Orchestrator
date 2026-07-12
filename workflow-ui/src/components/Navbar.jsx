import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const role=localStorage.getItem("role");
    useEffect(() => {
        const handler = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };
    const username=localStorage.getItem("username");

    return (

        <nav
            style={{
                backgroundColor: "#1F2937",
                color: "white",
                padding:"16px 40px",

boxShadow:"0 6px 18px rgba(0,0,0,.12)",

position:"sticky",

top:0,

zIndex:999,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            <Link
    to="/dashboard"
    style={{
        color:"white",
        textDecoration:"none",
        fontSize:"24px",
        fontWeight:"bold"
    }}
>
    ⚙ Workflow Orchestrator
</Link>

            <div
                style={{
                    display: "flex",
                    gap: "30px",
                    alignItems: "center"
                }}
            >

                <Link to="/dashboard" style={{
        ...linkStyle,
        ...(location.pathname.startsWith("/dashboard")
            ? activeLink
            : {})
    }}>
                    🏠 Dashboard 
                </Link>

                <Link to="/workflows"style={{
        ...linkStyle,
        ...(location.pathname.startsWith("/workflows")
            ? activeLink
            : {})
    }}>
                    ⚙ Workflows 
                </Link>

                <Link to="/executions" style={{
        ...linkStyle,
        ...(location.pathname.startsWith("/executions")
            ? activeLink
            : {})
    }}>
                    ▶ Executions 
                </Link>

                <Link to="/ml" style={{
        ...linkStyle,
        ...(location.pathname.startsWith("/ml")
            ? activeLink
            : {})
    }}>
                    🤖 ML Insights 
                </Link>
                <Link to="/kafka" style={{
        ...linkStyle,
        ...(location.pathname.startsWith("/kafka")
            ? activeLink
            : {})
    }}>
                    🛰 Kafka 
                </Link>
                {role === "ROLE_ADMIN" && (
                    <Link to="/users" style={{
        ...linkStyle,
        ...(location.pathname.startsWith("/users")
            ? activeLink
            : {})
    }}>
                        👥 Users 
                    </Link>
)}

            </div>

            <div
                ref={menuRef}
                style={{
                    position: "relative"
                }}
            >

                <button

                    style={profileButton}

                    onClick={() => setOpen(!open)}

                >

                    👤 {username} ▼

                </button>

                {open && (

                    <div style={dropdown}>

                        <div
                            style={menuItem}
                            onClick={() => {

                                setOpen(false);

                                navigate("/profile");

                            }}
                        >
                            👤 My Profile 
                        </div>

                        <div
                            style={menuItem}
                            onClick={() => {

                                setOpen(false);

                                alert("Settings coming soon.");

                            }}
                        >
                            ⚙ Settings 
                        </div>

                        <div
                            style={{
                                ...menuItem,
                                color: "#DC2626",
                                fontWeight: "bold"
                            }}
                            onClick={logout}
                        >
                            🚪 Logout
                        </div>

                    </div>

                )}

            </div>

        </nav>

    );

}

const linkStyle = {

    color:"white",

    textDecoration:"none",

    fontWeight:"500"

};

const profileButton = {

    background: "transparent",

    border: "none",

    color: "white",

    cursor: "pointer",

    fontSize: "15px",

    fontWeight: "600"

};

const dropdown = {

    position: "absolute",

    right: 0,

    top: "45px",

    width: "190px",

    background: "white",

    color: "#111827",

    borderRadius: "10px",

    boxShadow: "0 8px 18px rgba(0,0,0,0.15)",

    overflow: "hidden",

    zIndex: 1000

};

const menuItem = {

    padding: "14px",

    cursor: "pointer",

    borderBottom: "1px solid #E5E7EB"

};
const activeLink = {
    background: "#2F01AF",
    color: "white",
    padding: "10px 18px",
    borderRadius: "9999px",
    boxShadow: "0 4px 12px rgba(37,99,235,.35)"
};
export default Navbar;