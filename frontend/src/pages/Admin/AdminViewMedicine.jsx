import React from "react";
import { Container, Row } from "react-bootstrap";
import AppNavbar from "../../components/AppNavigation/AppNavbar";
import HamburgerMenu from "../../components/Admin/AdminBurgerMenu";
import AdminShowMedicine from "../../components/Admin/AdminShowMedicine";
import FilterMedicine from "../../components/FilterMedicine";

function AdminMedicine() {
  return (
    <div>
      <AppNavbar hamburgerMenu={<HamburgerMenu />} />
      <Container fluid className="bg-light pt-3 mt-2">
        <Container className="bg-white px-5 py-4 d-flex align-items-center justify-content-center">
          <div className="col-5">
            <FilterMedicine />
          </div>
          <div className="col-7">
            <AdminShowMedicine />
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default AdminMedicine;
