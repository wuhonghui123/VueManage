

import * as axios from "@/http/axios";

export function findPermissions(url,params){
    return axios.get(url,params);
}

export function findAlluser(url,params){
    return axios.get(url,params)

}
export function insertUser(url,params){
    return axios.post(url,params)

}

export function deleteUser(url,params){
    return axios.get(url,params)
}

export function updateUser(url,params){
    return axios.post(url,params)
}