exports.BASE_URL = "http://localhost:5000/api/v1";
exports.BASE_URL_CLIENT = "http://localhost:3000";
exports.BASE_URL_IMAGE = "http://localhost:5000";
// exports.BASE_URL = "https://serverbreednerzens.herokuapp.com/api/v1/";

const token = localStorage.getItem("token");
exports.TOKEN = token;
