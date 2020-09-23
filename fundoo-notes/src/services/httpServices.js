import axios from "axios";
export default {
  post(url, data) {
    return axios.post(url, data);
  },
  get() {
    return axios.get("");
  },
  get(Id) {
    return axios.get("/" + Id);
  },
  delete(Id) {
    return axios.delete("/" + Id);
  },
  put(data) {
    return axios.put("/" + data.Id, data);
  }
};
