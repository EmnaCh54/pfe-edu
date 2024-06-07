const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const CorrectionService = {};
CorrectionService.add = (data) => {
  return axiosInstance.post(`${APIURL}/enseignant/correction`, data);
};

CorrectionService.update = (dataId, data) => {
  return axiosInstance.put(`${APIURL}/enseignant/correction/${dataId}`, data);
};

CorrectionService.delete = (dataId) => {
  return axiosInstance.delete(`${APIURL}/enseignant/correction/${dataId}`);
};

CorrectionService.getAllContent = (type) => {
  return axiosInstance.get(`${APIURL}/enseignant/correction`);
};

export default CorrectionService;
