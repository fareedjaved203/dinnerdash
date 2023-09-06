const footerStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#333",
  padding: "10px",
  color: "white",
  textAlign: "center",
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2023 My Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
