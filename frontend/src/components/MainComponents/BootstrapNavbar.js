import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const BootstrapNavbar = () => {
    const [show, setShow] = useState(true);
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState("");
    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

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

    useEffect(() => {
        if(token) {
            setLogged(true);
            getUser().then(text => setUser(text));
        }
    }, []);

    async function logout() {
        const details = {
            method : "POST",
            headers : {
                'Authorization': `Bearer ${token}`
            }
        }
        await fetch("/auth/logout", details);
        localStorage.removeItem('jwtToken');
        setLogged(false);
        navigate("/");
    }

    function getUser() {
        const details = {
            headers: {
                'Authorization': `Bearer ${token}`
            }

    }
        return fetch("/auth/user", details).then(response => response.text());
    }



  return (
      <Navbar className={`header ${show && "header-down"}`} data-bs-theme="dark">
        <Container fluid>
            <Navbar.Brand className="brand cyber-font">Gaming Site</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ps-xl-5">
                    <Nav.Link href="/" className="nav-item">Home</Nav.Link>
                    <Nav.Link href="/hangman" className="nav-item">Hangman</Nav.Link>
                    <Nav.Link href="/breakout" className="nav-item">Breakout</Nav.Link>
                </Nav>
                {!logged ? (
                <Nav className="ps-xl-5 ms-auto">
                    <Nav.Link href="/login" className="nav-item">Login</Nav.Link>
                    <Nav.Link href="/register" className="nav-item">Register</Nav.Link>
                </Nav>
                    ) : (
                 <Nav className="ps-xl-5 ms-auto">
                     <Navbar.Text className="nav-text">Logged in as: {user}</Navbar.Text>
                     <Nav.Link  onClick={logout} className="nav-item">Logout</Nav.Link>
                 </Nav>
                )
                }
            </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
export default BootstrapNavbar;