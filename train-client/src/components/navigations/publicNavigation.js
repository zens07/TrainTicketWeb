import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Image,
  Form
} from "react-bootstrap";
import "../../App.css";

class PublicNavigation extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">LandTick</Navbar.Brand>
          <Nav className="ml-auto">
            <Button variant="outline-primary mr-2">Daftar</Button>
            <Button variant="primary" onClick={this.props.openLogin}>
              login
            </Button>
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default PublicNavigation;
