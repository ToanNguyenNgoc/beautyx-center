/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { USERROLE } from "app/modules/auth"
import { verifyUser } from "app/middleware"

export function useUser() {
    const [userAuth, setUserAuth] = useState<USERROLE>()
    const session = sessionStorage.getItem('bt-auth')

    useEffect(() => {
        async function get() {
            if (session) {
                const u = JSON.parse(session)
                const res_user: any = await verifyUser(u)
                setUserAuth(res_user)
            }
        }
        get()
    }, [session])
    return userAuth
}