import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function AddNewAdmin({ fetchData, closeForm }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Add email state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (username === "" || password === "" || confirmPassword === "" || name === "" || email === "") {
      setError("Please fill in all the required fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password should contain at least 8 characters including minimum 1 number. Try again"
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/newAdmin", {
        username: username,
        password: password,
        name: name,
        email: email, // Add email to the request
      });
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false); // Clear the error after 5 seconds
        }, 5000);
        setName("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        closeForm();
        fetchData();
      } else if (response.status === 409) {
        setError("Admin with this username already exists");
      } else {
        setError(response.data);
      }
    } catch (error) {
      setSuccess(false);
      if (error.response && error.response.status === 409) {
        setError("Username taken!");
      } else {
        setError(
          "An error occurred while adding admin. Please try again later"
        );
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center align-items-center"
      >
        <Form.Control
          className="m-3"
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Form.Control
          className="m-3"
          type="text"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Form.Control
          className="m-3"
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Control
          className="m-3"
          type="password"
          name="pass"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Form.Control
          className="m-3"
          type="password"
          name="confirmPass"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" style={{ width: "200px", margin: "20px" }}>
          Create
        </Button>
      </Form>
      {error && <div className="error">{error}</div>}
      {success && <div className="msg">{success}</div>}
    </div>
  );
}
