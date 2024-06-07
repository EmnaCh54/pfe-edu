const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const AdminService = {};
AdminService.userStat = () => {
  return axiosInstance.get(`${APIURL}/admin/stat`);
};
AdminService.contentData = () => {
    return axiosInstance.get(`${APIURL}/admin/statContent`);
  };

export default AdminService;
