import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
// import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { BASE_URL, TOKEN, BASE_URL_CLIENT } from "../../config/index";
import { connect } from "react-redux";

import { getOrders } from "../../_actions/adminA";

class FormAddTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      typeTrainId: 0,
      dateStart: "",
      station: "",
      startTime: "",
      detinationStation: "",
      arrivalTime: "",
      price: 0,
      qty: 0,
      message: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      typeTrainId,
      dateStart,
      station,
      startTime,
      detinationStation,
      arrivalTime,
      price,
      qty
    } = this.state;
    const data = {
      name,
      typeTrainId,
      dateStart,
      station,
      startTime,
      detinationStation,
      arrivalTime,
      price,
      qty
    };
    console.log(data);
    this.postTicket(data);
  };

  postTicket = async data => {
    try {
      let payload = {};
      payload = await axios({
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        method: "POST",
        url: `${BASE_URL}/insert/admin/train`,
        data
      });
      if (Object.keys(payload).length) {
        console.log("success");
        this.setState(
          {
            message: "success creating"
          },
          () => {
            window.location.assign(`${BASE_URL_CLIENT}/admin/home`);
          }
        );
      } else {
        this.setState({
          message: "Not Creating Data"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      name,
      typeTrainId,
      dateStart,
      station,
      startTime,
      detinationStation,
      arrivalTime,
      price,
      qty
    } = this.state;
    console.log("render");
    return (
      <Col className="pl-5 pt-0">
        {this.state.message != "" ? (
          <div class="alert alert-success" role="alert">
            {this.state.message}
          </div>
        ) : (
          <h1>Tambahkan Ticket</h1>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Nama Kereta</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="Nama Kereta"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>JenisKereta</Form.Label>
            <Form.Control
              as="select"
              name="typeTrainId"
              value={typeTrainId}
              onChange={this.handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Stasiun Keberangkat</Form.Label>
            <Form.Control
              type="text"
              name="station"
              value={station}
              onChange={this.handleChange}
              placeholder="Stasiun Keberangkatan"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tanggal Keberangkat</Form.Label>
            <Form.Control
              type="date"
              name="dateStart"
              value={dateStart}
              onChange={this.handleChange}
              placeholder="Tanggal Keberangkat"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Jam Keberangkatan</Form.Label>
            <Form.Control
              type="time"
              name="startTime"
              value={startTime}
              onChange={this.handleChange}
              placeholder="Jam Keberangkatan"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stasiun Tujuan</Form.Label>
            <Form.Control
              type="text"
              name="detinationStation"
              value={detinationStation}
              onChange={this.handleChange}
              placeholder="Statsiun Tujuan"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Jam Tiba</Form.Label>
            <Form.Control
              type="time"
              name="arrivalTime"
              value={arrivalTime}
              onChange={this.handleChange}
              placeholder="Jam Tiba"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Harga Ticket</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={price}
              onChange={this.handleChange}
              placeholder="Harga Ticket"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Qty</Form.Label>
            <Form.Control
              type="number"
              name="qty"
              value={qty}
              onChange={this.handleChange}
              placeholder="Qty"
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ width: "100px" }}>
            Submit
          </Button>
        </Form>
      </Col>
    );
  }
}
const mapStateToProps = state => {
  return {
    orderIndex: state.admins.orderIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormAddTicket);
