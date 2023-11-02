import React, { useContext, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";

import headerLogo from "../../assets/img/evangadi-logo-home.png";
import "./Header.css";
function Header() {
  const { userData, setUserData } = useContext(AppState);
  console.log(userData)
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const onClickChange = () => {
    setUserData(null);

    localStorage.setItem("token", " ");
    
  };
  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary p-4 fixed-top shadow-sm mb-5"
        >
          <Container fluid>
            <Navbar.Brand>
              <Link className="navbar-brand" to={"/"}>
                <img src={headerLogo} alt="Evangadi Logo" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                ></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link>
                    <div
                      className="links"
                      onClick={() =>
                        (userData.username ? navigate("/") : navigate("/Login"))
                      }
                    >
                      {" "}
                      Home
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/explain">
                    {" "}
                    <Link className="links">How it works</Link>{" "}
                  </Nav.Link>
                  <Nav.Link>
                    <div className="connect-block btn-blue">
                      {token === " " ? (
                        <Link to={'/Login'}   className="link">Sign In</Link>
                      ) : (
                        <Link
                          className="link"
                          to={"/Login"}
                          onClick={onClickChange}
                        >
                          Log Out
                        </Link>
                      )}
                    </div>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
