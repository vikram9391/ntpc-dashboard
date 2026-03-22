import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // ✅ Card Navigation
  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      
      {/* Navbar */}
     

      {/* Main Content */}
      <div style={styles.main}>

        {/* Welcome */}
        <div style={styles.welcome}>
          <h2>Welcome, {user} 👋</h2>
          <p>Role: {role ? role.toUpperCase() : "N/A"}</p>
        </div>

        {/* Admin View */}
        {role === "admin" && (
          <div style={styles.cardContainer}>
            
            <div style={styles.card} onClick={() => goTo("/employees")}>
              <h3>👨‍💼 Employees</h3>
              <p>Manage employees</p>
            </div>

            <div style={styles.card}>
              <h3>⚡ Projects</h3>
              <p>View all projects</p>
            </div>

            <div style={styles.card}>
              <h3>📊 Reports</h3>
              <p>Generate reports</p>
            </div>

            <div style={styles.card} onClick={() => goTo("/feedback")}>
              <h3>📝 Feedback</h3>
              <p>View feedback</p>
            </div>

          </div>
        )}

        {/* User View */}
        {role === "user" && (
          <div style={styles.cardContainer}>
            
            <div style={styles.card}>
              <h3>📄 My Profile</h3>
              <p>View your details</p>
            </div>

            <div style={styles.card} onClick={() => goTo("/feedback")}>
              <h3>📝 Feedback</h3>
              <p>Submit feedback</p>
            </div>

            <div style={styles.card} onClick={() => goTo("/contact")}>
              <h3>📞 Contact</h3>
              <p>Reach support</p>
            </div>

          </div>
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
    minHeight: "100vh",
    background: "#f4f6f9"
  },

  main: {
    padding: "20px",
    marginTop: "10px"
  },

  welcome: {
    textAlign: "center",
    marginBottom: "30px"
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.3s"
  },

  footer: {
    textAlign: "center",
    marginTop: "40px",
    color: "#777"
  }
};

export default Dashboard;