import React, { useState } from 'react';
import AppNavbar from '../../components/AppNavigation/AppNavbar';
import PatientHamburgerMenu from '../../components/Patient/PatientHamburgerMenu';
import EmptyCart from '../../components/Patient/PatientEmptyCart';
import CartItems from '../../components/Patient/PatientCartItems';

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
            <CartItems items={cartItems} /> {/* Pass the cartItems to the new component */}
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientCart;
