import {get, post} from '@/http/axios'

export function findAll(url, params) {
    return get(url, params);
}

export function insertRole(url,params){
    return post(url,params)
}
