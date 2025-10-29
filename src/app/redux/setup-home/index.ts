/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from 'app/api'
import { ResBanner } from 'app/interface'

export interface ISetupHome {
    sections: any[],
    sectionFocus: any,
    banners: ResBanner[]
}
const initialState: ISetupHome = {
    sections: [],
    banners: [],
    sectionFocus: null
}
export const fetchAsyncBanners:any = createAsyncThunk(
    "HOME_SETUP/fetchAsyncBanners",
    async () => {
        const res = await Api.Banner.get()
        return res.context.data
    }
)
const setupHomeSlice = createSlice({
    initialState,
    name: "HOME_SETUP",
    reducers: {
        onAddNewSection: (state, action) => {
            const newSection = action.payload
            const iIndex = state.sections.findIndex(i => i.id === action.payload.id)
            if (iIndex < 0) {
                state.sections.push(newSection)
            }
        },
        onFocusSection: (state, action) => {
            state.sectionFocus = action.payload
        },
        onSortTableBanners:(state, action) =>{
            state.banners = action.payload
            console.log(action.payload)
        }
    },
    extraReducers: {
        [fetchAsyncBanners.pending.toString()]: (state) => {
            return state
        },
        [fetchAsyncBanners.fulfilled.toString()]: (state, { payload }) => {
            state.banners = payload
        },
        [fetchAsyncBanners.rejected.toString()]: (state) => {
            return state
        },
    }
})
const { reducer, actions } = setupHomeSlice
export const { onAddNewSection, onFocusSection, onSortTableBanners } = actions
export default reducer