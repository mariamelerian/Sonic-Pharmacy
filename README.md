# Sonic-Pharmacy

## Project Title

El7a2ny is a complete software solution designed for pharmacists, doctors, and patients. It aims to facilitate and automate interactions between patients, doctors, and pharmacists. The system helps find suitable medication , order prescribed or non-prescribed medication, view previous orders, and conduct text chats.

## Motivation

The motivation behind El7a2ny is to enhance the healthcare experience using technology to simplify and optimize the interactions between healthcare providers and patients. By creating a virtual pharmacy, the goal is to make healthcare services more accessible, efficient, and user-friendly.

## Tech/Framework Used

- **MERN Stack:** Combines MongoDB, Express.js, React, and Node.js for full-stack development.
- **Socket.io:** Used for video chat functionality.
- **Stripe:** Integrated for secure card payment processing.
- **Postman:** Utilized for testing API endpoints.
- **Redux:** Used for state management in the frontend.
- **Bootstrap:** Utilized for responsive and visually appealing UI design.
- **JWT Authentication:** Implemented for secure user authentication.
- **nodemon:** Employed for automatic server restart during development.

## Features

### Patient Features

- **Medicines:**

  - Add medicine to the cart either prescribed or non-prescribed.
  - You can find alternatives for out of stock medicine using the same active ingredient.

- **Cart:**

  - Pay for prescriptions in the cart using Stripe, wallet balance, or cash on delivery (COD).

- **Wallet:**

  - View wallet balance and transactions.
  - Pay for medicine using wallet balance.

- **Profile Management:**
  - Change password securely.
  - Update personal information.
- **My Orders:**

  - View past orders including its details.
  - Cancel a pending order.

- **Chat:**
  - Communication with pharmacist using chat.

### Pharmacist Features

- **Medicine:**

  - View all medicine with its details.
  - Archive medicine.
  - Add new medicine or edit already existing medicine.

- **Sales Report:**

  - View and filter sales reports based on a selected month, medicine, or date.

- **Profile Management:**
  - Change password securely.

### Administrator Features

- **Profile Management:**

  - Change password securely.

- **Manage Users:**

  - Add or remove administrators.
  - Remove patients.
  - View pharmacists' applications, accept or reject them.

- **View Data:**

  - View all pharmacists, patients and admins data.

- **Medicines:**

  - View all medicine with its details.

- **Sales Report:**
  - View and filter sales reports based on a selected month, medicine, or date.

### Guest Features

- **Patient Registration:**

  - Register as a new patient.

- **Pharmacist Registration:**

  - Apply as a pharmacist.

- **Login:**
  - Login as a pharmacist, admin or patient.

### General Features

- **Notification System:**

  - Pharmacist views notifications for out of stock medicine.

- **Chat Functionality:**
  - View individual chats and send messages.
  - Add new chats.

## Authorization and Security

- **User Authentication (JWT athentication) :**

  - Implement role-based authentication for patients, pharmacists, and administrators.
  - Logout securely.

- **Password Management:**
  - Implement password change functionality securely with OTP verification for patients, pharmacists, and administrators.

## Installation

Follow these steps to set up and run the software on your local machine.

### Prerequisites

