
import store from '@/store'
/**
 * 判断用户是否拥有操作权限
 * 根据传入的权限标识，查看是否存在用户权限标识集合
 * @param perms
 */
export function hasPermission (perms) {
    let hasPermission = false
    let permissions = store.state.user.perms
    console.log(permissions)
    for(let i=0, len=permissions.length; i<len; i++) {
        if(permissions[i] === perms) {
            hasPermission = true;
            break
        }
    }
    console.log("权限真假：",hasPermission);
    return hasPermission
}
