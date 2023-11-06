import React, { useState } from 'react';
import AppNavbar from '../../components/AppNavigation/AppNavbar';
import PatientHamburgerMenu from '../../components/Patient/PatientHamburgerMenu';

import EmptyCart from '../../components/Patient/PatientEmptyCart';
function PatientCart() {
  // Example cart data state
  const [cartItems, setCartItems] = useState([]); // Use your actual cart data state

  return (
    <div>
      <AppNavbar hamburgerMenu={<PatientHamburgerMenu />} />
      <div className="container mt-3">
        {cartItems.length === 0 ? ( // Check if the cart is empty
          <EmptyCart /> // Display the empty cart component
        ) : (
          <div>
            {/* Display cart items here if the cart is not empty */}
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientCart;
