import { Media } from "./productable";

export interface ResGmupTag {
  id?: number;
  priority: number;
  name: string;
  group: string;
  parent_id: number | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  media: Media[];
  children: ResGmupTag[];
}
