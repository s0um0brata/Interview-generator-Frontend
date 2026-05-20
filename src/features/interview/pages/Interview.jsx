import React, { useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { InterviewProvider } from "../interview.context";
import { useParams } from "react-router";

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const { report, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  const renderContent = () => {
    switch (activeTab) {
      case "technical":
        return (
          <div className="questions-container">
            {report?.technicalQuestions?.map((item, index) => (
              <div className="question-card" key={index}>
                <h3>{item.question}</h3>

                <div className="card-section">
                  <span>Intention</span>
                  <p>{item.intention}</p>
                </div>

                <div className="card-section">
                  <span>Answer</span>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "behavioral":
        return (
          <div className="questions-container">
            {report?.behavioralQuestions?.map((item, index) => (
              <div className="question-card" key={index}>
                <h3>{item.question}</h3>

                <div className="card-section">
                  <span>Intention</span>
                  <p>{item.intention}</p>
                </div>

                <div className="card-section">
                  <span>Answer</span>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "roadmap":
        return (
          <div className="roadmap-container">
            {report?.preparationPlan?.map((item, index) => (
              <div className="roadmap-card" key={index}>
                <h3>
                  Day {item.day} - {item.focus}
                </h3>

                <ul>
                  {item.tasks?.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="interview-page">
      <div className="interview-layout">
        {/* LEFT SIDEBAR */}

        <div className="left-sidebar">
          <button
            className={activeTab === "technical" ? "active" : ""}
            onClick={() => setActiveTab("technical")}
          >
            Technical Questions
          </button>

          <button
            className={activeTab === "behavioral" ? "active" : ""}
            onClick={() => setActiveTab("behavioral")}
          >
            Behavioral Questions
          </button>

          <button
            className={activeTab === "roadmap" ? "active" : ""}
            onClick={() => setActiveTab("roadmap")}
          >
            Road Map
          </button>
          <div className="resume-btn-wrapper">
            <button
              className="resume-btn"
              disabled={loading}
              onClick={() => getResumePdf(interviewId)}
            >
              {loading
                ? "Generating Resume..."
                : "Download AI Generated Resume"}
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}

        <div className="main-content">
          {!report ? <p>Loading...</p> : renderContent()}
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="right-sidebar">
          <h2>Skill Gaps</h2>

          <div className="skill-list">
            {report?.skillGaps?.map((item, index) => (
              <div className="skill-card" key={index}>
                <span>{item.skill}</span>

                <p className={item.severity}>{item.severity}</p>
              </div>
            ))}
          </div>

          <div className="match-score">
            <h1>{report?.matchScore || 0}%</h1>
            <p>Match Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
