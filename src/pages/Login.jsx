import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // For animations


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);

  // OTP states
  const [otp, setOtp] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  // Animation state
  const [fadeOut, setFadeOut] = useState(false);

  const navigate = useNavigate();

  // -------------------
  // Live Clock
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // -------------------
  // Handle login
  const handleLogin = async () => {
    setStatus("");
    try {
      const res = await fetch("http://localhost:8080/MySQL/LoginServlet", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: username.trim(),
          password: password.trim()
        })
      });

      if (!res.ok) throw new Error("HTTP error: " + res.status);
      const text = await res.text();
      const data = JSON.parse(text);

      if (data.status === "OTP_SENT") {
        setShowOtpScreen(true);
        setStatus("OTP sent to your email 📩");
        setError(false);
      } else {
        setStatus("Invalid Credentials ❌");
        setError(true);
      }
    } catch (err) {
      setStatus("Server error ❌");
      setError(true);
    }
  };

  // -------------------
  // Verify OTP
  const verifyOTP = async () => {
    setStatus("");
    try {
      const res = await fetch("http://localhost:8080/MySQL/VerifyOTPServlet", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ otp: otp.trim() })
      });

      if (!res.ok) throw new Error("HTTP error: " + res.status);
      const text = await res.text();
      const data = JSON.parse(text);

      if (data.status === "SUCCESS") {
        localStorage.setItem("user", "true");
        localStorage.setItem("role", data.role);

        // Trigger fade out animation
        setFadeOut(true);

        // Wait animation then navigate
        setTimeout(() => {
          const role = data.role?.trim().toLowerCase();
          navigate(role === "admin" ? "/dashboard" : "/user");
        }, 800);
      } else {
        setStatus("Invalid OTP ❌");
        setError(true);
      }
    } catch (err) {
      setStatus("Server error ❌");
      setError(true);
    }
  };

  const goBackToLogin = () => {
    setShowOtpScreen(false);
    setOtp("");
    setStatus("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") showOtpScreen ? verifyOTP() : handleLogin();
  };

  return (
    <div className="login-container">
      <marquee className="marquee">
        ⚡ Welcome to NTPC Portal | Secure Login System | Powering India 🇮🇳 ⚡
      </marquee>

      <div className="clock">⏰ {time.toLocaleTimeString()}</div>

      <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" className="floating floating1"/>
      <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" className="floating floating2"/>
      <img src="https://cdn-icons-png.flaticon.com/512/4149/4149682.png" className="floating floating3"/>

      <div className={`card ${fadeOut ? "fade-out" : "fade-in"}`}>
        <h3>{showOtpScreen ? "🔐 Enter OTP" : "🔑 Sign In"}</h3>

        {!showOtpScreen ? (
          <>
            <input
              placeholder="👤 Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <input
              type="password"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={handleLogin} disabled={!username || !password}>🚀 Login</button>
          </>
        ) : (
          <>
            <input
              placeholder="🔢 Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={verifyOTP}>✅ Verify OTP</button>
            <button className="back-button" onClick={goBackToLogin}>⬅ Back</button>
          </>
        )}

        {status && <p style={{ color: error ? "red" : "green", marginTop: "10px" }}>{status}</p>}
      </div>

      <p className="footer">© 2026 NTPC Limited | Powering India ⚡</p>
    </div>
  );
}

export default Login;