
import {get,post} from '@/http/axios'

export function findFoodlist(url, params) {
    return get(url, params);
}
export function findClassList(url,params){
    return get(url,params);
}
export function addfood(url,params){
    return post(url,params);
}
export function updatefood(url,params){
    return post(url,params);
}
export function deletefood(url,params){
    return post(url,params);
}
