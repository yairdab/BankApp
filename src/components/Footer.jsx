import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright Yair Daboul ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
