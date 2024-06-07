const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const NotifService = {};
NotifService.add = (data) => {
  return axiosInstance.post(`${APIURL}/notif`, data);
};

NotifService.getAllContent = () => {
  return axiosInstance.get(`${APIURL}/notif`);
};

export default NotifService;
