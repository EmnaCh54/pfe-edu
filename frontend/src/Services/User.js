const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const UserService = {};
UserService.all = () => {
  return axiosInstance.get(`${APIURL}/users`);
};
UserService.changeStatue = (id, data) => {
  return axiosInstance.put(`${APIURL}/users/${id}`, data);
};

export default UserService;
