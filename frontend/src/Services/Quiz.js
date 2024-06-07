const { axiosInstance } = require("../config/axios");
const { APIURL } = require("../configApi");

const QuizService = {};
QuizService.add = (data) => {
  return axiosInstance.post(`${APIURL}/enseignant/quiz`, data);
};

QuizService.update = (dataId, data) => {
  return axiosInstance.put(`${APIURL}/enseignant/quiz/${dataId}`, data);
};

QuizService.delete = (dataId) => {
  return axiosInstance.delete(`${APIURL}/enseignant/quiz/${dataId}`);
};

QuizService.getAllContent = (type) => {
  return axiosInstance.get(`${APIURL}/enseignant/quiz`);
};

export default QuizService;
