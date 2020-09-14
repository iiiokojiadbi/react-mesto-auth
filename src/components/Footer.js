import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <span className="footer__copyright">© 2020 Mesto Russia</span>
    </footer>
  );
}

const MemodFooter = React.memo(Footer);
export default MemodFooter;
