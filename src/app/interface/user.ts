import { UserRole } from "app/modules/auth"

export interface User {
  avatar: string,
  media: [],
  email: string
  fullname: string
  id: number
  telephone: string
  token: string
  token_expired_at: string,
  btx_points: number
  is_active:0|1,
}
export interface Customer extends User {
  platform: string;
  current_platform: string | null;
  created_at: string;
}
export interface Statistic {
  organization_count: number;
  comment_count: number;
  user_count: number;
  appointment_count: number;
}
export interface AdminAccount extends Customer {
  roles: UserRole[]
}