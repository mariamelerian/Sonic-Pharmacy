import axios from "axios";
import * as React from "react";
import { useState } from "react";
import FormPassword from "../FormPassword";
import FormInput from "../FormInput";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap"; //for uploding pics

const PharmSignupForm = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [rate, setRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [education, setEducation] = useState("");
  const [error1, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, isLoading] = useState(null);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const [selectedIdImage, setSelectedIdImage] = useState(null); // Added
  const [selectedPharmacyDegreeImage, setSelectedPharmacyDegreeImage] =
    useState(null);
  const [selectedWorkingLicenseImage, setSelectedWorkingLicenseImage] =
    useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    isLoading(true);

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !birthdate ||
      !username ||
      !education ||
      !affiliation ||
      !rate
    ) {
      setError("Please fill in all fields");
      console.log(error1);
      isLoading(false);
      return;
    }
    if (!username.trim()) {
      setError("Nationality is required.");
      isLoading(false);
      return;
    }
    //Validation For Email input field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const englishOnlyRegex = /^[\x00-\x7F]*$/;

    if (!email) {
      setError("Email field cannot be empty.");
      isLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      isLoading(false);
      return;
    }
    if (!englishOnlyRegex.test(email)) {
      setError("Email must be in English only.");
      isLoading(false);
      return;
    }
    if (email.length > 320) {
      setError("Email exceeds maximum character limit (320).");
      isLoading(false);
      return;
    }
    if (/[^\x00-\x7F]/.test(email)) {
      setError("Email cannot contain emojis or special characters.");
      isLoading(false);
      return;
    }
    if (/\s/.test(email)) {
      setError("Email cannot contain spaces.");
      isLoading(false);
      return;
    }
    // Validation for Last Name
    const emojiRegex = /[\u{1F300}-\u{1F6FF}]/u;
    const numberRegex = /\d/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const languageRegex = /[^\x00-\x7F]/;
    const nameRegex = /^[^\s]+(\s[^\s]+)?$/;

    if (name.length < 2) {
      setError("name must be at least 2 characters.");
      isLoading(false);
      return;
    }
    if (emojiRegex.test(name)) {
      setError(" name cannot contain emojis.");
      isLoading(false);
      return;
    }
    if (numberRegex.test(name)) {
      setError("name cannot contain numbers.");
      isLoading(false);
      return;
    }
    if (symbolRegex.test(name)) {
      setError(" name cannot contain symbols.");
      isLoading(false);
      return;
    }
    if (languageRegex.test(name)) {
      setError("Last name cannot contain characters from multiple languages.");
      isLoading(false);
      return;
    }
    if (!nameRegex.test(name)) {
      setError(
        "Name must contain either one name or two names with only one space between them."
      );
      isLoading(false);
      return;
    }

    //Validation for Password Field
    var uppercaseRegex = /[A-Z]/;
    var lowercaseRegex = /[a-z]/;
    var digitRegex = /[0-9]/;
    var specialCharRegex = /[~!@#$%^&*_+=`|(){}[\]:;"'<>,.?/-]/;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      isLoading(false);
      return;
    }

    if (!uppercaseRegex.test(password)) {
      setError("Password must contain at least one uppercase letter");
      isLoading(false);
      return;
    }

    if (!lowercaseRegex.test(password)) {
      setError("Password must contain at least one lowercase letter");
      isLoading(false);
      return;
    }

    if (!digitRegex.test(password)) {
      setError("Password must contain at least one digit");
      isLoading(false);
      return;
    }

    if (!specialCharRegex.test(password)) {
      setError("Password must contain at least one special character");
      isLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      isLoading(false);
      return;
    } else {
      try {
        const response = await axios.post("/newPharmacist", {
          username: username,
          name: name,
          email: email,
          password: password,
          dateOfBirth: birthdate,
          hourlyRate: rate,
          affiliation: affiliation,
          education: education,
          files: [
            selectedIdImage,
            selectedPharmacyDegreeImage,
            selectedWorkingLicenseImage,
          ],
        });

        if (response.status === 201) {
          isLoading(false);
          setSuccess("Your application will be reviewed");
        } else {
          setError("Signup failed");
          isLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 408) {
          setError("Username already exists");
        } else if (error.response && error.response.status === 409) {
          setError("Email already registered");
        } else if (error.response && error.response.status !== 201) {
          setError("Signup failed");
        } else {
          setError(
            "An error occurred while signing up. Please try again later."
          );
        }

        isLoading(false);
      }
    }
  };
  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const handleImageUpload = (e, imageType) => {
    const file = e.target.files[0];

    switch (imageType) {
      case "id":
        setSelectedIdImage(file);
        break;
      case "pharmacyDegree":
        setSelectedPharmacyDegreeImage(file);
        break;
      case "workingLicense":
        setSelectedWorkingLicenseImage(file);
        break;
      default:
        break;
    }
  };

  return (
    <div className="col-9 form-container">
      <div className="form-title">Hello!</div>
      <div className="form-title">Submit a Request to Get Started</div>
      <form className="rounded-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <FormInput
                name="Name"
                type="text"
                placeholder="Elina Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormInput
              name="Birth date"
              type="date"
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="col">
            <FormInput
              name="Username"
              placeholder="ElinaJohn1"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormInput
              name="Hourly Rate"
              type="number"
              placeholder="50"
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className="col">
            <FormInput
              name="Affiliation"
              placeholder="ZZZ Hospital"
              type="text"
              onChange={(e) => setAffiliation(e.target.value)}
            />
          </div>
        </div>

        <FormInput
          name="Educational Background"
          type="text"
          placeholder="MBA"
          onChange={(e) => setEducation(e.target.value)}
        />
        <FormInput
          name="Email"
          type="email"
          placeholder="john.doe@ibm.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormPassword
          id="password"
          name="Password"
          type="password"
          placeholder="**************"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormPassword
          name="Confirm Password"
          type="password"
          placeholder="**************"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* // Section for "Upload ID" */}
        <div className="mb-4">
          <Form.Group>
            <Form.Label>Upload ID</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="IdImage"
              onChange={(e) => handleImageUpload(e, "id")}
            />
          </Form.Group>
        </div>

        {/* // Section for "Upload Pharmacy Degree" */}
        <div className="mb-4">
          <Form.Group>
            <Form.Label>Upload Pharmacy Degree</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="PharmacyDegreeImage"
              onChange={(e) => handleImageUpload(e, "pharmacyDegree")}
            />
          </Form.Group>
        </div>

        {/* // Section for "Upload Working License" */}
        <div className="mb-4">
          <Form.Group>
            <Form.Label>Upload Working License</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="WorkingLicenseImage"
              onChange={(e) => handleImageUpload(e, "workingLicense")}
            />
          </Form.Group>
        </div>
        <button
          id="nextbtn"
          className="w-100 btn-sm custom-button"
          type="submit"
        >
          Next
        </button>
        <div className="form-comment" style={{ cursor: "default" }}>
          Have an account?{" "}
          <div
            className="text-decoration-none link-decoration"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        </div>
        {error1 && (
          <div
            style={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              fontSize: "0.85rem",
              backgroundColor: "#f44336 ",
              color: "white", // White text color
              padding: "10px", // Padding around the message
              borderRadius: "5px", // Rounded corners
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            {error1}
          </div>
        )}
        {success && (
          <div
            className="d-flex justify-content-center"
            style={{
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              fontSize: "0.85rem",
              backgroundColor: "#099BA0 ",
              color: "white", // White text color
              padding: "10px", // Padding around the message
              borderRadius: "5px", // Rounded corners
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Box shadow for a subtle effect
            }}
          >
            {success}
          </div>
        )}
      </form>
    </div>
  );
};

export default PharmSignupForm;
