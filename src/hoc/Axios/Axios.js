import axios from "axios";

const instance = axios.create({
  baseURL: "https://inodiscovery-c5beb-default-rtdb.firebaseio.com",
});
export default instance;
