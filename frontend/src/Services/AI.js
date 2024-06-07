const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const AIService = {};

AIService.chat = (data) => {
  return axiosInstance.post(`${APIURL}/chatbot`, data);
};

export default AIService;