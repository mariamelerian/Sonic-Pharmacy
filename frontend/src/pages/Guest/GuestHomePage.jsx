import { Container, Row } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import GuestMainImg from "../../components/Guest/GuestMainImg";
import GuestBox from "../../components/Guest/GuestBox";
import GuestBurgerMenu from "../../components/Guest/GuestBurgerMenu";
import { logoutPharmacist } from "../../state/loginPharmacistReducer";
import { logoutAdminPharm } from "../../state/loginAdminReducer";
import { logoutPatientPharm } from "../../state/loginPatientReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function GuestHomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutPharmacist());
    dispatch(logoutAdminPharm());
    dispatch(logoutPatientPharm());
    logout();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post("/logout");
      if (response.status === 200) {
        console.log("LOGOUT");
      }
    } catch (error) {
      console.log();
    }
  };

  return (
    <div>
      <AppNavbar hamburgerMenu={<GuestBurgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
          <Row className="row-sub-container">
            <GuestMainImg />
            <div>
              <GuestBox />
            </div>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default GuestHomePage;
