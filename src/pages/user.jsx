import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function User() {
  const user = localStorage.getItem("user");

  const monthlyData = [
    { name: "Jan", reports: 5 },
    { name: "Feb", reports: 8 },
    { name: "Mar", reports: 12 },
    { name: "Apr", reports: 10 },
    { name: "May", reports: 15 },
    { name: "Jun", reports: 18 },
  ];

  const statusData = [
    { name: "Completed", value: 12 },
    { name: "Pending", value: 5 },
    { name: "Rejected", value: 3 },
  ];

  return (
    <div style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "10px" }}>👤 Welcome, {user}</h2>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <h3>📄 Total Reports</h3>
          <p>25</p>
        </div>
        <div style={cardStyle}>
          <h3>✅ Completed</h3>
          <p>12</p>
        </div>
        <div style={cardStyle}>
          <h3>⏳ Pending</h3>
          <p>5</p>
        </div>
        <div style={cardStyle}>
          <h3>❌ Rejected</h3>
          <p>3</p>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

        {/* Line Chart */}
        <div style={chartBox}>
          <h3>📈 Monthly Reports</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="reports" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={chartBox}>
          <h3>📊 Report Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reports" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Pie Chart */}
      <div style={{ ...chartBox, marginTop: "20px" }}>
        <h3>🥧 Report Status</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
              {statusData.map((entry, index) => (
                <Cell key={index} fill={["#0088FE", "#FFBB28", "#FF8042"][index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div style={{ marginTop: "20px", background: "white", padding: "15px", borderRadius: "10px" }}>
        <h3>📄 Recent Reports</h3>
        <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#eee" }}>
              <th style={th}>Report ID</th>
              <th style={th}>Date</th>
              <th style={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={td}>R001</td>
              <td style={td}>01 Mar 2026</td>
              <td style={td}>✅ Completed</td>
            </tr>
            <tr>
              <td style={td}>R002</td>
              <td style={td}>05 Mar 2026</td>
              <td style={td}>⏳ Pending</td>
            </tr>
            <tr>
              <td style={td}>R003</td>
              <td style={td}>10 Mar 2026</td>
              <td style={td}>❌ Rejected</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  width: "200px",
  textAlign: "center"
};

const chartBox = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  flex: 1,
  minWidth: "300px"
};

const th = { padding: "10px", border: "1px solid #ccc" };
const td = { padding: "10px", border: "1px solid #ccc" };

export default User;