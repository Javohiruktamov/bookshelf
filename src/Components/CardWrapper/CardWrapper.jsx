// src/Components/Home/CardWrapper.jsx

import React from 'react';
import './CardWrapper.scss'; // Agar SCSS uslublarini qo'shsangiz

const CardWrapper = ({ children }) => {
  return <div className="card-wrapper">{children}</div>; // children'ni joylashtirish
};

export default CardWrapper;