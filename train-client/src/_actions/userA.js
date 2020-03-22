import axios from "axios";
import { BASE_URL, TOKEN } from "../config/index";

export const insertOrder = data => {
  return {
    type: "POST_ORDER",
    payload: axios({
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      method: "POST",
      url: `${BASE_URL}/insert/user/order`,
      data
    })
  };
};

export const getOrders = () => {
  return {
    type: "GET_ORDERS",
    payload: axios({
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      method: "GET",
      url: `${BASE_URL}/index/user/order`
    })
  };
};

export const getUser = () => {
  return {
    type: "GET_USER",
    payload: axios({
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      method: "GET",
      url: `${BASE_URL}/show/user`
    })
  };
};

export const getOrder = orderId => {
  return {
    type: "GET_ORDER",
    payload: axios({
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      method: "GET",
      url: `${BASE_URL}/show/user/order`,
      params: {
        orderId
      }
    })
  };
};
