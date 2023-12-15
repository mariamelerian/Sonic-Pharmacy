import { Container, Row } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import ProfileTabs from "../../components/Patient/ProfileTabs";
import ViewPersonalInfo from "../../components/Patient/viewPersonalInfo";
import PatientHamburgerMenu from "../../components/Patient/PatientHamburgerMenu";
import ChatPat from "../../components/ChatPat";

function PatientProfile() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<PatientHamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
          <div>
            <ViewPersonalInfo />
          </div>
        </Container>
      </Container>
      <ChatPat who="patient" />
    </div>
  );
}
export default PatientProfile;
