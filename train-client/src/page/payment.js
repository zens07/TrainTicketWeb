import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Table,
  Button,
  Modal
} from "react-bootstrap";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faImage } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import {
  TOKEN,
  BASE_URL_CLIENT,
  BASE_URL,
  BASE_URL_IMAGE
} from "../config/index";
import { getUser, getOrder } from "../_actions/userA";
import NavigationUser from "../components/navigations/navigationUser";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      file: null,
      imagePreviewUrl: null,
      message: "",
      errMsg: "",
      sec: 3
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangeImage = this.handleChangeImage.bind(this);
  }
  componentDidMount() {
    const orderId = this.props.location.state.orderId;
    this.props.getUser().then(() => {
      this.props
        .getOrder(orderId)
        .then(() => {
          this.setState({
            status: true
          });
        })
        .catch(() => {
          this.setState({
            status: false
          });
        });
    });
  }
  handleChangeImage = e => {
    console.log(e.target.files[0]);
    // let reader = new FileReader();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  handleSubmit = e => {
    e.preventDefault();
    const image = this.state.file;
    console.log("image uploading", image);
    if (image) {
      this.setState({
        errMsg: ""
      });
      const orderId = this.props.location.state.orderId;
      let formData = new FormData();
      formData.append("uploadImage", image);
      formData.append("orderId", orderId);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${TOKEN}`
        }
      };
      console.log("ini formData", formData);
      axios
        .post(`${BASE_URL}/upload`, formData, config)
        .then(response => {
          // let id, attacment;
          const { orderId, file } = response.data.data;
          axios({
            method: "PATCH",
            url: `${BASE_URL}/edit/user/order/${orderId}`,
            headers: {
              Authorization: `Bearer ${TOKEN}`
            },
            data: {
              attacment: file
            }
          }).then(response => {
            // alert("success data");
            this.setState(
              {
                message: response.message,
                confirm: !this.state.confirm
              },
              () => {
                const myTimer = setInterval(
                  () => this.setState({ sec: this.state.sec - 1 }),
                  1000
                );
                setTimeout(() => {
                  clearInterval(myTimer);
                  this.props.history.push("/user/home");
                }, 3000);
              }
            );
          });
          // alert("image upload success", response);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        errMsg: "Mohon diisi"
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
    const order = {
      data: this.props.orderShow,
      load: this.props.loadOrder,
      error: this.props.errorOrder,
      errorStatus: this.props.errorStatus
    };
    // if (this.state.status == false) {
    //   console.log("ini error", order.error.message);
    // }
    // console.log(order.data.attacment);
    // console.log("ini gambar", this.state.imagePreviewUrl);
    // console.log("ini attacment", order.data.attacment);
    // console.log("ini order Id", this.props.location.state.orderId);
    return Object.keys(order.data).length > 0 || this.state.status == false ? (
      <>
        <Container>
          <Row>
            <Col>
              <NavigationUser
                redirect={this.redirect}
                userShow={this.props.userShow ? this.props.userShow.name : null}
              />
            </Col>
          </Row>
          {order.load ? (
            <Row style={{ marginTop: "100px" }}>
              <Col className="text-center">
                <p>wait a second</p>
                <Image
                  src="../../assets/images/content/Spinner-1s-200px.gif"
                  style={{ width: "100px" }}
                />
              </Col>
            </Row>
          ) : null}
          {this.state.status == false ? (
            <Row style={{ marginTop: "100px" }}>
              <Col className="text-center">
                <Image
                  src="../../assets/images/message/warning.png"
                  style={{ width: "100px" }}
                />
                <h3>
                  <kbd>Not Found Data</kbd>
                </h3>
              </Col>
            </Row>
          ) : null}
          {Object.keys(order.data).length > 0 && this.state.status == true ? (
            <>
              <Row style={{ marginTop: "100px" }}>
                <Col lg={12} md={12}>
                  <h2>Invoice</h2>
                </Col>
                <Col lg={8} md={8}>
                  <Row>
                    <Col>
                      <Card style={{ background: "#EEEEEE" }}>
                        <Card.Body>
                          <Row>
                            <Col
                              lg={2}
                              md={2}
                              className="my-auto text-center
                        "
                            >
                              <Image
                                src="../../assets/images/message/warning.png"
                                style={{ width: "60px" }}
                              />
                            </Col>
                            <Col lg={10} md={10}>
                              <h6>
                                Silahkan Melakukan pembayaran melalui M-Banking,
                                E-Banking ke No.Rek yang tertera
                              </h6>
                              <p>No.Rek : 09812312312</p>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <Card style={{ background: "#FFF" }}>
                        <Col
                          lg={3}
                          md={3}
                          className="colorDefault cardHeader py-2"
                        >
                          LandTick
                        </Col>
                        <Card.Body className="px-0 pb-0">
                          <Col lg={12} md={12} className="px-0 pb-0">
                            <Table
                              striped
                              bordered
                              hover
                              size="sm"
                              className="mb-0 mt-4"
                              // style={{ marginTop: "50px" }}
                            >
                              <thead>
                                <tr>
                                  <th>No KTP</th>
                                  <th>Nama Pemesan</th>
                                  <th>Phone</th>
                                  <th>Email</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>undefined</td>
                                  <td>{order.data.user.name}</td>
                                  <td>{order.data.user.phone}</td>
                                  <td>{order.data.user.email}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="mt-4 pt-4">
                    <Col lg={8} md={8}>
                      <Row>
                        <Col lg={12} md={12}>
                          <h1>Rincian Harga</h1>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12} md={12}>
                          <Card>
                            <Card.Body>
                              <Row>
                                <Col lg={8} md={8}>
                                  {`${order.data.train.name}-Qty: ${order.data.qty}`}
                                </Col>
                                <Col lg={4} md={4}>
                                  {order.data.train.price}
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={8} md={8}>
                                  Total
                                </Col>
                                <Col lg={4} md={4}>
                                  {order.data.totalPrice}
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <form onSubmit={e => this.handleSubmit(e)}>
                            <input
                              className="inputImage"
                              id="file-input"
                              type="file"
                              name="uploadImage"
                              onChange={this.handleChangeImage}
                            />
                            <Button
                              className="colorDefault"
                              style={{ width: "100%" }}
                              type="submit"
                            >
                              Bayar Sekarang
                            </Button>
                          </form>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={4} md={4} className="text-center">
                      {this.state.imagePreviewUrl === null &&
                      order.data.attacment === null ? (
                        <>
                          <div class="form-group uploadCover">
                            <label htmlFor="file-input">
                              <FontAwesomeIcon
                                icon={faImage}
                                color="#3B5998"
                                size="10x"
                                style={{ cursor: "pointer" }}
                              />
                            </label>
                          </div>
                        </>
                      ) : null}

                      {order.data.attacment != null &&
                      this.state.imagePreviewUrl == null ? (
                        <div>
                          <Image
                            className="uploadCover"
                            src={`${BASE_URL_IMAGE}/${order.data.attacment}`}
                          />
                          <label htmlFor="file-input">
                            <FontAwesomeIcon
                              icon={faImage}
                              color="#3B5998"
                              size="2x"
                              style={{ cursor: "pointer" }}
                            />
                            <span>Ganti Image</span>
                          </label>
                        </div>
                      ) : null}

                      {this.state.imagePreviewUrl ? (
                        <Image
                          className="uploadCover"
                          src={`${this.state.imagePreviewUrl}`}
                        />
                      ) : null}
                    </Col>
                  </Row>
                </Col>
                <Col lg={4} md={4}>
                  <Row>
                    <Col>
                      <Card>
                        <Card.Header
                          style={{ background: "#D0D0D0", height: "115px" }}
                        >
                          <Row>
                            <Col lg={8} md={8} className="my-auto">
                              <h3>
                                Kereta Api
                                <p
                                  style={{
                                    fontSize: "small",
                                    color: "#878787"
                                  }}
                                >
                                  {order.data.train.dateStart}
                                </p>
                              </h3>
                            </Col>
                            <Col lg={4} md={4} className="my-auto text-center">
                              <Image
                                className="imageCover"
                                src="../../assets/images/content/barcode.jpg"
                                alt="barcode"
                              />
                            </Col>
                          </Row>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                            <Col lg={12} md={12}>
                              <h4>
                                Argo Wilis
                                <p
                                  style={{
                                    fontSize: "small",
                                    color: "#878787"
                                  }}
                                >
                                  {order.data.train.typetrain.name}
                                </p>
                              </h4>
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
                            <Col lg={5} md={5} className="offset-1">
                              <h6>
                                {order.data.train.startTime}
                                <p style={{ fontSize: "small" }}>
                                  {order.data.train.dateStart}
                                </p>
                              </h6>
                              <h6>
                                {order.data.train.arrivalTime}
                                <p style={{ fontSize: "small" }}>Date Finish</p>
                              </h6>
                            </Col>
                            <Col lg={4} md={4}>
                              <h6>
                                {order.data.train.station}
                                <p style={{ fontSize: "small" }}>
                                  {order.data.train.station}
                                </p>
                              </h6>
                              <h6>
                                {order.data.train.detinationStation}
                                <p style={{ fontSize: "small" }}>
                                  {order.data.train.detinationStation}
                                </p>
                              </h6>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          ) : null}
          <Modal show={this.state.confirm} centered>
            <Modal.Body>
              <h6>
                Menunggu Konfirmasi pembayaran, redirect dalam {this.state.sec}{" "}
                detik
              </h6>
            </Modal.Body>
          </Modal>
          <Row className="mt-4 pt-4 mx-0">
            <Col className="colorDefault" style={{ height: "50px" }}></Col>
          </Row>
        </Container>
      </>
    ) : null;
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    userShow: state.users.userShow.data,
    orderShow: state.users.orderShow
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrder: orderId => dispatch(getOrder(orderId)),
    getUser: () => dispatch(getUser())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
