import {get} from '@/http/axios'

export function getOrderList(url){
    return get(url)
}
export function selectOrderList(url,params){
    console.log(params);
    return get(url,params);
}