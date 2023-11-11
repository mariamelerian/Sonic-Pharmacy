import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
/* import { useDispatch } from "react-redux"; */
import FormPassword from "../FormPassword";
import FormInput from "../FormInput";
import ForgotPassword from "../../pages/Guest/ForgotPassword";
/* import { setCredentials } from "../../state/loginPatientReducer"; */


const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error1, setError] = useState(null);
  const [loading, isLoading] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleClick = async (e) => {


    e.preventDefault();
    setError(null);
    isLoading(true);
    if (!username || !password) {
      setError("Please fill in all the required fields");
      isLoading(false);
      return;
    }
    // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // if (!username.match(emailRegex)) {
    //   setError("Invalid email format.");
    //   console.log(error1);
    //   isLoading(false);
    //   return;
    // }
    isLoading(false);

    //try to log in
    //save user id and role from response 
    const userData = {
      username: username,
      password: password,
    };
    
    axios.post("/login", userData)
      .then(response => {
        // Handle the response data
        
        console.log('Login successful:', response.data);

        if(response.status == 200){
          const role = response.data.message;
          const user = response.data.user;
          localStorage.setItem("userId", user._id);
          if(role == "Admin")
            navigate("/admin");
          else if (role == "Pharmacist")
            navigate("/pharmacist")
          else 
            navigate("/patient")
        }
      })
      .catch(error => {
        // Handle errors
        console.error('Error during login:', error);
        setError("Invalid credentials");
        isLoading(false);
      });
  };

  return (
    <div className="col-9 form-container">
      <div className="form-title">Welcome Back!</div>
      <Form className="rounded-3" onSubmit={handleSubmit}>
        <FormInput
          name="Username"
          type="text"
          placeholder="john.doe"
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormPassword
          name="Password"
          type="password"
          placeholder="**************"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Container className="forgot-password-container">
      <a
        href="/forgot-password"
        className="forgot-password text-decoration-none"
        style={{ cursor: "pointer" }}
      >
        Forgot Password?
      </a>
    </Container>
        <button
          className="w-100 btn-sm custom-button"
          disabled={loading}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          Login
        </button>
        {/* <div className="form-comment" style={{ cursor: "default" }}>
          Don't have an account?{" "}
          <div
            className="text-decoration-none  link-decoration "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("signup")}
          >
            Sign Up
          </div>
        </div> */}
        {error1 && (
          <div
            style={{
              marginTop: "2rem",
              backgroundColor: "#f44336", // Red background color
              color: "white", // White text color
              padding: "10px", // Padding around the message
              borderRadius: "5px", // Rounded corners
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Box shadow for a subtle effect
            }}
          >
            {error1}
          </div>
        )}
      </Form>
    </div>
  );
};
export default LoginForm;
