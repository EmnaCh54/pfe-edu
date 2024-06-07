const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const LearningContent = {};
LearningContent.add = (data) => {
  return axiosInstance.post(`${APIURL}/enseignant/cours`, data);
};
LearningContent.edit = (data) => {
  return axiosInstance.post(`${APIURL}/enseignant/cours`, data);
};
LearningContent.delete = (id) => {
  return axiosInstance.post(`${APIURL}/enseignant/cours`, data);
};

LearningContent.getAll = () => {
  return axiosInstance.get(`${APIURL}/enseignant/cours`, data);
};

export default LearningContent;
