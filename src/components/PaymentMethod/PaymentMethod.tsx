import { PAYMENT_METHOD } from "app/util";
import { FC } from "react";

interface PaymentMethodProps {
  payment_method_id: number
}

export const PaymentMethod: FC<PaymentMethodProps> = ({
  payment_method_id
}) => {
  const method = Object.values(PAYMENT_METHOD).find(i => i.id === payment_method_id)
  return (
    <div>
      <span className="badge badge-primary" style={{ backgroundColor: method?.color || '' }}>{method?.name || 'Chưa xác định'}</span>
    </div>
  )
}