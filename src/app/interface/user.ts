export interface User {
  avatar: string,
  media: [],
  email: string
  fullname: string
  id: number
  telephone: string
  token: string
  token_expired_at: string,
  btx_points:number
}
export interface Customer extends User{
  platform:string;
  current_platform:string|null;
  created_at:string;
}
export interface Statistic{
  organization_count:number;
  comment_count:number;
  user_count:number;
  appointment_count:number;
}