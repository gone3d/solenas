import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-solace-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Bottom footer */}

        <div className="flex items-center mb-4 md:mb-0">
          <p className="text-sm opacity-75 italic">
            © 2025 Find Solace, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
