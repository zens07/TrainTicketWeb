import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

class FindTrain extends Component {
  render() {
    const { dataStation } = this.props;
    // console.log("datastation", dataStation);
    return (
      <Col className="align-items-start">
        <table
          className="table table-striped text-center"
          style={{ marginLeft: "6%" }}
        >
          <thead>
            <tr>
              <th scope="col">Nama Kereta</th>
              <th scope="col">Berangkat</th>
              <th scope="col"></th>
              <th scope="col">Tiba</th>
              <th scope="col">Durasi</th>
              <th scope="col">Harga Per Orang</th>
            </tr>
          </thead>
          <tbody>
            {dataStation.map((data, index) => (
              <>
                <tr
                  className="pointer"
                  key={index}
                  onClick={() => {
                    this.props.handleData(data.id);
                  }}
                >
                  <td scope="row">
                    {data.name}
                    <br />
                    <small>
                      {data.typetrain.name}|{data.dateStart}
                    </small>
                  </td>
                  <td>
                    {data.startTime}
                    <br />
                    <small>{data.station}</small>
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </td>
                  <td>
                    {data.arrivalTime}
                    <br />
                    <small>{data.detinationStation}</small>
                  </td>
                  <td>
                    durasi
                    <br />
                    <small>jam menit detik</small>
                  </td>
                  <td>{data.price}</td>
                </tr>
                <tr style={{ height: "50px" }}></tr>
              </>
            ))}
          </tbody>
        </table>
      </Col>
    );
  }
}
export default FindTrain;
