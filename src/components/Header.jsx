import React from 'react';
import { BurgerMenu } from '../assets/icons/BurgerMenu';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-6">
      <h1 className="text-5xl">Schedules</h1>
      <BurgerMenu className="text-4xl cursor-pointer" />
    </header>
  );
};

export default Header;
