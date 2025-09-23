"use client";

import React from "react";
import UiButton from "./UiButton";

const Header: React.FC = () => {
  return (
    <header className="bg-white">
      {/* Top notification bar */}
      <div className="bg-solace-green text-white py-5 px-4 text-center">
        <span className="font-mollie-glaston footer-heading">Solace Engineering Assignment</span>
      </div>
    </header>
  );
};

export default Header;
