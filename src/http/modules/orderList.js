import {get} from '@/http/axios'

export function getOrderList(url){
    return get(url)
}
export function selectOrderList(url,params){
    return get(url,params);
}