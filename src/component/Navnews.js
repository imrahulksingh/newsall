import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function Navnews() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="/">News All</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" style={{ fontSize: "17px" }}>
          <Nav.Link href="/newsall/home">Home</Nav.Link>
          <Nav.Link href="/newsall/top-stories">Top Stories</Nav.Link>
          <Nav.Link href="/technology">Technology</Nav.Link>
          <Nav.Link href="/opinion">Opinion</Nav.Link>
          <Nav.Link href="/technology">Sports</Nav.Link>
          <Nav.Link href="/technology">Business</Nav.Link>
          <Nav.Link href="/technology">Politics</Nav.Link>
          <Nav.Link href="/technology">World</Nav.Link>
          <Nav.Link href="/technology">Entertainment</Nav.Link>
          <NavDropdown title="Category" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Subscribe
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navnews;
