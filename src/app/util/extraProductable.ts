/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResDiscountPar, ResItemDiscount } from "app/interface";
import { PRODUCTABLE_TYPE } from "./fileType";

export const extraServicesDiscount = (discount: ResDiscountPar) => {
    let servicesDiscount: any[] = []
    if (discount?.items) {
        servicesDiscount = discount.items
            .filter((i: ResItemDiscount) => i.productable_type === PRODUCTABLE_TYPE.SERVICE)
            .map((item: ResItemDiscount) => {
                return {
                    ...item.productable,
                    org: item.organization
                }
            })
    }
    return servicesDiscount
}