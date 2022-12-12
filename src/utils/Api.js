import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  //headers: {'Authorization': `Bearer ${token}`}
});

/*
  headers: {
    "User-Agent": "PostmanRuntime/7.29.2",
    Accept: "* / *",
    "Postman-Token": "0ca3dc98-ca17-4c6d-89cd-e3e914533738",
    Host: "firebasestorage.googleapis.com",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
  },
*/