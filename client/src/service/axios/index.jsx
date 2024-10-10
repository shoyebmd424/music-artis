import axios from "axios";

export const Server='http://localhost:8000'

const Axios =axios.create({baseURL:`${Server}/api/v1`});

export default  Axios;