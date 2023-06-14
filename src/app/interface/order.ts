import { IService } from "./service";
import { IPRODUCT } from "./product_models";
import { IOrganization } from "./organization";
import { User } from './account_models'

export interface ITems {
    id: number;
    order_id: number;
    base_price: number;
    quantity: number;
    productable_type: string;
    productable_id: number;
    productable: IService | IPRODUCT;
    created_at: string;
    updated_at: string;
    origin_id: null | number;
    services_count: number;
    discount_value: number;
    discount_id: null | number;
}
export interface IOrderOrigin {
    id: number;
    uid: number;
    status: number;
    type: number;
    payment_method_id: number;
    payment_methods: string;
    sub_total_money: string;
    tax_money: string;
    discount_percent: number;
    discount_money: number;
    happy_hour_code: string;
    coupon_code: string;
    coupon_discount_money: string;
    total_money: number;
    total_commission: number;
    note: string;
    uid_confirmed: string;
    date_time_confirmed: string;
    bed_ids: string;
    signature_image: string;
    check_in: string;
    check_out: string;
    deleted: boolean;
    created_date: string;
    created_by_id: number;
    branch_id: number;
    order_code: string;
    discount_symbol: string;
    tax: number;
    tax_symbol: number;
    referral_uid: string;
    is_new_customer: boolean;
    platform?: string;
    delivery_address: string;
    myspa_fee_momo: number;
    myspa_percent_momo: number;
    delivery_status: number;
    currency_id: number;
}
export interface IOrderV2 {
    id: number;
    status: string;
    amount: number;
    description: string;
    payment_method_id: number;
    organization_id: number;
    organization: IOrganization;
    user_id: number;
    user: User,
    origin_id: null | number;
    branch_id: null | number;
    created_at: string;
    updated_at: string;
    deleted_at: null | string;
    platform: string;
    discount_value: number;
    items_count: number;
    qr_link: string;
    payment_gateway: {
        id: number;
        status: string;
        amount: number;
        description: string;
        transaction_uuid: string;
        extra_data: {
            redirectUrl: string;
            payUrl: string | null;
            deeplink: string | null;
            qrCodeUrl: null | string;
            deeplinkMiniApp: string | null;
        };
        payment_method_id: number;
        paymentable_type: string;
        paymentable_id: number;
        created_at: string;
        updated_at: string;
        deleted_at: null;
        items: ITems[];
    };
    origin?: IOrderOrigin;
}
