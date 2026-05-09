import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
function Register() {
  const {loading,handleRegister} = useAuth();
  const [username, setusername] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const navigate = useNavigate();
  const submitHandler = async(e) => {
    e.preventDefault();
    await handleRegister({username,email,password});
    navigate('/')
  };
  if(loading){
    return <main><h1>Loading....</h1></main>
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => {
                setusername(e.target.value);
              }}
              type="username"
              placeholder="Enter username"
            />
          </div>
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
          <button className="button primary-button">Register</button>
        </form>
        <p>
          Already have an account ? <Link to="/Login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
