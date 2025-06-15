import React from 'react'

const Footer = ()=>{
  return(
    <footer className="bg-white border-t text-center text-sm text-gray-600 py-4 mt-3">
        &copy; {new Date().getFullYear()} FCAHPT Medical Centre Portal. All rights reserved.
      </footer>
      );
};

export default Footer;