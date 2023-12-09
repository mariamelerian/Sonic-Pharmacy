import { Container, Row } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import ProfileTabs from "../../components/Patient/ProfileTabs";
import PatientHamburgerMenu from "../../components/Patient/PatientHamburgerMenu";
import ChatPat from "../../components/ChatPat";

function PatientProfile() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<PatientHamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
          <Row className="w-100">
            <div>
              <ProfileTabs />
            </div>
          </Row>
        </Container>
      </Container>
      <ChatPat who="patient" />
    </div>
  );
}
export default PatientProfile;
