import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { BASE_URL, TOKEN, BASE_URL_CLIENT } from "../../config/index";

class ModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      linkredirect: {},
      message: "",
      status: null
    };
  }
  // componentDidMount() {
  //   this.checkedStatus();
  // }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const dataLogin = {
      email,
      password
    };
    this.postLogin(dataLogin);
  };

  postLogin = async dataLogin => {
    try {
      console.log(dataLogin);
      const res = await Axios.post(`${BASE_URL}/auth/login`, dataLogin);
      const user = { data: res.data.data };
      this.checkedStatus(user);
    } catch (error) {
      console.log(error);
      this.setState({
        message: "You not have this account"
      });
    }
  };

  checkedStatus = user => {
    if (user.data) {
      this.setState(
        {
          status: user.data.status
        },
        () => {
          localStorage.removeItem("token");
          localStorage.setItem("token", user.data.token);

          if (!this.state.status) {
            window.location.assign(`${BASE_URL_CLIENT}/user/home`);
          } else if (this.state.status) {
            window.location.assign(`${BASE_URL_CLIENT}/admin/home`);
          } else {
            console.log("not status");
          }
        }
      );
    } else {
      this.setState({
        message: "You not have this account"
      });
    }
  };

  render() {
    const { email, password, status } = this.state;
    console.log("ini status", this.state.status);
    return (
      <>
        {/* {status == true && TOKEN ? <Redirect to="/admin/home" /> : null}
        {status == false && TOKEN ? <Redirect to="/user/home" /> : null} */}
        <Modal show={this.props.visibleLogin} size="sm">
          <Modal.Header closeButton onClick={this.props.hideLogin}>
            <Modal.Title>Login</Modal.Title>
            {this.state.message ? (
              <div className="alert alert-danger">{this.state.message}</div>
            ) : null}
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.submitHandler}>
              <Col lg={12} md={12} sm={12} xs={12}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.changeHandler}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12}>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.changeHandler}
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
              </Col>
              <Col lg={12} md={12} sm={12} xs={12}>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Col>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default ModalLogin;
