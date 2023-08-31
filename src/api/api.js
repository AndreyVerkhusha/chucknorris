import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.chucknorris.io/jokes",
  headers: {
    "Content-Type": "application/json"
  }
});
const responseSuccessHandler = response => {
  return response;
};
const responseErrorHandler = error => {
    return Promise.reject(error);
};

apiClient.interceptors.request.use(
  (config) => {return config;}, null, {synchronous: true}
);
apiClient.interceptors.response.use(
  response => responseSuccessHandler(response),
  error => responseErrorHandler(error)
);