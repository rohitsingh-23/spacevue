import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const providerState = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    axios.get("https://json-server-uz5c.onrender.com/users").then((res) => {
      let flag = false;
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === username && data[i].password === password) {
          providerState.loginUser(data[i]);
          flag = true;
          navigate("/");
        }
      }
      setLoading(false)
      if (!flag) {
        alert("Wrong Username or Password");
      }
    });
  };
  return (
    <div className="login-container">
      <p >Login</p>
      <form className="login-form" onSubmit={(e) => handleLogin(e)}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter UserName"
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="login-btn" type="submit">
          {loading ? (
            <Spinner
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              // size="xl"
            />
          ) : (
           "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
