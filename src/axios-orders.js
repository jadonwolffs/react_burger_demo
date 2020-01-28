import axios from "axios";

const instance = axios.create({
  baseURL: "https://complete-react-burger.firebaseio.com"
});

export default instance;