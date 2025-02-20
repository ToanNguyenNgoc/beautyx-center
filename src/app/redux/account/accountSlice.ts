import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from 'app/api/authApi';
import { IPUT_PROFILE } from 'app/api/interface';
import { AUTH_LOCAL_TOKEN, UserRole, USERROLE } from 'app/modules/auth';
import { STATUS } from '../status';

export const getRoles = async (token?: string) => {
    let roles: UserRole[] = []
    if (token || sessionStorage.getItem(AUTH_LOCAL_TOKEN)) {
        try {
            const response = await authApi.getRoles(token)
            roles = typeof response.data.context.roles === 'string' ? [] : response.data.context.roles
        } catch (error) { }
    }
    return roles
}

export const fetchAsyncUser: any = createAsyncThunk(
    "USER/fetchAsyncUser",
    async (ROLE: any) => {
        try {
            const res: any = await authApi.getUserProfile();
            const roles = await getRoles()
            const user = { ...res.data.context, ROLE }
            return Object.assign(user, { roles })
        } catch (error) {
            // removeAuth();
        }
    }
)
export const updateAsyncUser: any = createAsyncThunk(
    "USER/updateAsyncUser",
    async (params: IPUT_PROFILE) => {
        const res = await authApi.putUserProfile(params);
        const payload = res.data.context
        return payload
    }
)
export interface IAccountState {
    USER: USERROLE,
    status: string,
    userRole: UserRole[],
}

const initialState: IAccountState = {
    USER: {
        avatar: '',
        media: [],
        email: '',
        fullname: '',
        id: 0,
        telephone: '',
        token: '',
        token_expired_at: '',
        roles: '',
        ROLE: {
            id: 0, name: '', guard_name: '', summary: '', created_at: '', updated_at: ''
        }
    },
    status: '',
    userRole: []
}
const accountSlice = createSlice({
    initialState,
    name: "USER",
    reducers: {
        putUser: (state, action) => {
            state.USER = action.payload
        },
        logoutUser: (state) => {
            state.USER = initialState.USER;
            state.status = STATUS.SUCCESS;
            // removeAuth();
        }
    },
    extraReducers: {
        [fetchAsyncUser.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [fetchAsyncUser.fulfilled]: (state, { payload }) => {
            return { ...state, USER: payload, status: STATUS.SUCCESS, userRole: payload?.roles }
        },
        [fetchAsyncUser.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        },
        [updateAsyncUser.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [updateAsyncUser.fulfilled]: (state, { payload }) => {
            return { ...state, USER: payload, status: STATUS.SUCCESS }
        },
        [updateAsyncUser.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        }
    }
})
// export const getUserProfile = (state: any) => state
const { actions } = accountSlice;
export const { putUser, logoutUser } = actions;
export default accountSlice.reducer