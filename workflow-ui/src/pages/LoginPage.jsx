import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";

function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const response = await api.post("/auth/login", {
            username,
            password
            }); 

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("role", response.data.role);

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Invalid Username or Password");
        }
    };

    if (localStorage.getItem("token")) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#F3F4F6"
            }}
        >
            <div
                style={{
                    width: "400px",
                    background: "white",
                    padding: "35px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    Workflow Orchestrator
                </h1>

                <form
                    onSubmit={e => {
                        e.preventDefault();
                        login();
                    }}
                >
                    <input
                        style={input}
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input
                        style={input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button
                        style={button}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "15px",
    boxSizing: "border-box"
};

const button = {
    width: "100%",
    padding: "12px",
    background: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
};

export default LoginPage;