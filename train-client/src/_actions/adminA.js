import axios from "axios";
import { BASE_URL, TOKEN } from "../config/index";

export const getOrders = () => {
  return {
    type: "GET_ORDERS",
    payload: axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      url: `${BASE_URL}/index/admin/order`
    })
  };
};

export const editOrder = data => {
  return {
    type: "EDIT_ORDER",
    payload: axios({
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      url: `${BASE_URL}/edit/admin/order/${data.id}`,
      method: "PATCH",
      data
    })
  };
};

export const getOrder = id => {
  return {
    type: "GET_ORDER",
    payload: axios({
      url: `${BASE_URL}/show/admin/order/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
  };
};
