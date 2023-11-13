import React, { useState } from 'react';
import AppNavbar from '../../components/AppNavigation/AppNavbar';
import PatientHamburgerMenu from '../../components/Patient/PatientHamburgerMenu';
import EmptyCart from '../../components/Patient/PatientEmptyCart';
import CartItems from '../../components/Patient/PatientMedicineInCart';
import medicineBlueImg from  '../../Assets/Patient/medicineBlueImg.jpg';

function PatientCart() {
 

  return (
    <div>
      <AppNavbar hamburgerMenu={<PatientHamburgerMenu />} />
      <div className="container mt-3">
        {/* {medicine.length === 0 ? ( // Check if the medicine array is empty
          <EmptyCart /> // Display the empty cart component
        ) : ( */}
          <div>
            <CartItems/>
          </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default PatientCart;
