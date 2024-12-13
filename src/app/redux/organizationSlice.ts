import { createSlice } from "@reduxjs/toolkit"
import { IOrganization } from "app/interface"

export type StateOrganization = {
  detail: IOrganization | null
}
const initialState: StateOrganization = {
  detail: null
}

const organizationSlice = createSlice({
  name: 'ORGANIZATION',
  initialState,
  reducers: {
    onSetOrganization: (action, { payload }: { payload: IOrganization }) => {
      action.detail = payload
    }
  }
})

export const {
  onSetOrganization
} = organizationSlice.actions

export default organizationSlice.reducer