import { IMedia } from "./media";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBrandApp {
  id: number;
  name: string;
  bundle_id: string;
  note: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  media_url: string | null;
  media: any[]; // Can be refined if media objects have a structure
}
export interface IBrandAppVersion {
  id: number;
  brand_app_id: number;
  version: string;
  os_platform: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  media_url: string;
  brand_app: IBrandApp;
  media: IMedia[];
}