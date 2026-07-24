import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume PDF");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(
        "/resume/upload",
        formData
      );

      console.log("Upload Response:", response.data);

      const resumeId = response.data.resume_id;

      navigate(`/analysis/${resumeId}`);

    } catch (error) {
      console.log("Upload Error:", error);

      if (error.response) {
        console.log("Backend Error:", error.response.data);
        alert(error.response.data.detail || "Upload failed!");
      } else {
        alert("Server connection failed!");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1>Upload Resume</h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "500px",
        }}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />
        <br />

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Upload Resume"}
        </button>
      </div>
    </div>
  );
}

export default UploadResume;