Make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/): JavaScript runtime built on Chrome's V8 JavaScript engine.
- [npm](https://www.npmjs.com/): Node.js package manager.
- [MongoDB](https://www.mongodb.com/): NoSQL database.
- [Git](https://git-scm.com/): Version control system.

### Clone the Repository

```bash
git https://github.com/advanced-computer-lab-2023/Sonic-Pharmacy.git
```

#### To run the backend:

```bash
cd backend/src
```

```bash
npm i
```

```bash
nodemon server.js
```

#### To run the frontend:

```bash
cd frontend/src
```

```bash
npm i
```

```bash
npm update
```

```bash
npm start

```

### Create .env file and add the following:

MONGO_URI= "mongodb+srv://Clinic:Pass_123@cluster0.afyaloc.mongodb.net/?retryWrites=true&w=majority"
PORT=8001

## Testing

Use [this Postman link](https://documenter.getpostman.com/view/30346344/2s9Ykn8gvm) to test all the APIs.

## How to Use

Follow these steps to navigate and use Sonic-Pharmacy effectively:

### General:

### 1. Register or Log In

- If you want to sign up as a patient, click on the "Sign up" button on the login page.
- If you want to sign up as a pharmacist, click on the "Register as a Pharmacist" button on the top right corner of the login page.
- Fill in the required information and complete the registration process.
- If you're already registered, enter your credentials right away in the login page.

### 2. Explore Dashboard

- Upon successful login, you'll be directed to your personalized dashboard.
- Navigate through the menu on the top left of the screen to access different features.

### 3. Profile Management

- Update your personal information under the "My Profile" section in the menu.
- Change your password securely to by entering your email to recieve an OTP which you will need to enter to be able to type your new password.

### 4. Chatting

- Click on the blue chat icon on the bottom right corner to use the Chat functionality.
- View, create and respond to individual chat messages.

### 5. Log Out

- When done, click on the "Log Out" button in the menu to securely log out of your account.

### Patient:

### 1. Medicine

- Access the "Available Medicine" section
- Filter medicine by medicinal use and click on apply to filter Non-Prescribed or Prescribed medicine.
- Click on the small "i" icon to view all medicine details.
- Click on the "Add to Cart" button to add a medicine to your cart.
- Click on the "Find Alternatives" button on out of stock medicine to view alternatives with the same active ingredient.

### 2. Cart

- Access the "My Cart" section
- Click on the blue "+" icon to add one to the quantity of your medicine, click on the orange "-" icon to subtract one and click on the orange trashcan icon to delete a medicine from your cart.
- Click on the "Continue Shopping" button to be redirected to the medicine page.
- Click on the "Proceed to Checkout" button to finalize your order, afterwards navigate the tabs to choose a payment method, add a new address or choose an existing one, confirm or cancel your order using the buttons "Order" and "Cancel".

### 3. Profile

- Access the "My profile" section
- You can click on "change password" to update your password.
- Add new addresses using the "Add New Address" button.

### Pharmacist:

### 1. Medicine

- Access the "Available Medicine" section
- Filter medicine by medicinal use and click on apply to filter Active or Archived medicine.
- Unarchive archived medicine by clicking the blue "unarchive" button.
- Archive medicine by clicking the blue "archive" button.
- Click on the orange "Add New Medicine" button to add a new medicine, enter the required fields and click on create to add a new medicine (click on close form if you change your mind).
- Click on the small "i" icon to view all medicine details.
- Click on the on the edit icon on the top right of a medicine to edit its details.

### 2. Sales Report

- Access the "Sales Report" section.
- You can view the quantity sold and revenue of a medicine by filtering by month, medicine name and a certain date and clicking apply.

### 3. Profile

- Access the "My profile" section
- You can click on "change password" to update your password.

### 4. Notifications

- View notifications for out of stock medicine by clicking the bell icon on the top right.

### Admin:

### 1. Manage Appointments

- Access the "My Profile" section in the menu to view your personal details.
- You can click on "Change Password" to update your password.

### 2. Manage Patients

- Access the "Patients" section.
- Click on a patient to view their details.
- Click on the trashcan icon to delete a patient.

### 3. Manage Pharmacists

- Access the "Pharmacists" section.
- Click on a pharmacist to view their details.
- Use the search bar to search for a pharmacist by name
- Click on the trashcan icon to delete a pharmacist.
- Click on the requests to view new pharmacists that are requesting to join the platform
- Click on the green tick or the red cross to accept or reject the request of a pharmacist

### 4. Manage Admins

- Access the "Admins" section.
- Use the search bar to search for an admin by name.
- Click on Add new administrator blue button, enter the required fields and click on create to add a new admin (click on close form if you change your mind).

### 5. Manage Medicine

- Access the "Medicine" section.
- Filter medicine by medicinal use and click on apply to filter all medicine.
- Search for a medicine by name.
- Click on the small "i" icon to view all medicine details.

### 6. Sales Report

- Access the "Sales Report" section.
- You can view the quantity sold and revenue of a medicine by filtering by month and clicking apply.

## Screenshots of the System

Access the [Google Drive folder](https://drive.google.com/drive/folders/1Nqq8H35nmAYbNz82tsrXSa3r3NvYQdoi?usp=sharing) to view screenshots of the Sonic-Clinic system.

Feel free to explore the provided images for an in-depth look at the user interface, features, and functionalities of Sonic-Clinic.

## Credits

A special thanks to the following YouTube channels for providing excellent tutorials on web development technologies:

- [Academind](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
- [Traversy Media](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)

### Tutorials and Playlists:

- _Node.js:_

  - [Node.js Crash Course](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY)

- _Express.js:_

  - [Express.js Crash Course](https://www.youtube.com/watch?v=fgTGADljAeg)

- _React:_
  - [React Introduction](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK)
  - [React Hooks - Functional Components](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h)
  - [React useState VS useEffect](https://codedamn.com/news/reactjs/usestate-and-useeffect-hooks)
- _JWT Authentication:_

  - [JWT Authentication Tutorial](https://www.youtube.com/watch?v=mbsmsi7l3r4)
  - [MERN Stack Authentication Tutorial](https://www.youtube.com/watch?v=-RCnNyD0L-s)
  - [MERN Stack Authentication Tutorial - Part 1](https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57)

- _Stripe for Payment Process:_
  - [Stripe API Overview](https://youtu.be/1r-F3FIONl8)

A big thank you to the creators of these tutorials for their valuable contributions to the developer community.

## Code Style

We applied a set of coding conventions to maintain consistency and readability across the project. Please follow these guidelines when contributing to the codebase:

- **JavaScript/Node.js:** We follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for JavaScript and Node.js projects.

- **React:** For React components and applications, we follow the [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react).

- **CSS:** Our stylesheets adhere to the [BEM (Block, Element, Modifier) methodology](http://getbem.com/) for maintainability and clarity.

- **Naming Conventions:** Descriptive and meaningful variable and function names are encouraged. Please avoid abbreviations when clarity is sacrificed.

- **Indentation:** We use two spaces for indentation in JavaScript and its related files.

- **Comments:** Include comments where necessary to explain complex code sections or to provide context. Follow a consistent comment style.

Before submitting a pull request, please ensure that your code sticks to these conventions. Consistent coding practices enhance collaboration and make the codebase more maintainable.

## Code Examples

## Backend (node js)

### Registering as a Pharmacist

Below is a Node.js function for a guest to create an account as a pharmacist.

```javascript
const registerPharmacist = async (req, res) => {
  try {
    // const { username, email, password } = req.body;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const education = req.body.education;
    const hourlyRate = req.body.hourlyRate;
    const dateOfBirth = req.body.dateOfBirth;
    const name = req.body.name;
    const affiliation = req.body.affiliation;
    // Debugging: log the received data
    console.log("Received data:", req.body);

    req.body.files = req.locals?.docs;
    const files = req.body.files;

    // Validate username
    const validation = await validateUsername(username);

    //Check if username exists
    if (!validation) {
      return res.status(408).send("Username already exists");
    }

    // Check if email exists
    const existingPharmacist = await Pharmacist.findOne({ email });
    if (existingPharmacist) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Debugging: log the password before hashing
    console.log("Password before hashing:", password);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Debugging: log the hashed password
    console.log("Hashed password:", hashedPassword);

    // Create a new Pharmacist instance with the modified request body
    const newPharmacist = new Pharmacist({
      username,
      email,
      password: hashedPassword,
      picture: req.body.picture,
      education,
      hourlyRate,
      affiliation,
      dateOfBirth,
      name,
      files,
    });

    // Save the Pharmacist instance
    await newPharmacist.save();

    console.log("before");

    // Upload documents and associate them with the pharmacist
    // uploadDocuments(req.body, res, newPharmacist._id);

    return res.status(201).json(newPharmacist);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
```

### Changing Your Password as a Patient

The following is a Node.js function that demonstrates how a patient can change their password.

```javascript
const patientChangePassword = async (req, res) => {
  const user = await Patient.findById(req.session.userId);
  console.log("change password " + user);

  if (!user) {
    return res.status(404).json({ error: "Patient not found" });
  }

  const { oldPassword, newPassword } = req.body;
  console.log(oldPassword);

  // Check if the old password is correct
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    return res.status(409).json({ error: "Invalid old password" });
  }

  // Hash the new password and update the user's document
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  console.log(user.password);
  await user.save();

  return res.status(200).json({ message: "Password updated successfully" });
};
```

### Getting Alternative Medicine

The following Node.js function returns alternavies for out of stock medicine using the same active ingredient.

```javascript
const getAlternativeMedicines = async (req, res) => {
  try {
    const { medicineId } = req.body; // Get the ID of the specified medicine from the request body
    const medicine = await Medicine.findOne({ _id: medicineId }); // Find the specified medicine in the database
    if (!medicine) res.status(404).json({ message: "Medicine not found" });
    const alternativeMedicines = await Medicine.find({
      activeIngredients: { $in: medicine.activeIngredients },
      state: "Active",
    }); // Find all medicines that contain any of the active ingredients of the specified medicine
    if (!alternativeMedicines)
      res.status(409).json({ message: "No Alternative Medicines" });
    const index = alternativeMedicines.findIndex(
      (med) => med._id.toString() === medicineId
    ); // Find the index of the specified medicine in the list of alternative medicines
    if (index !== -1) {
      // If the specified medicine is found in the list of alternative medicines
      alternativeMedicines.splice(index, 1);
    }

    res.send(alternativeMedicines); // Return the list of alternative medicines in the response body
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

## Frontend (react)

### Pharmacist View Medicine Page

```jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import PhHamburgerMenu from "../../components/Pharmacist/PhHamburgerMenu";
import PhShowMedicines from "../../components/Pharmacist/PhShowMedicine";
import FilterMedicine from "../../components/FilterMedicine";
import ChatPat from "../../components/ChatPat";

function PhMedicine() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<PhHamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4">
          <Row>
            <Col xs={12}>
              <FilterMedicine />
            </Col>
            <Col xs={12}>
              <PhShowMedicines />
            </Col>
          </Row>
        </Container>
      </Container>
      <ChatPat who="pharmacist" />
    </div>
  );
}

export default PhMedicine;
```

### Patient My Orders Page

```jsx
import React, { useState } from "react";
import AdminViewTable from "../../components/Admin/AdminViewTable";
import AdminSearchBar from "../../components/Admin/AdminSearchBar";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PatientMyOrders from "../../components/Patient/PatientMyOrders";
import PatientHamburgerMenu from "../../components/Patient/PatientHamburgerMenu";
import ChatPat from "../../components/ChatPat";

export default function PatientMyOrdersPage() {
  return (
    <>
      <AppNavbar hamburgerMenu={<PatientHamburgerMenu />} />
      <div
        style={{
          marginTop: "50px",
          color: "var(--body-text-body-color, #212529)",
          fontSize: "2rem",
          fontWeight: "600",
          textAlign: "center",
          lineHeight: "120%",
        }}
      >
        My Orders
      </div>
      <style>
        {`
          /* Custom CSS for inactive tabs */
          .nav-link {
            color: #099BA0  ; /* Set the color for inactive tabs */
          }
        `}
      </style>
      <Container
        className="bg-white px-5 py-4 d-flex align-items-center justify-content-center"
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PatientMyOrders />
      </Container>
      <ChatPat who="patient" />
    </>
  );
}
```

### OTP Verification Page

```jsx
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import RegPhoto from "../../components/Guest/RegPhoto";
import GuestBurgerMenu from "../../components/Guest/GuestBurgerMenu";
import OTPVerificationForm from "../../forms/Guest/OTPVerificationForm";
import AppNavbarGuest2 from "../../components/AppNavigation/AppNavbarGuest2";

function OTPVerification() {
  return (
    <div>
      <AppNavbarGuest2 flag={true} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
          <div className="d-flex w-100 align-items-center">
            <div className="col-lg-5 order-lg-2 d-none d-lg-block">
              <RegPhoto />
            </div>
            <div className="col-12 col-lg-7 order-lg-1">
              <OTPVerificationForm />
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default OTPVerification;
```

## Status Build

### Current Issues

1. **Long Loading Time:**

   - Users may experience extended loading times during certain interactions. We are actively working to optimize performance and enhance the overall user experience.

2. **Code Structure Enhancement:**

   - The code structure is functional but could benefit from further enhancement for better readability, maintainability, and scalability. We appreciate your patience as we strive to improve the codebase.

3. **Platform Linking:**

   - The linkage between platforms needs refinement. Our team acknowledges the importance of seamless integration, and we are committed to enhancing the connection between different components for a smoother user experience.

4. **Chat Construction Using Arrays:**

   - The construction of chats currently relies on arrays, which may impact efficiency. We are exploring alternative approaches to optimize chat construction and ensure real-time communication.

5. **Cart Management:**

   - Users currently cannot add or remove multiple items from their carts with quick successive clicks, they must wait for a couple of seconds before they can perform the operation again. We are actively working to resolve this delay.

6. **Delayed Notifications:**

   - Users currently cannot view new notifications without refreshing the page first.We understand the importance of this feature and are working to address this limitation.

7. **Authentication Method:**
   - Request authentication utilizes express session and not token. We are actively working to resolve this issue.

### Next Steps

Our development team is actively working on addressing the identified issues and implementing improvements. We appreciate your understanding and patience as we strive to make the necessary enhancements to deliver a more robust and user-friendly application.

### How You Can Contribute

Your feedback is crucial in shaping the future of our project. If you encounter any issues not mentioned here or have suggestions for improvement, please feel free to open an issue on our GitHub repository or reach out to our support team.

## Contribute

We welcome and appreciate contributions from the community! If you'd like to contribute to the development of El7a2ny, please follow these guidelines:

1. Fork the repository and clone it to your local machine. (follow installation steps)
2. Create a new branch for your contribution: `git checkout -b feature/new-feature`.
3. Make your changes and ensure that the code follows our coding standards.
4. Test your changes thoroughly.
5. Commit your changes: `git commit -m "Add new feature"`.
6. Push to the branch: `git push origin feature/new-feature`.
7. Open a pull request, providing a clear title and description of your changes.

### Contribution Guidelines

- Please follow the code style mentioned in this README file.
- Include tests for new features or bug fixes.
- Ensure that your changes do not break existing functionality.

### Reporting Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the [issue tracker](https://github.com/advanced-computer-lab-2023/Sonic-Clinic/issues).

Thank you for contributing to El7a2ny! 🚀

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)

### Third-Party Licenses

Certain components and dependencies used in this project are subject to their own licenses:

- **Stripe:** The use of Stripe is subject to the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Please review the license terms for more information.

- **Socket.io:** The use of Socket.io is subject to the [MIT License](https://opensource.org/licenses/MIT). Please review the license terms for more information.

- **MongoDB:** The use of MongoDB is subject to the [Server Side Public License (SSPL)](https://www.mongodb.com/licensing/server-side-public-license). Please review the license terms for more information.

- **nodemon:** The use of nodemon is subject to the [MIT License](https://opensource.org/licenses/MIT). Please review the license terms for more information.

- **Redux:** The use of Redux is subject to the [MIT License](https://opensource.org/licenses/MIT). Please review the license terms for more information.

- **Bootstrap:** The use of Bootstrap is subject to the [MIT License](https://opensource.org/licenses/MIT). Please review the license terms for more information.

- **JWT Authentication:** The specific implementation or library used for JWT authentication is subject to its own license. Please review the license terms for more information.

Refer to the respective licenses of these components for details about permissions and restrictions. Ensure compliance with the terms of each license when using or contributing to this project.
