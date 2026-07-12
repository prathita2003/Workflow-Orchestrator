import { useEffect, useState } from "react";
import api from "../services/api";

function Users() {
    const [users, setUsers] = useState([]);

    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        role: "VIEWER"
    });

    const loadUsers = () => {
        api.get("/users")
            .then(res => setUsers(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const createUser = async () => {
        try {
            await api.post("/users", newUser);

            setNewUser({
                username: "",
                password: "",
                role: "VIEWER"
            });

            loadUsers();
        } catch (err) {
            console.error(err);
            alert("Failed to create user.");
        }
    };

    const deleteUser = async id => {
        if (!window.confirm("Delete this user?")) {
            return;
        }

        try {
            await api.delete(`/users/${id}`);

            loadUsers();
        } catch (err) {
            console.error(err);
            alert("Delete failed.");
        }
    };

    const changeRole = async (id, role) => {
        try {
            await api.put(`/users/${id}/role?role=${role}`);

            loadUsers();
        } catch (err) {
            console.error(err);
            alert("Role update failed.");
        }
    };

    return (
        <>
            <h1>User Management</h1>

            <div style={card}>
                <input
                    placeholder="Username"
                    value={newUser.username}
                    onChange={e =>
                        setNewUser({
                            ...newUser,
                            username: e.target.value
                        })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={e =>
                        setNewUser({
                            ...newUser,
                            password: e.target.value
                        })
                    }
                />

                <select
                    value={newUser.role}
                    onChange={e =>
                        setNewUser({
                            ...newUser,
                            role: e.target.value
                        })
                    }
                >
                    <option>ADMIN</option>
                    <option>OPERATOR</option>
                    <option>VIEWER</option>
                </select>

                <button
                    style={createButton}
                    onClick={createUser}
                >
                    Create User
                </button>
            </div>

            <table style={table}>
                <thead>
                    <tr>
                        <th style={head}>Username</th>
                        <th style={head}>Role</th>
                        <th style={head}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td style={cell}>
                                {user.username}
                            </td>

                            <td style={cell}>
                                {user.role}
                            </td>

                            <td style={cell}>
                                <select
                                    value={user.role}
                                    onChange={e =>
                                        changeRole(
                                            user.id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option>ADMIN</option>
                                    <option>OPERATOR</option>
                                    <option>VIEWER</option>
                                </select>

                                <button
                                    style={deleteButton}
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

const card = {
    display: "flex",
    gap: "15px",
    marginBottom: "30px"
};

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

const createButton = {
    background: "#22C55E",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer"
};

const deleteButton = {
    marginLeft: "10px",
    background: "#EF4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer"
};

export default Users;