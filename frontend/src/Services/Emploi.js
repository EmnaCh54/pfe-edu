const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const EmploiService = {};
EmploiService.add = (data) => {
  return axiosInstance.post(`${APIURL}/etudiant/emploi`, data);
};

EmploiService.update = (dataId, data) => {
  return axiosInstance.put(`${APIURL}/etudiant/emploi/${dataId}`, data);
};

EmploiService.delete = (dataId) => {
  return axiosInstance.delete(`${APIURL}/etudiant/emploi/${dataId}`);
};

EmploiService.getAllContent = (type) => {
  return axiosInstance.get(`${APIURL}/etudiant/emploi`);
};

EmploiService.getAllByUser = (userId) => {
  return axiosInstance.get(`${APIURL}/etudiant/emploi/${userId}`);
};

EmploiService.delete = (documentId) => {
  return axiosInstance.delete(`${APIURL}/etudiant/emploi/${documentId}`);
};

export default EmploiService;
