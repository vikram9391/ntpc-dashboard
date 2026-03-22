import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    setStatus(""); // clear old message

    // ✅ Admin Login
    if (username === "admin" && password === "1234") {
      localStorage.setItem("user", username);
      localStorage.setItem("role", "admin");

      setStatus("Admin Login Successful ✅");
      setError(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    // ✅ Normal User Login
    } else if (username === "user" && password === "1234") {
      localStorage.setItem("user", username);
      localStorage.setItem("role", "user");

      setStatus("User Login Successful ✅");
      setError(false);

      setTimeout(() => {
        navigate("/user");
      }, 1000);

    } else {
      setStatus("Invalid Credentials ❌");
      setError(true);
    }
  };

  // ✅ Enter key support
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Header */}
      <div style={styles.header}>
       
        <h2 style={{ color: "white" }}>NTPC Portal Login</h2>
      </div>

      {/* Login Card */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: "20px" }}>Sign In</h3>

        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          style={{
            ...styles.button,
            opacity: username && password ? 1 : 0.6,
            cursor: username && password ? "pointer" : "not-allowed"
          }}
          onClick={handleLogin}
          disabled={!username || !password}
        >
          Login
        </button>

        {/* Status Message */}
        {status && (
          <p style={{ color: error ? "red" : "green", marginTop: "10px" }}>
            {status}
          </p>
        )}
      </div>

      {/* Footer */}
      <p style={styles.footer}>
        © 2026 NTPC Limited | Powering India ⚡
      </p>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    height: "100vh",
    background: "linear-gradient(to right, #005aa7, #00c6ff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    position: "absolute",
    top: "20px",
    textAlign: "center"
  },
  logo: {
    width: "80px",
    marginBottom: "5px"
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "300px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#005aa7",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold"
  },
  footer: {
    position: "absolute",
    bottom: "10px",
    color: "white",
    fontSize: "12px"
  }
};

export default Login;