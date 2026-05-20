import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({ email, password });

    navigate("/");
  };

  if (loading) {
    return (
      <main className="auth-page">
        <div className="loading-screen">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      {/* LEFT SIDE */}

      <div className="auth-left">
        <div className="overlay"></div>

        <div className="left-content">
          <p className="badge">AI Powered Platform</p>

          <h1>
            Crack Your Next <span>Technical Interview</span>
          </h1>

          <p>
            Generate personalized interview reports, technical questions,
            behavioral questions, skill gap analysis, and preparation roadmaps
            powered by AI.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="auth-right">
        <div className="form-container">
          <div className="form-header">
            <h1>Welcome Back</h1>

            <p>Login to continue your interview preparation journey.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button className="auth-btn">Login</button>
          </form>

          <p className="bottom-text">
            Don't have an account?{" "}
            <Link to={"/register"}>Create Account</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;