import axios from 'axios';

const http = axios.create({
  baseURL: 'https://app-note-taking.herokuapp.com/'
});

export default http;
