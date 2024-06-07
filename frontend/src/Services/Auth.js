const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const AuthService = {};
AuthService.register = (data) => {
  return axiosInstance.post(`${APIURL}/auth/register`, data);
};
AuthService.login = (data) => {
  return axiosInstance.post(`${APIURL}/auth/login`, data);
};

export default AuthService;
