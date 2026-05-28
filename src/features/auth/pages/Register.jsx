import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegsiter } = useAuth();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await handleRegsiter({
      username,
      email,
      password,
    });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
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
          <p className="badge">AI Interview Platform</p>

          <h1>
            Start Your <span>Interview Journey</span> Today
          </h1>

          <p>
            Create your account to generate personalized AI interview reports,
            technical assessments, skill gap analysis, and professional
            preparation roadmaps.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="auth-right">
        <div className="form-container">
          <div className="form-header">
            <h1>Create Account</h1>

            <p>
              Register now and begin preparing smarter for your next interview.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* USERNAME */}

            <div className="input-group">
              <label htmlFor="username">Username</label>

              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            {/* EMAIL */}

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

            {/* PASSWORD */}

            <div className="input-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            {/* BUTTON */}

            <button className="auth-btn">Create Account</button>
          </form>

          <p className="bottom-text">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;