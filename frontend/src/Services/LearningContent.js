const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const LearningContent = {};
LearningContent.add = (data) => {
  return axiosInstance.post(`${APIURL}/enseignant/contenuseducatif`, data);
};

LearningContent.update = (type, dataId, data) => {
  return axiosInstance.put(`${APIURL}/enseignant/${type}/${dataId}`, data);
};

LearningContent.delete = (type, dataId) => {
  return axiosInstance.delete(`${APIURL}/enseignant/${type}/${dataId}`);
};

LearningContent.getAllContent = (type) => {
  return axiosInstance.get(`${APIURL}/enseignant/${type}`);
};

export default LearningContent;
