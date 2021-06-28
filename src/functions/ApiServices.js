import axios from "axios";

//const endPoint = 'http://localhost:3000/';

export function GetRequest(endPoint,route) {
    return axios.get(`${endPoint}${route}`);
}