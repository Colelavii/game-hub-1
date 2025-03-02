import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

//Declare it as a local constant in this module
// export default axios.create({
const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "d9e46d4eb9944e5f99c1452cacd22811",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default APIClient;
