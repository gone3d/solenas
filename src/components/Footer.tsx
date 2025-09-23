import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-solace-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="text-center mb-12">
          <h2 className="font-mollie-glaston footer-heading">
            The Better Healthcare
            <br />
            Experience You Deserve
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Advocates on Solace are doctors, nurses and experts who will listen
            to you, fight on your behalf and get you the care you need.
          </p>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white border-opacity-20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <p className="text-sm opacity-75 italic">
              © 2025 Find Solace, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
