import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";


function BootstrapNavbar() {
    const [show, setShow] = useState(true);
    const controlNavBar = () => {
        if (window.scrollY > 20) {
            setShow(false);
        }
        setShow(true);
    }
    useEffect(() => {
        window.addEventListener('scroll', controlNavBar);
        return () => {
            window.removeEventListener('scroll', controlNavBar);
        };
    }, []);

  return (
      <Navbar className={`header ${show && "header-down"}`} data-bs-theme="dark">
        <Container fluid>
            <Navbar.Brand className="brand">Gaming Site</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ps-xl-5">
                    <Nav.Link href="/" className="nav-item">Home</Nav.Link>
                    <Nav.Link href="/hangman" className="nav-item">Hangman</Nav.Link>
                </Nav>
                {/*<NavDropdown title="Link" id="navbarScrollingDropdown">*/}
                {/*  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>*/}
                {/*  <NavDropdown.Item href="#action4">*/}
                {/*    Another action*/}
                {/*  </NavDropdown.Item>*/}
                {/*  <NavDropdown.Divider />*/}
                {/*  <NavDropdown.Item href="#action5">*/}
                {/*    Something else here*/}
                {/*  </NavDropdown.Item>*/}
                {/*</NavDropdown>*/}
            {/*<Form className="d-flex">*/}
            {/*  <Form.Control*/}
            {/*      type="search"*/}
            {/*      placeholder="Search"*/}
            {/*      className="me-2"*/}
            {/*      aria-label="Search"*/}
            {/*  />*/}
            {/*  <Button variant="outline-success">Search</Button>*/}
            {/*</Form>*/}
            </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
export default BootstrapNavbar;