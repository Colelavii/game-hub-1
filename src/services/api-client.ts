import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "d9e46d4eb9944e5f99c1452cacd22811",
  },
});
