import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Image,
  NavDropdown,
  Modal,
  Card
} from "react-bootstrap";
import "../../App.css";

class NavigationUser extends Component {
  render() {
    let home, ticket;
    return (
      <>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Navbar.Brand href="#home">LandTick</Navbar.Brand>
          <Image
            src="../../assets/icon/Vector.png"
            className="img-fit-rounded my-2 ml-2"
          />

          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link className="mt-2 mb-1">{this.props.userShow}</Nav.Link>
            </Nav.Item>
            <NavDropdown
              alignRight
              title={
                <>
                  <Image
                    src="../../assets/icon/Ellipse 2.png"
                    className="img-fit-rounded"
                  />
                </>
              }
              style={{ marginRight: "50px" }}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() =>
                  this.props.redirect((home = false), (ticket = true))
                }
              >
                TicketSaya
              </NavDropdown.Item>
              <NavDropdown.Item>Payment</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() =>
                  this.props.redirect((home = true), (ticket = false))
                }
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      </>
    );
  }
}
export default NavigationUser;
