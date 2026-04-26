import React from 'react'
import {Link , useNavigate} from 'react-router'
function Register() {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="username" placeholder="Enter username" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email address" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button className="button primary-button">Register</button>
        </form>
        <p>Already have an account ? <Link to='/Login'>Login</Link></p>
      </div>

    </main>
  )
}

export default Register;