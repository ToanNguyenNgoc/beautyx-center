/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {AuthModel} from '../interface/account_models';
import { Api } from 'app/api';

import { STATUS } from './status'
import { ReqPostLogin } from 'app/@types';

export const loginAsync: any = createAsyncThunk(
    "LOGIN/loginAsync",
    async (params: ReqPostLogin) => {
        try {
            const res = await Api.Auth.login(params);
            const payload = res.data.context;
            return payload;
        } catch (error) {
            console.log(error)
        }
    }
)
export interface IState {
    response: AuthModel|null,
    status: string
}
const initialState:IState = {
    response: null,
    status: ''
}
const loginSlice = createSlice({
    name: "LOGIN",
    initialState,
    reducers: {},
    extraReducers: {
        [loginAsync.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [loginAsync.fulfilled]: (_state, { payload }) => {
            return {
                response: payload,
                status: STATUS.SUCCESS
            }
        },
        [loginAsync.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        }
    }
})
export default loginSlice.reducer;