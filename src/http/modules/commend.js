import {get, post} from '@/http/axios'

export function findCommendlist(url, params) {
    return get(url, params);
}
export function updateCommend(url, params) {
    return post(url, params);
}
