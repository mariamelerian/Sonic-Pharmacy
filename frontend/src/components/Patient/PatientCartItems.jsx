import React, { useState } from 'react';

function CartItems({ items }) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={decrementQuantity}>-</button>
                  <span>{quantity}</span>
                  <button onClick={incrementQuantity}>+</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* Add any additional content or styling you need for your cart items */}
    </div>
  );
}

export default CartItems;

