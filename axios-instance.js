import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://www.omdbapi.com/?i=tt3896198&apikey=eb73710b'
});

instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

instance.interceptors.request.use(request => {
  return request;
}, error => {
  const {status} = error.response;
  if (status === 401) {
    // do something
    console.log(status)
  }
  return Promise.reject(error);
})

export default instance;