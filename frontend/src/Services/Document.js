const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const DocumentService = {};
DocumentService.add = (data) => {
  return axiosInstance.post(`${APIURL}/documents`, data);
};

DocumentService.update = (dataId, data) => {
  return axiosInstance.put(`${APIURL}/documents/${dataId}`, data);
};

DocumentService.delete = (dataId) => {
  return axiosInstance.delete(`${APIURL}/documents/${dataId}`);
};

DocumentService.getAllContent = (type) => {
  return axiosInstance.get(`${APIURL}/documents`);
};

DocumentService.getAllByUser = (userId) => {
  return axiosInstance.get(`${APIURL}/documents/${userId}`);
};

DocumentService.delete = (documentId) => {
  return axiosInstance.delete(`${APIURL}/documents/${documentId}`);
};

export default DocumentService;
