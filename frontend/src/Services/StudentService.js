const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const StudentService = {};
StudentService.getUser = (userId) => {
  return axiosInstance.get(`${APIURL}/users/${userId}`);
};
StudentService.get= (userId) => {
  return axiosInstance.get(`${APIURL}/etudiant/${userId}`);
};
StudentService.updateProfile = (userId, data) => {
  return axiosInstance.post(`${APIURL}/users/${userId}`, data);
};

export default StudentService;
