export interface ITopic {
  _id: string;
  type: string;
  organization_id: number;
  created_by: number;
  name: string;
  updated_at: string;
  created_at: string;
  organization: Organization;
  topic_user: ITopicUser[];
  messages: IMessage[];
}

interface Organization {
  id: number;
  name: string;
  subdomain: string;
  domain: string;
  latitude: number;
  longitude: number;
  telephone: string[];
  address: string;
  min_price: number;
  max_price: number;
  image: string;
  is_momo_ecommerce_enable: boolean;
  is_moba_register_requested: boolean;
  opening_status: boolean;
  opening_time: OpeningTime[];
  created_at: string;
  updated_at: string;
  province_code: number;
  district_code: number;
  ward_code: number;
  priority: number;
  timezone: string;
  is_demo: boolean;
  description: string;
  mc_user_id: number | null;
  content: string;
  full_address: string;
  image_url: string;
  is_favorite: boolean;
  location: {
    lat: number;
    lon: number;
  };
}

interface OpeningTime {
  from_time_opening: string;
  to_time_opening: string;
  time_opening: string;
}

interface ITopicUser {
  _id: string;
  user_id: number;
  joined_at: string;
  topic_id: string;
  user: User;
}

interface User {
  id: number;
  fullname: string;
  email: string;
  telephone: string;
  fcm_token: string;
  created_at: string;
  platform: string;
  is_taptap: number;
  user_organization_id: number | null;
  is_active: number;
  avatar: string;
  current_platform: string | null;
}

export interface IMessage {
  _id: string;
  msg: string;
  user_id: number;
  topic_id: string;
  media_urls: string[];
  reply_id: string | null;
  updated_at: string;
  created_at: string;
}
