import React, { useState } from "react";
import "../auth.style.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
function Login() {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };
  if (loading) {
    return (
      <>
        <main>
          <h1>Loading</h1>
        </main>
      </>
    );
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="email"
              placeholder="Enter email address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              placeholder="Enter password"
            />
          </div>
          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
