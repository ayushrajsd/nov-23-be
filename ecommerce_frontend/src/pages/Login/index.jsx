import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../../../urlConfig";
import './login.css'
import { useAuth } from "../../contexts/AuthProvider";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {authenticatedUser,setAuthenticatedUser} = useAuth();

    const handleSubmit = async (e) => {
        console.log("submit");
        setLoading(true);
        const userDetails = { email, password };
        const res = await axios.post(URL.LOGIN_URL, userDetails, { withCredentials: true });
        console.log("response from login", res);
        setLoading(false);
        setEmail("");
        setPassword("");
        setErrMsg("");
        setAuthenticatedUser(res.data.user);
        navigate("/");

    }
  
    if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="signinscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              // backgroundColor: 'red',
            }}
          >
            <div style={{ cursor: "pointer" }} onClick={() => {}}>
              <i class="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Sign In</p>
          </div>

          <label for="email">Email</label>
          <input
            type="email"
            id="lname"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="password">Password</label>
          <input
            type="password"
            id="lname"
            name="password"
            placeholder="Your Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/signup" className="link">
            <span>Create a new account ?</span>
          </Link>
          <br />
          <input type="submit" value="Sign in" onClick={handleSubmit} />
          <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
