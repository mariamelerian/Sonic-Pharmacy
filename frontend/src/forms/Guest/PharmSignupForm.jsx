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
      !rate ||
      !selectedIdImage ||
      !selectedPharmacyDegreeImage ||
      !selectedWorkingLicenseImage
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
      const formData = new FormData();

      formData.append("username", username);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("dateOfBirth", birthdate);
      formData.append("hourlyRate", rate);
      formData.append("affiliation", affiliation);
      formData.append("education", education);
      formData.append("files", selectedIdImage);
      formData.append("files", selectedPharmacyDegreeImage);
      formData.append("files", selectedWorkingLicenseImage);

      console.log(selectedIdImage);

      // if (selectedIdImage) {
      //   try {
      //     // Read the file data as a Uint8Array
      //     const fileArrayBuffer = await selectedIdImage.arrayBuffer();
      //     const fileUint8Array = new Uint8Array(fileArrayBuffer);

      //     // Format the file
      //     const formattedFile = {
      //       filename: selectedIdImage.name,
      //       mimetype: selectedIdImage.type,
      //       buffer: {
      //         type: "Buffer",
      //         data: Array.from(fileUint8Array),
      //       },
      //     };

      //     console.log(`Processed file: ${selectedIdImage.name}`);

      //     // Check if any errors occurred during processing
      //     if (!formattedFile) {
      //       console.error("Error processing file:", selectedIdImage.name);
      //       return;
      //     }

      //     const blob = new Blob([formattedFile.buffer.data], {
      //       type: formattedFile.mimetype,
      //     });

      //     formData.append("files", blob, formattedFile.filename);

      //     console.log("formData after processing:", formattedFile.buffer.data);
      //   } catch (error) {
      //     console.error("Error processing file:", selectedIdImage.name, error);
      //   }
      // }

      // if (selectedPharmacyDegreeImage) {
      //   try {
      //     // Read the file data as a Uint8Array
      //     const fileArrayBuffer =
      //       await selectedPharmacyDegreeImage.arrayBuffer();
      //     const fileUint8Array = new Uint8Array(fileArrayBuffer);

      //     // Format the file
      //     const formattedFile = {
      //       filename: selectedPharmacyDegreeImage.name,
      //       mimetype: selectedPharmacyDegreeImage.type,
      //       buffer: {
      //         type: "Buffer",
      //         data: Array.from(fileUint8Array),
      //       },
      //     };

      //     console.log(`Processed file: ${selectedPharmacyDegreeImage.name}`);

      //     // Check if any errors occurred during processing
      //     if (!formattedFile) {
      //       console.error(
      //         "Error processing file:",
      //         selectedPharmacyDegreeImage.name
      //       );
      //       return;
      //     }

      //     const blob = new Blob([formattedFile.buffer.data], {
      //       type: formattedFile.mimetype,
      //     });

      //     formData.append("files", blob, formattedFile.filename);

      //     console.log("formData after processing:", formattedFile.buffer.data);
      //   } catch (error) {
      //     console.error(
      //       "Error processing file:",
      //       selectedPharmacyDegreeImage.name,
      //       error
      //     );
      //   }
      // }

      // if (selectedWorkingLicenseImage) {
      //   try {
      //     // Read the file data as a Uint8Array
      //     const fileArrayBuffer =
      //       await selectedWorkingLicenseImage.arrayBuffer();
      //     const fileUint8Array = new Uint8Array(fileArrayBuffer);

      //     // Format the file
      //     const formattedFile = {
      //       filename: selectedWorkingLicenseImage.name,
      //       mimetype: selectedWorkingLicenseImage.type,
      //       buffer: {
      //         type: "Buffer",
      //         data: Array.from(fileUint8Array),
      //       },
      //     };

      //     console.log(`Processed file: ${selectedWorkingLicenseImage.name}`);

      //     // Check if any errors occurred during processing
      //     if (!formattedFile) {
      //       console.error(
      //         "Error processing file:",
      //         selectedWorkingLicenseImage.name
      //       );
      //       return;
      //     }

      //     const blob = new Blob([formattedFile.buffer.data], {
      //       type: formattedFile.mimetype,
      //     });

      //     formData.append("files", blob, formattedFile.filename);

      //     console.log("formData after processing:", formattedFile.buffer.data);
      //   } catch (error) {
      //     console.error(
      //       "Error processing file:",
      //       selectedWorkingLicenseImage.name,
      //       error
      //     );
      //   }
      // }

      try {
        const response = await axios.post("/newPharmacist", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
              accept=".pdf"
              name="IdImage"
              onChange={(e) => setSelectedIdImage(e.target.files[0])}
            />
          </Form.Group>
        </div>

        {/* // Section for "Upload Pharmacy Degree" */}
        <div className="mb-4">
          <Form.Group>
            <Form.Label>Upload Pharmacy Degree</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              name="PharmacyDegreeImage"
              onChange={(e) =>
                setSelectedPharmacyDegreeImage(e.target.files[0])
              }
            />
          </Form.Group>
        </div>

        {/* // Section for "Upload Working License" */}
        <div className="mb-4">
          <Form.Group>
            <Form.Label>Upload Working License</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              name="WorkingLicenseImage"
              onChange={(e) =>
                setSelectedWorkingLicenseImage(e.target.files[0])
              }
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
        {error1 && <div className="error">{error1}</div>}
        {success && <div className="msg">{success}</div>}
      </form>
    </div>
  );
};

export default PharmSignupForm;
