import axios from "axios";


const ApiConn = axios.create({
  baseURL: "http://localhost:3001",
});


export default ApiConn;