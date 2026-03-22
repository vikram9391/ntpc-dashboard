import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear(); // ✅ fixed
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      
      {/* Left Section */}
      <div style={styles.left}>
        <img
          src="https://vdc.ntpc.co.in/assets/img/logo_ntpc.png"
          alt="NTPC"
          style={styles.logo}
        />

        {role === "admin" && (
          <>
            
            <Link style={styles.link} to="/employees">Employees</Link>
            <Link style={styles.link} to="/contact">Contact</Link>
            <Link style={styles.link} to="/feedback">Feedback</Link>
          </>
        )}

        {role === "user" && (
          <>
            <Link style={styles.link} to="/user">Dashboard</Link>
            <Link style={styles.link} to="/contact">Contact</Link>
            <Link style={styles.link} to="/feedback">Feedback</Link>
          </>
        )}
      </div>

      {/* Right Section */}
      <div style={styles.right}>
        <span style={styles.user}>👤 {user}</span>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    background: "#005aa7",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white"
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  logo: {
    width: "40px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  user: {
    fontWeight: "bold"
  },

  logoutBtn: {
    background: "white",
    color: "#005aa7",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Navbar;