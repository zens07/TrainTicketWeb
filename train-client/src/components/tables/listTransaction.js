import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrashAlt,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import axios from "axios";
import ModalEdit from "../modals/modal-edit";
import ModalDetail from "../modals/modal-detail-order";
import { BASE_URL, TOKEN } from "../../config/index";
import { getOrders, getOrder } from "../../_actions/adminA";

class ListTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      showEdit: false,
      confirm: false,
      id: 0
    };
  }

  openDetail = orderId => {
    this.setState(
      {
        showDetail: !this.state.showDetail,
        id: orderId
      },
      () => {
        const id = this.state.id;
        this.props.actionShow(id);
      }
    );
  };

  openEdit = orderId => {
    this.setState(
      {
        showEdit: !this.state.showEdit,
        id: orderId
      },
      () => {
        const id = this.state.id;
        this.props.actionShow(id);
      }
    );
  };

  confirmDelete = async id => {
    try {
      console.log(id);
      const deleted = await axios({
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        method: "DELETE",
        url: `${BASE_URL}/delete/admin/order/${id}`
      });
      console.log(deleted);
      await this.props.actionIndex();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { listTransaction, getOrder } = this.props;
    return (
      <Col className="align-items-start">
        <table
          className="table table-striped text-center"
          style={{ marginLeft: "6%" }}
        >
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Users</th>
              <th scope="col">Ticket</th>
              <th scope="col">BuktiTransfer</th>
              <th scope="col">Status Payment</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listTransaction.length > 0 ? (
              listTransaction.map((data, index) => (
                <>
                  <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>{data.user.name}</td>
                    <td>
                      {data.train.detinationStation}-{data.train.station}
                    </td>
                    <td>{data.attacment}</td>
                    <td>{data.status}</td>
                    {/* <td>
                  </td> */}
                    <td>
                      <Button
                        className="btn-info btn-sm mx-2"
                        onClick={() => this.openDetail(data.id)}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </Button>
                      <ModalDetail
                        getOrder={getOrder}
                        visibleDetail={this.state.showDetail}
                        hideDetail={this.openDetail}
                      />
                      <Button
                        className="btn-success btn-sm mx-2"
                        onClick={() => this.openEdit(data.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <ModalEdit
                        getOrder={getOrder}
                        visibleEdit={this.state.showEdit}
                        hideEdit={this.openEdit}
                      />
                      <Button
                        className="btn-danger btn-sm mx-2"
                        onClick={() => this.confirmDelete(data.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </td>
                    {/* <td>
                  </td> */}
                  </tr>
                </>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Not Found Order
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Col>
    );
  }
}
const mapStateToProps = state => {
  return {
    getOrder: state.admins.orderShow,
    orderIndex: state.admins.orderIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionIndex: () => dispatch(getOrders()),
    actionShow: id => dispatch(getOrder(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTransaction);
