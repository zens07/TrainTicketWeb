import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { BASE_URL, TOKEN, BASE_URL_CLIENT } from "../../config/index";
import { animateScroll as scroll } from "react-scroll";

class ModalRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      name: "",
      gender: "",
      phone: "",
      address: "",
      message: "",
      redirect: false
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const {
      username,
      email,
      password,
      name,
      gender,
      phone,
      address
    } = this.state;
    const dataRegister = {
      username,
      email,
      password,
      name,
      gender,
      phone,
      address
    };
    console.log(dataRegister);
    this.postRegister(dataRegister);
  };

  postRegister = async dataRegister => {
    try {
      const payload = await Axios.post(`${BASE_URL}/register`, dataRegister);
      const user = { data: payload.data };
      this.checkedToken(user);
    } catch (error) {
      const { message } = error.response;
      this.setState({
        message
      });
    }
  };
  checkedToken = user => {
    console.log(user.data);
    if (user.data) {
      if (!TOKEN) {
        localStorage.setItem("token", user.data.token);
        // window.location.assign(`${BASE_URL_CLIENT}/user/home`);
        this.setState({ redirect: true });
      } else {
        localStorage.removeItem("token");
        localStorage.setItem("token", user.data.token);
        // window.location.assign(`${BASE_URL_CLIENT}/user/home`);
        this.setState({ redirect: true });
      }
    } else {
      this.setState({
        message: "Gagal Registrasi"
      });
    }
  };
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  render() {
    const {
      username,
      email,
      password,
      name,
      gender,
      phone,
      address,
      redirect
    } = this.state;
    return (
      <Modal
        show={this.props.visibleRegister}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ minHeight: "100vh" }}
      >
        <Modal.Header
          closeButton
          onClick={this.props.hideRegister}
          className="colorDefault"
        >
          {redirect ? <Redirect to="/user/home" /> : <Redirect to="/" />}
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "80vh",
            overflowY: "auto"
          }}
        >
          {this.state.message.length > 0
            ? (this.scrollToTop,
              (
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              ))
            : null}

          <Form onSubmit={this.submitHandler}>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Form.Group controlId="nameUser">
                <Form.Label>username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.changeHandler}
                  placeholder="Username"
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.changeHandler}
                  placeholder="Enter email"
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.changeHandler}
                  placeholder="Password"
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Form.Group controlId="name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.changeHandler}
                  placeholder="Your Name"
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Form.Group controlId="formBasicGenderPet">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={gender}
                  onChange={this.changeHandler}
                >
                  <option value="" selected disabled>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={this.changeHandler}
                  placeholder="Phone Breeder"
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={address}
                  onChange={this.changeHandler}
                  placeholder="Address Breeder"
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12} className="text-right">
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
}
export default ModalRegister;
