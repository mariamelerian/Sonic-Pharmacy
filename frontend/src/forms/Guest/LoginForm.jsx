import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormPassword from "../FormPassword";
import FormInput from "../FormInput";
import ForgotPassword from "../../pages/Guest/ForgotPassword";
import { setCredentialsAdminPharm } from "../../state/loginAdminReducer";
import { setCredentialsPatientPharm } from "../../state/loginPatientReducer";
import { setCredentialsPharmacist } from "../../state/loginPharmacistReducer";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error1, setError] = useState(null);
  const [loading, isLoading] = useState(null);

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
    isLoading(false);
    try {
      const response = await axios.post("/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        const user = response.data.user;
        const type = response.data.message;

        if (type === "Patient") {
          dispatch(
            setCredentialsPatientPharm({
              username: username,
              birthdate: user.dateOfBirth,
              email: user.email,
              name: user.name,
              gender: user.gender,
              phoneNumber: user.mobileNumber,
              userId: user._id,
              emergencyName: user.emergencyFullName,
              emergencyNumber: user.emergencyMobileNumber,
              wallet: user.wallet,
              emergencyRelation: user.emergencyRelation,
              isLoggedIn: true,
            })
          );

          isLoading(false);
          navigate("/patient");
        }
        if (type === "Pharmacist") {
          dispatch(
            setCredentialsPharmacist({
              username: username,
              birthdate: user.dateOfBirth,
              email: user.email,
              name: user.name,
              hourlyRate: user.hourlyRate,
              affiliation: user.affiliation,
              education: user.education,
              documents: user.files,
              userId: user._id,
              isLoggedIn: true,
            })
          );
          navigate("/pharmacist");
          isLoading(false);
        }
        if (type === "Admin") {
          dispatch(
            setCredentialsAdminPharm({
              userName: username,
              userId: user._id,
            })
          );

          navigate("/admin");
          isLoading(false);
        }
      } else {
        console.error("Login failed:", response.data);
        setError("Login failed");
        isLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 401) {
        console.log("Authentication error");
        setError("Invalid Credentials");
      } else if (error.response && error.response.status === 500) {
        setError("Server Error");
      } else {
        setError("An error occurred while logging in. Please try again later.");
      }

      isLoading(false);
    }
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
        {error1 && <div className="error">{error1}</div>}

        <Container className="signup-container">
          <a
            href="/patient-signup"
            className="signup text-decoration-none"
            style={{ cursor: "pointer" }}
          >
            Don't have an account? Sign Up.
          </a>
        </Container>

      </Form>
    </div>
  );
};
export default LoginForm;
