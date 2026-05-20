import React, { useRef, useState, useEffect, useContext } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { loading, generateReport, reports, getReports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const { handleLogout } = useAuth();

  const onLogout = async () => {
    await handleLogout();

    navigate("/login");
  };

  useEffect(() => {
    // Push current page into history again
    window.history.pushState(null, "", window.location.href);

    const handleBackButton = () => {
      // Reload instead of going back
      window.location.reload();

      // Push again so back keeps behaving the same
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loading-card">
          <div className="spinner"></div>

          <h1>Loading your interview plan...</h1>

          <p>
            Preparing AI generated interview questions and analysis for you.
          </p>
        </div>
      </main>
    );
  }
  return (
    <main className="home">
      {/* HERO SECTION */}

      <section className="hero-section">
        <div className="hero-content">
          {/* <p className="badge">AI Powered Interview Preparation</p> */}
          <div className="hero-top">
            <p className="badge">AI Powered Interview Preparation</p>

            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>

          <h1>
            Generate Professional <span>Interview Reports</span> Instantly
          </h1>

          <p className="hero-description">
            Upload your resume, add your target job description, and receive a
            complete AI-generated interview preparation report with technical
            questions, behavioral questions, skill gaps, and a preparation
            roadmap.
          </p>
        </div>
      </section>

      {/* MAIN FORM */}

      <section className="form-section">
        <div className="form-container-home">
          {/* LEFT */}

          <div className="left-panel">
            <div className="panel-header">
              <h2>Job Description</h2>

              <p>
                Paste the job description to help the AI tailor your interview
                preparation report.
              </p>
            </div>

            <textarea
              onChange={(e) => {
                setJobDescription(e.target.value);
              }}
              name="jobDescription"
              id="jobDescription"
              placeholder="Paste the complete job description here..."
            ></textarea>
          </div>

          {/* RIGHT */}

          <div className="right-panel">
            {/* RESUME */}

            <div className="input-card">
              <div className="card-header">
                <h3>Upload Resume</h3>

                <p>
                  Upload your latest resume in PDF format for better AI
                  analysis.
                </p>
              </div>

              <label htmlFor="resume" className="file-upload-box">
                <div className="upload-icon">↑</div>

                <h4>Choose Resume File</h4>

                <span>PDF format only</span>
              </label>

              <input
                hidden
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
                ref={resumeInputRef}
              />
            </div>

            {/* SELF DESCRIPTION */}

            <div className="input-card">
              <div className="card-header">
                <h3>Self Description</h3>

                <p>
                  Describe your experience, strengths, projects, and career
                  goals.
                </p>
              </div>

              <textarea
                onChange={(e) => {
                  setSelfDescription(e.target.value);
                }}
                name="selfDescription"
                id="selfDescription"
                placeholder="Describe yourself in a few professional sentences..."
              ></textarea>
            </div>

            {/* BUTTON */}

            <button className="generate-btn" onClick={handleGenerateReport}>
              Generate Interview Report
            </button>
          </div>
        </div>
      </section>
      {/* REPORT HISTORY */}

      <div className="reports-history">
        <div className="reports-header">
          <h3>Previous Reports</h3>

          <p>
            Access all your previously generated AI interview preparation
            reports.
          </p>
        </div>

        <div className="reports-list">
          {(reports || []).map((item, index) => (
            <div
              className="report-card"
              key={item._id || index}
              onClick={() => navigate(`/interview/${item._id}`)}
            >
              <div className="report-top">
                <div className="report-info">
                  <h4>
                    {item?.jobDescription?.slice(0, 45) || "Interview Report"}
                    ...
                  </h4>

                  <small>
                    Generated on{" "}
                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </small>
                </div>

                <span>{item?.matchScore || 0}%</span>
              </div>

              <p>
                {item?.selfDescription?.slice(0, 90) ||
                  "AI generated interview preparation report"}
                ...
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
