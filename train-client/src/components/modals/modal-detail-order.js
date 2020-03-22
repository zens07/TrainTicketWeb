import React, { Component } from "react";
import { Modal, Table, Image, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

class ModalDetail extends Component {
  render() {
    const { getOrder, visibleDetail, hideDetail } = this.props;
    return getOrder.train != null && visibleDetail == true ? (
      <>
        <Modal
          size="lg"
          show={visibleDetail}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton onClick={hideDetail}>
            <Modal.Title id="contained-modal-title-vcenter">
              DetailOrder
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <h3>
                    INVOICE
                    <p style={{ fontSize: "xx-small" }}>
                      Kode Invoice: {getOrder.id}
                    </p>
                  </h3>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={6} md={6}>
                  <Row>
                    <Col lg={6} md={6}>
                      <h6>
                        Kereta Api
                        <p style={{ fontSize: "xx-small" }}>
                          {getOrder.train.dateStart}
                        </p>
                      </h6>
                    </Col>
                    <Col lg={6} md={6} className="text-left">
                      <Image
                        className="imageCover"
                        src="../../assets/images/content/barcode.jpg"
                        alt="barcode"
                      />
                      <p style={{ fontSize: "xx-small" }}>T09099</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12}>
                      <h6>
                        {getOrder.train.name}
                        <p style={{ fontSize: "xx-small" }}>
                          {getOrder.train.typetrain.name}
                        </p>
                      </h6>
                    </Col>
                    <Col lg={12} md={12}>
                      <Row>
                        <Col lg={1} md={1} className="text-center p-0">
                          <FontAwesomeIcon icon={faCircle} />
                          <br />
                          <span
                            className="mx-2"
                            style={{
                              border: "2px black solid",
                              height: "100%",
                              width: "0"
                            }}
                          />
                          <br />
                          <FontAwesomeIcon icon={faCircle} />
                        </Col>
                        <Col lg={5} md={5}>
                          <h6>
                            {getOrder.train.startTime}
                            <p style={{ fontSize: "xx-small" }}>
                              {getOrder.train.dateStart}
                            </p>
                          </h6>
                          <h6 className="mt-4">
                            {
                              (getOrder.train.startTime,
                              "+",
                              getOrder.train.arrivalTime)
                            }
                            <p style={{ fontSize: "xx-small" }}>Date Finish</p>
                          </h6>
                        </Col>
                        <Col lg={6} md={6}>
                          <h6>
                            {getOrder.train.station}
                            <p style={{ fontSize: "xx-small" }}>
                              nama stasiun awal
                            </p>
                          </h6>
                          <h6 className="mt-6">
                            {getOrder.train.detinationStation}
                            <p style={{ fontSize: "xx-small" }}>
                              name stasiun akhir
                            </p>
                          </h6>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={6} className="text-center">
                  <Image
                    className="imageAttecment"
                    src={`../../assets/images/bukti-pembayaran/${getOrder.attacment}`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
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
                        <td>{getOrder.user.name}</td>
                        <td>{getOrder.user.phone}</td>
                        <td>{getOrder.user.email}</td>
                      </tr>
                      <tr>
                        <td colSpan="3">Total</td>
                        <td className="text-right">Rp.{getOrder.totalPrice}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    ) : null;
  }
}
export default ModalDetail;
