import {get} from '@/http/axios'

export function getOrderList(url,params){
    console.log(params);
    return get(url,params);
}
export function getUserOrderList(url,params){
    return get(url,params);
}
