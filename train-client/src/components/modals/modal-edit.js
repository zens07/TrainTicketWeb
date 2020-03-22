import React, { Component } from "react";
import { Modal, Button, Form, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { editOrder, getOrders } from "../../_actions/adminA";

class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      message: "",
      id: 0
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let data = {};
    // if (this.state.status) {
    data = {
      status: this.state.status,
      id: this.props.getOrder.id
    };
    this.props.actionEdit(data).then(() =>
      this.props
        .actionIndex()
        .then(() => {
          this.setState(
            {
              message: "update success"
            },
            this.props.hideEdit
          );
        })
        .catch(error => {
          this.setState({
            message: "error update"
          });
        })
    );
  };
  render() {
    const { getOrder, visibleEdit, hideEdit } = this.props;
    return getOrder.train != null && visibleEdit == true ? (
      <>
        <Modal
          show={visibleEdit}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton onClick={hideEdit}>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.state.message != "" ? (
                <div class="alert alert-success" role="alert">
                  {this.state.message}
                </div>
              ) : (
                "Form Edit"
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              maxHeight: "80vh",
              overflowY: "auto"
            }}
          >
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="number"
                  name="id"
                  placeholder={getOrder.id}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={getOrder.user.name}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Asal-Tujuan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`${getOrder.train.station} - ${getOrder.train.detinationStation}`}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bukti Pembayaran</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={getOrder.attacment}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status Payment</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  {getOrder.status == "approved" ? (
                    <>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                    </>
                  ) : (
                    <>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                    </>
                  )}
                </Form.Control>
              </Form.Group>
              <Col className="text-right">
                <Button className="mx-1" variant="primary" type="submit">
                  Save
                </Button>
                <Button
                  className="mx-1"
                  variant="secondary"
                  onClick={this.props.hideEdit}
                >
                  Close
                </Button>
              </Col>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.confirmEdit} centered>
          <Modal.Body>
            <h6>updating succes </h6>
          </Modal.Body>
        </Modal>
      </>
    ) : null;
  }
}
const mapStateToProps = state => {
  return {
    editOrder: state.admins.orderEdit,
    orderIndex: state.admins.orderIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionEdit: data => dispatch(editOrder(data)),
    actionIndex: () => dispatch(getOrders())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
