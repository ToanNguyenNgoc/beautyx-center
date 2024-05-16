export type Tips = {
  id: number
  name: string
  type: string | null
  type_id: number | null
  status: number | null
  priority: number | null
  user_id: number | null
  created_at: string
  updated_at: string
}
export type PostTip = Omit<Tips, 'id' | 'user_id' | 'created_at' | 'updated_at'>
