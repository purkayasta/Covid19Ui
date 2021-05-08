import "./Footer.css";

export const Footer = () => {
  const todaysDate = new Date();
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <p className="footer-company-name">{todaysDate.toLocaleString()}</p>
      </div>

      <div className="footer-center">
        <p>Made With React + TS ✅ </p>
      </div>
    </footer>
  );
};
