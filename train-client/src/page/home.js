import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Modal
} from "react-bootstrap";
import "../App.css";
import ModalLogin from "../components/modals/modal-login";
import ModalRegister from "../components/modals/modal-register";
import { TOKEN } from "../config/index";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchangeAlt,
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { insertOrder } from "../_actions/userA";
import { getStation } from "../_actions/trainA";

import FindTrain from "../components/tables/findTrain";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      modalLogin: false,
      modalRegister: false,
      detinationStation: "",
      station: "",
      dateStart: "",
      qtyBayi: 0,
      qtyDewasa: 0,
      qty: 0,
      confirm: false
    };
  }

  findDateNow = () => {};

  openLogin = () => {
    this.setState({
      modalLogin: !this.state.modalLogin
    });
  };
  openRegister = () => {
    this.setState({
      modalRegister: !this.state.modalRegister
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchTrain = e => {
    e.preventDefault();
    const { station, detinationStation, dateStart } = this.state;
    const data = {
      station,
      detinationStation,
      dateStart
    };
    console.log("post data", data);
    this.props.getStation(data);
  };

  plus = (bayi, dewasa) => {
    if (dewasa && !bayi) {
      this.setState({
        qtyDewasa: this.state.qtyDewasa + 1
      });
    } else if (!dewasa && bayi) {
      this.setState({
        qtyBayi: this.state.qtyBayi + 1
      });
    }
  };
  minus = (bayi, dewasa) => {
    if (dewasa && !bayi) {
      this.setState({
        qtyDewasa: this.state.qtyDewasa - 1
      });
    } else if (!dewasa && bayi) {
      this.setState({
        qtyBayi: this.state.qtyBayi - 1
      });
    }
  };

  hideConfirm = () => {
    this.setState({
      confirm: false
    });
  };

  handleData = trainId => {
    this.setState(
      {
        qty: this.state.qtyDewasa + this.state.qtyBayi
      },
      () => {
        const data = {
          trainId,
          qty: this.state.qty
        };
        this.props
          .insertOrder(data)
          .then(() => {
            console.log("success inputed order");
          })
          .catch(() => {
            this.setState({
              confirm: true
            });
          });
        console.log("ini data", data);
      }
    );
  };

  render() {
    // console.log("this props in page", this.props.train);
    const findStation = {
      data: this.props.train.findStation,
      isLoading: this.props.train.isLoading,
      dataErr: this.props.train.dataErr
    };
    console.log("inHome", findStation.data);
    const {
      station,
      detinationStation,
      qtyBayi,
      qtyDewasa,
      dateStart,
      confirm
    } = this.state;
    let bayi, dewasa;
    return (
      <>
        {TOKEN ? <Redirect to="/user/home" /> : <Redirect to="/" />}
        <Container fluid className="p-0" style={{ position: "relative" }}>
          <Row>
            <Col className="p-0">
              <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand>LandTick</Navbar.Brand>
                <Image
                  src="assets/icon/Vector.png"
                  className="img-fit-rounded my-2 ml-2"
                />
                <Nav className="ml-auto">
                  <Button
                    variant="outline-primary mr-2"
                    onClick={this.openRegister}
                  >
                    Daftar
                  </Button>
                  <Button variant="primary mr-4" onClick={this.openLogin}>
                    login
                  </Button>
                </Nav>
              </Navbar>
            </Col>
          </Row>
          <Row
            className="colorDefault pl-4"
            style={{
              height: "450px",
              paddingTop: "120px",
              position: "relative"
            }}
          >
            <Col lg={6} md={6} sm={6}>
              <h6>
                <h1>Selamat Pagi, Ticket Seekers</h1>
                Ingin Pulkam dengan Good Deal ? <br /> Masuk atau Daftar
                Sekarang !!!
              </h6>
            </Col>
            <Col lg={6} md={6} sm={6}>
              <Row className="pt-4">
                <Image src="../../assets/images/content/dummy1.png" />
              </Row>
            </Col>
            <Card body className="formInHome">
              <Row>
                <Col lg={2} md={2} sm={2}>
                  Tiket Kereta Api
                </Col>
                <Col lg={10} md={10} sm={10}>
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <h5>Tiket Kereta Api</h5>
                    </Col>
                    <Col lg={5} md={5} sm={5}>
                      <label>
                        <strong>Asal</strong>
                      </label>
                      <input
                        type="text"
                        name="station"
                        value={station}
                        className="form-control"
                        placeholder="cirebon"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col lg={1} md={1} sm={1} className="pt-3">
                      <Button className="rounded-circle">
                        <FontAwesomeIcon
                          icon={faExchangeAlt}
                          style={{ fontSize: "25px" }}
                        />
                      </Button>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <label>
                        <strong>Tujuan</strong>
                      </label>
                      <input
                        type="text"
                        name="detinationStation"
                        value={detinationStation}
                        className="form-control"
                        placeholder="Jakarta"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                      <label>
                        <strong>Tanggal Berangkat</strong>
                      </label>
                      <input
                        type="date"
                        name="dateStart"
                        value={dateStart}
                        className="form-control"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col lg={2} md={2} sm={2} className="pt-2 text-right">
                      <input
                        type="checkbox"
                        style={{ width: "20px", height: "20px" }}
                        className="form-check-input"
                      />
                      <label className="form-check-label pl-2 pt-1">
                        <strong>Pulang Pergi</strong>
                      </label>
                    </Col>
                    <Col lg={2} md={2} sm={2} className="pl-3 offset-1">
                      <label>
                        <strong>Dewasa</strong>
                      </label>
                      <Row className="text-center">
                        <Col className="px-0">
                          <Button
                            onClick={() =>
                              this.plus((bayi = false), (dewasa = true))
                            }
                            className="btn-info btn-sm mx-0 mt-1 mb-0"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        </Col>
                        <Col className="px-0">
                          <input
                            type="text"
                            name="qtyDewasa"
                            value={qtyDewasa}
                            className="form-control m-0"
                            disabled
                          />
                        </Col>
                        <Col className="px-0">
                          <Button
                            onClick={() =>
                              this.minus((bayi = false), (dewasa = true))
                            }
                            className="btn-info btn-sm mx-0 mt-1 mb-0"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={2} md={2} sm={2} className="pl-0">
                      <label>
                        <strong>Bayi</strong>
                      </label>
                      <Row className="text-center">
                        <Col className="px-0">
                          <Button
                            onClick={() =>
                              this.plus((bayi = true), (dewasa = false))
                            }
                            className="btn-info btn-sm mx-0 mt-1 mb-0"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        </Col>
                        <Col className="px-0">
                          <input
                            type="text"
                            name="qtyBayi"
                            value={qtyBayi}
                            className="form-control m-0"
                            disabled
                          />
                        </Col>
                        <Col className="px-0">
                          <Button
                            onClick={() =>
                              this.minus((bayi = true), (dewasa = false))
                            }
                            className="btn-info btn-sm mx-0 mt-1 mb-0"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={2} md={2} sm={2} className="text-left pt-4">
                      <Button
                        className="colorDefault mt-2"
                        type="button"
                        onClick={this.searchTrain}
                      >
                        <small>Cari Tiket</small>
                      </Button>
                    </Col>
                    {/* </Row>
            </Col> */}
                  </Row>
                </Col>
              </Row>
            </Card>
          </Row>
          <Row
            className="align-items-start"
            style={{ marginTop: "200px", width: "90%" }}
          >
            {findStation.isLoading ? (
              <Col className="text-center">
                <p>wait a second</p>
                <Image
                  src="assets/images/content/Spinner-1s-200px.gif"
                  style={{ width: "100px" }}
                />
              </Col>
            ) : null}
            {findStation.dataErr.length > 0 ? (
              <Col className="text-center">
                <Image
                  src="assets/images/message/warning.png"
                  style={{ width: "100px" }}
                />
                <h3>
                  <kbd>{findStation.dataErr.data.message}</kbd>
                </h3>
              </Col>
            ) : null}
            {findStation.data.length > 0 ? (
              <FindTrain
                handleData={this.handleData}
                dataStation={findStation.data}
              />
            ) : null}
          </Row>
          <Modal
            show={confirm}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton onClick={this.hideConfirm}>
              <Modal.Title id="contained-modal-title-vcenter">
                Not Authenticated
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Silahkan Login atau Register untuk melakukan pemesanan</h4>
            </Modal.Body>
          </Modal>
          <ModalLogin
            visibleLogin={this.state.modalLogin}
            hideLogin={this.openLogin}
          />
          <ModalRegister
            visibleRegister={this.state.modalRegister}
            hideRegister={this.openRegister}
          />
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    train: state.trains
  };
};

const mapDispatchToProps = dispatch => {
  return {
    insertOrder: data => dispatch(insertOrder(data)),
    getStation: data => dispatch(getStation(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
