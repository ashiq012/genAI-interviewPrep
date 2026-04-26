import React from "react";
import "../auth.style.scss";
import { Link } from "react-router";
function Login() {
  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email address" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button className="button primary-button">Login</button>
        </form>
        <p>Don't have account ? <Link to='/register'>Register</Link></p>

      </div>
    </main>
  );
}

export default Login;
