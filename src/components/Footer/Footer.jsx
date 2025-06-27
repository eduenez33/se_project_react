import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className="footer">
        <p className="footer__dev">Developed by Edwin Duenez</p>
        <p className="footer__year">{currentYear}</p>
      </section>
    </>
  );
}

export default Footer;
