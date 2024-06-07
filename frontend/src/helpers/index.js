export const getCurrentUser = () => {
  if (localStorage.getItem("token")) {
    return {
      fullname: localStorage.getItem("fullname"),
      id: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
    };
  } else {
    return null;
  }
};

export const convertDate = (mongoDate) => {
  const date = new Date(mongoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};
