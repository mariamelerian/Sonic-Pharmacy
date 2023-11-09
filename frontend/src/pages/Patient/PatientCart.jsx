import React, { useState } from 'react';
import AppNavbar from '../../components/AppNavigation/AppNavbar';
import PatientHamburgerMenu from '../../components/Patient/PatientHamburgerMenu';
import EmptyCart from '../../components/Patient/PatientEmptyCart';
import CartItems from '../../components/Patient/PatientMedicineInCart';
import medicineImg from '../../Assets/medicineImg.png';

function PatientCart() {
  // Replace the example cart data state with your "medicine" data state
  const [medicine, setMedicine] = useState([
    {
      id: 1,
      quantity: 2,
      image: medicineImg,
      name: "Medicine 1",
      price: 10.99,
    },
    {
      id: 2,
      quantity: 1,
      image: medicineImg,
      name: "Medicine 2",
      price: 7.99,
    },
    {
      id: 3,
      quantity: 5,
      image: medicineImg,
      name: "Medicine 3",
      price: 4.99,
    },
    // Add more medicine items here
  ]);

  return (
    <div>
      <AppNavbar hamburgerMenu={<PatientHamburgerMenu />} />
      <div className="container mt-3">
        {medicine.length === 0 ? ( // Check if the medicine array is empty
          <EmptyCart /> // Display the empty cart component
        ) : (
          <div>
            <CartItems items={medicine} /> {/* Pass the "medicine" array to the new component */}
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientCart;
