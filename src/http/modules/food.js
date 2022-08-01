
import {get} from '@/http/axios'

export function findFoodlist(url, params) {
    return get(url, params);
}
export function findClassList(url,params){
    return get(url,params);
}
