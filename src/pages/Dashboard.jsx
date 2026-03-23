import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  // ================= STATE =================
  const [fileData, setFileData] = useState([]);
  const [apiUsers, setApiUsers] = useState([]);
  const [dbUsers, setDbUsers] = useState([]);

  const [searchFile, setSearchFile] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchUserId, setSearchUserId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= REDIRECT =================
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // ================= NAVIGATION =================
  const goTo = (path) => {
    navigate(path);
  };

  // ================= DB2 API =================
 const fetchUsersdb = async () => {
  setLoading(true);
  setError("");

  try {
    const baseUrl = "http://localhost:8080/PaymentPortal/users";
    const url = searchUserId
      ? `${baseUrl}?userid=${searchUserId}`
      : baseUrl;

      console.log("Final URL:", url);

    console.log("📡 Calling DB2 API:", url);

    // ⏱️ Timeout setup (optional but useful)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    console.log("✅ DB2 Data:", data);

    if (!data || data.length === 0) {
      setDbUsers([]);
      setError("No records found");
    } else {
      setDbUsers(data);
    }

  } catch (err) {
    console.error("❌ DB2 Error:", err);

    if (err.name === "AbortError") {
      setError("Request timeout");
    } else {
      setError("DB2 API Failed / CORS / Server Down");
    }

    setDbUsers([]);
  } finally {
    setLoading(false);
  }
};

  // ================= SOAP API =================
  const fetchFileData = async (fileNo) => {
  if (!fileNo) {
    setError("Please enter file number");
    return;
  }

  setLoading(true);
  setError("");
  setFileData([]);

  try {
    const soapRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:fil="http://MISD/fileDetailsWS.tws">
      <soapenv:Body>
        <fil:fileActionppm>
          <fil:filenumber>${fileNo}</fil:filenumber>
        </fil:fileActionppm>
      </soapenv:Body>
    </soapenv:Envelope>
    `;

    console.log("📡 Calling SOAP API for file:", fileNo);

    // ⏱️ Timeout handling
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch("/soap/teamworks/webservices/MISD/fileDetailsWS.tws", {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
        "SOAPAction": "", // sometimes required by SOAP servers
      },
      body: soapRequest,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const xml = await res.text();

    console.log("📦 SOAP Response:", xml);

    // 🔍 Parse XML safely
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");

    // ❌ Check SOAP Fault
    const fault = xmlDoc.getElementsByTagName("faultstring")[0];
    if (fault) {
      throw new Error(fault.textContent);
    }

    const items = xmlDoc.getElementsByTagName("item");

    const data = Array.from(items).map((item) => ({
      id: item.getElementsByTagName("P_ID")[0]?.textContent || "N/A",
      subject: item.getElementsByTagName("P_FILE_SUBJECT")[0]?.textContent || "N/A",
      action: item.getElementsByTagName("P_ACTION")[0]?.textContent || "N/A",
      actionBy: item.getElementsByTagName("P_ACTION_BY")[0]?.textContent || "N/A",
      actionTo: item.getElementsByTagName("P_ACTION_TO")[0]?.textContent || "N/A",
    }));

    if (data.length === 0) {
      setError("No file records found");
    }

    setFileData(data);

  } catch (err) {
    console.error("❌ SOAP Error:", err);

    if (err.name === "AbortError") {
      setError("Request timeout");
    } else {
      setError("SOAP API Failed / CORS / Server Issue");
    }

    setFileData([]);
  } finally {
    setLoading(false);
  }
};
  // ================= REST API =================
  const fetchUsers = () => {
    setLoading(true);
    setError("");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setApiUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("User API Failed");
        setLoading(false);
      });
  };

  // ================= FILTER =================
  const filteredUsers = apiUsers.filter((u) =>
    u.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  // ================= UI =================
  return (
    <div style={styles.container}>

      {/*<Navbar />*/}

      <div style={styles.main}>

        <div style={styles.welcome}>
          <h2>Welcome, {user} 👋</h2>
          <p>Role: {role ? role.toUpperCase() : "N/A"}</p>
        </div>

        {/* ADMIN */}
        {role === "admin" && (
          <div style={styles.cardContainer}>
            <div style={styles.card} onClick={() => goTo("/employees")}>
              <h3>👨‍💼 Employees</h3>
            </div>

            <div style={styles.card}>
              <h3>⚡ Projects</h3>
            </div>

            <div style={styles.card}>
              <h3>📊 Reports</h3>
            </div>

            <div style={styles.card} onClick={() => goTo("/feedback")}>
              <h3>📝 Feedback</h3>
            </div>
          </div>
        )}

        {/* USER */}
        {role === "user" && (
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <h3>📄 My Profile</h3>
            </div>

            <div style={styles.card} onClick={() => goTo("/feedback")}>
              <h3>📝 Feedback</h3>
            </div>

            <div style={styles.card} onClick={() => goTo("/contact")}>
              <h3>📞 Contact</h3>
            </div>
          </div>
        )}

        <h1 style={styles.header}>📊 Dashboard</h1>

        <div style={styles.grid}>

          {/* FILE TRACKING */}
          <div style={styles.card}>
            <h2>📄 File Tracking</h2>

            <input
              placeholder="Enter File Number"
              value={searchFile}
              onChange={(e) => setSearchFile(e.target.value)}
              style={styles.input}
            />

            <button onClick={() => fetchFileData(searchFile)} style={styles.button}>
              Search File
            </button>

            {fileData.map((f) => (
              <div key={f.id}>
                <p><b>{f.subject}</b></p>
              </div>
            ))}
          </div>

          {/* REST USERS */}
          <div style={styles.card}>
            <h2>👤 API Users</h2>

            <input
              placeholder="Search User"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              style={styles.input}
            />

            <button onClick={fetchUsers} style={styles.button}>
              Load Users
            </button>

            {filteredUsers.map((u) => (
              <div key={u.id}>
                <b>{u.name}</b>
                <p>{u.email}</p>
              </div>
            ))}
          </div>

          {/* DB2 USERS */}
          <div style={styles.card}>
            <h2>🗄️ DB2 Users</h2>

            <input
              placeholder="Enter User ID"
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchUsersdb()}
              style={styles.input}
            />

            <button onClick={fetchUsersdb} style={styles.button}>
              Search DB2 User
            </button>

            {dbUsers.map((u, index) => (
              <div key={index}>
                <b>{u.name}</b>
                <p>{u.email}</p>
              </div>
            ))}
          </div>

        </div>

        {loading && <p style={styles.loading}>⏳ Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>

      <p style={styles.footer}>
        © 2026 NTPC Limited | Powering India ⚡
      </p>

    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: {
    fontFamily: "Arial",
    minHeight: "100vh",
    background: "#f4f6f9"
  },
  main: {
    padding: "20px"
  },
  welcome: {
    textAlign: "center",
    marginBottom: "20px"
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px"
  },
  header: {
    textAlign: "center",
    margin: "20px 0"
  },
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  loading: {
    textAlign: "center"
  },
  error: {
    color: "red",
    textAlign: "center"
  },
  footer: {
    textAlign: "center",
    marginTop: "40px",
    color: "#777"
  }
};

export default Dashboard;