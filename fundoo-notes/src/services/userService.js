import httpService from "./httpServices.js";

export default {
  login(data) {
    return httpService.post("/user/login", data);
  }
};
