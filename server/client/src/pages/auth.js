import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
// import { setCookie } from "../cookieUtils";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
        );
    };

    const Login = () => {
        const [_, setCookies] = useCookies(["access_token"]);
      
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
      
        const navigate = useNavigate();
      
        const onnSubmit = async (event) => {
          event.preventDefault();
      
          try {
            const result = await axios.post("http://localhost:3001/auth/login", {
              username,
              password,
            });
      
            setCookies("access_token", result.data.token);
            //setCookie("access_token", result.data.token, 365);
            window.localStorage.setItem("userID", result.data.userID);
            navigate("/"); //navigate to the home page
          } catch (error) {
            console.error(error);
          }
        };
      
      return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label = "Login"
            onnSubmit={onnSubmit}
        />);
      };

    const Register = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
      
      //   const [_, setCookies] = useCookies(["access_token"]);
      //   const navigate = useNavigate();
      
        const onnSubmit = async (event) => {
          event.preventDefault(); // so that the page does not reload
          try {
            await axios.post("http://localhost:3001/auth/register", { // post data to the server
              username,
              password,
            });
            alert("Registration Completed! Now login.");
          } catch (err) {
            console.error(err);
          }
        };
      
        return (
          <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label = "Register"
            onnSubmit={onnSubmit}
          />  
        );
    };

        const Form = ({username, setUsername, password, setPassword, label, onnSubmit}) => {
            return (
                <div className="auth-container">
                  <form onSubmit={onnSubmit}>
                  <h2>{label}</h2>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <button type="submit">{label}</button>
                </form>
              </div>
        
            )
        }