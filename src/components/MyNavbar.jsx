import { Navbar, Container, Nav } from "react-bootstrap";

const MyNavbar = () => {
  return (
    <Navbar
      style={{ backgroundColor: "#082747" }}
      className="position-fixed w-100 top-0 py-4"
    >
      <Container>
        <Navbar.Brand href="#home" className="text-white">
          Navbar
        </Navbar.Brand>
        <Nav className="me-auto text-white">
          <Nav.Link href="#home" className="text-white">
            Home
          </Nav.Link>
          <Nav.Link href="#features" className="text-white">
            Features
          </Nav.Link>
          <Nav.Link href="#pricing" className="text-white">
            Pricing
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
