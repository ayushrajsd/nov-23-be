import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import axios from "axios";
import URL from "../../../urlConfig";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log("submit");
    setLoading(true);
    const userDetails = { name, email, password, confirmPassowrd, phone };
    const res = await axios.post(URL.SIGNUP_URL, userDetails);
    console.log("response from signup", res);
    setLoading(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
    setErrMsg("");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="signupscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <i class="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Signup</p>
          </div>

          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="password">Confirm Password</label>
          <input
            type="password"
            id="password"
            name="confirmPassword"
            placeholder="Your ConfirmPassword.."
            value={confirmPassowrd}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label for="phone">Contact Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Your Contact Number.."
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <Link to="/signin" className="link">
            <span>Already have an account ?</span>
          </Link>

          <br />
          <input type="submit" value="Sign up" onClick={handleSubmit} />
          <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
