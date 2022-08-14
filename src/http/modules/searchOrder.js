import {get} from '@/http/axios'

export function getOrderList(url,params){
    console.log(params);
    return get(url,params);
}
