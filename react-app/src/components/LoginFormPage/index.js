import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/home')
    }
  };

  const handleDemoUser = () => {
    setEmail('bubbles@aa.io')
    setPassword('password')
  }

  return (
    <div id="loginPage">
      <div id="loginText">
        <h1 id="logoHere">FacePamphlet</h1>
        <h3 id="infoText">Connect with friends and the world around tou with FacePamphlet.</h3>
      </div>
      <div >
        <form onSubmit={handleSubmit} id="loginForm">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            <input
              className="verifyBox"
              type="text"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              className="verifyBox"
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button id="loginBtn" type="submit">Log In</button>
          <button id="loginBtn" type="submit" onClick={handleDemoUser}>Demo User</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
