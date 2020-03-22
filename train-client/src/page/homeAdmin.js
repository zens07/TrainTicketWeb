import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Image,
  NavDropdown
} from "react-bootstrap";
import "../App.css";
// import modalLogin from
import { TOKEN, BASE_URL_CLIENT } from "../config/index";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import NavigationAdmin from "../components/navigations/navigationAdmin";
import { getOrders } from "../_actions/adminA";
import { getUser } from "../_actions/userA";
import FormAddTicket from "../components/forms/form-add-ticket";
import ListTransaction from "../components/tables/listTransaction";
class HomeAdmin extends Component {
  constructor() {
    super();
    this.state = {
      detinationStation: "",
      station: "",
      showAdd: false,
      redirect: true
    };
  }
  componentDidMount() {
    this.props.getOrders();
    this.props.getUser();
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addTicket = () => {
    this.setState({
      showAdd: true
    });
  };

  // logout = () => {
  //   const removeToken = localStorage.removeItem("token");
  //   if (removeToken) {
  //     this.setState({
  //       redirect: true
  //     });
  //   }
  // };

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
      // window.location.assign(`${BASE_URL_CLIENT}/user/order`);
      this.setState({
        showAdd: true
      });
      console.log("error");
    }
  };

  render() {
    const listTransaction = {
      data: this.props.data.orderIndex,
      isLoading: this.props.data.loadIndex,
      dataErr: this.props.data.errorIndex
    };
    console.log("inhome admim", listTransaction);
    return this.props.userShow != [] ? (
      <>
        {!TOKEN ? <Redirect to="/" /> : null}
        <Container fluid className="p-0">
          <Row>
            <Col>
              <NavigationAdmin
                redirect={this.redirect}
                userShow={this.props.userShow ? this.props.userShow.name : null}
              />
            </Col>
            {/* <Col className="pr-0">
              <Navbar bg="dark" variant="dark" className="fixed-top">
                <Navbar.Brand href="#home">LandTick</Navbar.Brand>
                <Image
                  src="../../assets/icon/Vector.png"
                  className="img-fit-rounded my-2 ml-2"
                />

                <Nav className="ml-auto">
                  <Nav.Link className="mt-3">Name</Nav.Link>
                  <NavDropdown
                    title={
                      <>
                        <Image
                          src="../../assets/icon/Ellipse 2.png"
                          className="img-fit-rounded my-2 ml-2"
                        />
                      </>
                    }
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item onClick={this.addTicket}>
                      Tambah Ticket
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onCLick={this.logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar>
            </Col> */}
          </Row>
          <Row
            className="align-items-start"
            style={{ marginTop: "150px", width: "90%" }}
          >
            {listTransaction.isLoading ? (
              <Col className="text-center">
                <p>Wait a Second</p>
                <Image
                  src="../../assets/images/content/Spinner-1s-200px.gif"
                  style={{ width: "100px" }}
                />
              </Col>
            ) : null}
            {listTransaction.dataErr.length > 0 ? (
              <Col className="text-center">
                <Image
                  src="../../assets/images/message/warning.png"
                  style={{ width: "100px" }}
                />
                <h3>
                  <kbd>{listTransaction.dataErr.message}</kbd>
                </h3>
              </Col>
            ) : null}
            {listTransaction.data &&
            this.state.showAdd == false &&
            listTransaction.isLoading == false ? (
              <ListTransaction listTransaction={listTransaction.data} />
            ) : null}

            {this.state.showAdd == true ? (
              <FormAddTicket showAdd={this.addTicket} />
            ) : null}
          </Row>
        </Container>
      </>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    data: state.admins,
    userShow: state.users.userShow.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders()),
    getUser: () => dispatch(getUser())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeAdmin);
