import { useState } from "react";

function Feedback() {
  const [message, setMessage] = useState("");

  const submitFeedback = () => {
    alert("Feedback submitted: " + message);
    setMessage("");
  };

  return (
    <div>
      <h2>Feedback</h2>
      <textarea
        rows="4"
        cols="40"
        placeholder="Enter your feedback"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br /><br />
      <button onClick={submitFeedback}>Submit</button>
    </div>
  );
}

export default Feedback;