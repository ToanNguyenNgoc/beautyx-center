/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthModel } from "app/interface/account_models";
// import {  AUTH_LOCAL_TOKEN } from "app/modules/auth/core/AuthHelpers"


export async function verifyUser(response_user: AuthModel) {
    let user_check
    if (response_user) {
        // const token = response_user.token ?? sessionStorage.getItem(AUTH_LOCAL_TOKEN)
        // const resUserLoginRole = window.atob(response_user.roles ?? sessionStorage.getItem(ROLE_KEY))
        // const role = resUserLoginRole.slice(2, resUserLoginRole.length - 2)
        try {
            // const res_permissions = await getRoles(token)
            // const permissions: IAUTHOR[] = res_permissions.data.context
            // const USER_ROLE = permissions.find(i => i.name === role)
            //[TEMPLE]:
            user_check = {
                ...response_user,
                ROLE: []
            }
        } catch (error) { }
    }
    return user_check
}