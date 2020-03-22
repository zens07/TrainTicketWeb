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
  Card,
  Table
} from "react-bootstrap";
import "../App.css";
// import modalLogin from

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { TOKEN, BASE_URL_CLIENT } from "../config/index";
import { getStation } from "../_actions/trainA";
import { getOrders, getUser } from "../_actions/userA";

import NavigationUser from "../components/navigations/navigationUser";

class OrderTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detinationStation: "",
      station: "",
      valid: false,
      redirectPayment: false,
      orderId: 0
    };
  }

  componentDidMount() {
    this.props.getOrders().then(() => {
      this.props.getUser().then(() => {
        this.setState({
          valid: true
        });
      });
    });
  }

  payment = orderId => {
    if (orderId) {
      this.setState({
        redirectPayment: true,
        orderId
      });
    }
  };

  redirect = (home, ticket) => {
    if (home && !ticket) {
      const removeToken = localStorage.removeItem("token");
      window.location.assign(`${BASE_URL_CLIENT}`);
      // if (removeToken) {
      //   this.setState({
      //     redirectHomePublic: true
      //   });
      // }
    } else if (!home && ticket) {
      window.location.assign(`${BASE_URL_CLIENT}/user/order`);
      // this.setState({
      //   redirectTicket: true
      // });
      console.log("error");
    }
  };

  render() {
    const data = {
      orders: this.props.users.orderIndex.data,
      userShow: this.props.users.userShow.data,
      loadIndex: this.props.users.loadIndex,
      errorIndex: this.props.users.errorIndex
    };

    return this.state.valid && data.orders.length > 0 ? (
      <>
        {this.state.redirectPayment ? (
          <Redirect
            to={{
              pathname: "/user/payment",
              state: { orderId: this.state.orderId }
            }}
          />
        ) : null}
        {!TOKEN ? <Redirect to="/" /> : null}
        <Container fluid className="p-0" style={{ position: "relative" }}>
          <Row>
            <Col>
              <NavigationUser
                redirect={this.redirect}
                userShow={this.props.userShow ? this.props.userShow.name : null}
              />
            </Col>
          </Row>
          <Row
            className="pt-4 pl-4"
            style={{ height: "350px", marginTop: "120px" }}
          >
            <Col>
              <h1 className="text-left ml-4">Ticket Saya</h1>
              {data.orders.map((data, index) => (
                <>
                  <Row key={index}>
                    <Col>
                      <Card
                        className="mx-auto cardTicketOrder"
                        style={{ width: "80%", marginBottom: "50px" }}
                      >
                        <Card.Body>
                          <Row>
                            <Col lg={8} md={8} className="mt-4">
                              <Row>
                                <Col lg={4} md={4}>
                                  <h4>
                                    {data.train.name}
                                    <p style={{ fontSize: "small" }}>
                                      {data.train.typetrain.name}
                                    </p>
                                  </h4>
                                  <p>{data.status}</p>
                                </Col>
                                <Col lg={1} md={1}>
                                  <FontAwesomeIcon icon={faCircle} />
                                  <br />
                                  <span
                                    style={{
                                      marginLeft: "10px",
                                      border: "2px black solid",
                                      height: "100%",
                                      width: "0"
                                    }}
                                  />
                                  <br />
                                  <FontAwesomeIcon icon={faCircle} />
                                </Col>
                                <Col lg={3} md={3}>
                                  <h6>
                                    {data.train.startTime}
                                    <p style={{ fontSize: "small" }}>
                                      {data.train.dateStart}
                                    </p>
                                  </h6>
                                  <h6>
                                    {data.train.arrivalTime}
                                    <p style={{ fontSize: "small" }}>
                                      Date Finish
                                    </p>
                                  </h6>
                                </Col>

                                <Col lg={4} md={4}>
                                  <h6>
                                    {data.train.station}
                                    <p style={{ fontSize: "small" }}>
                                      {data.train.station}
                                    </p>
                                  </h6>
                                  <h6>
                                    {data.train.detinationStation}
                                    <p style={{ fontSize: "small" }}>
                                      {data.train.detinationStation}
                                    </p>
                                  </h6>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={4} md={4} className="text-right">
                              <h4>
                                Kereta Api
                                <p style={{ fontSize: "small" }}>
                                  {data.train.dateStart}
                                </p>
                              </h4>
                              {data.status == "approved" ? (
                                <Image
                                  className="imageCover"
                                  src="../../assets/images/content/barcode.jpg"
                                  alt="barcode"
                                />
                              ) : null}
                            </Col>
                          </Row>
                          <Row className="mt-4">
                            <Col lg={10} md={10}>
                              <Table responsive className="text-center">
                                <thead>
                                  <tr>
                                    <th>No Tanda Pengenal</th>
                                    <th>Nama Pemesan</th>
                                    <th>No Handphone</th>
                                    <th>Email</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>No Tanda Pengenal</td>
                                    <td>{data.user.name}</td>
                                    <td>{data.user.phone}</td>
                                    <td>{data.user.email}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Col>
                            <Col
                              lg={2}
                              md={2}
                              className="text-right"
                              style={{ marginTop: "50px" }}
                            >
                              {data.status == "pending" ? (
                                <Button
                                  onClick={() => this.payment(data.id)}
                                  className="colorDefault"
                                >
                                  Bayar Sekarang
                                </Button>
                              ) : null}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </>
              ))}
            </Col>
          </Row>
        </Container>
      </>
    ) : null;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    train: state.trains,
    users: state.users,
    userShow: state.users.userShow.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
    getOrders: () => dispatch(getOrders()),
    getStation: data => dispatch(getStation(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderTicket);
