import { IOrganization } from "../interface/organization";
import { slugify } from "./format";

export const DIRECT_ORG = (org: IOrganization) => {
    if (org) {
        const newWindow = window.open(`https://beautyx.vn/cua-hang/${org.subdomain}`, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
}
export function DIRECT_ORG_E(id: number | string) {
    // console.log(id)
    const newWindow = window.open(`https://beautyx.vn/cua-hang/${id}`, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

export function DIRECT_SERVICE_BTX(org_id: number, id: Number, name: string) {
    const newWindow = window.open(`https://beautyx.vn/dich-vu/${id}_${org_id}_${slugify(name)}`, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}