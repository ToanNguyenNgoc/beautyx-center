import { configureStore } from "@reduxjs/toolkit"
import accountRuducer from "./account/accountSlice"
import bannerReducer from "./banner/bannerSlice"
import loginReducer from "./loginSlice"
import topPropductReducer from "./product/productSlice"
import ordersReducer from "./orders/ordersSlice"
import homeSetupReducer from "./setup-home"
import organizationReducer from "./organizationSlice"

const rootReducer = {
    ACCOUNT: accountRuducer,
    BANNER: bannerReducer,
    LOGIN: loginReducer,
    TOP_PRODUCT: topPropductReducer,
    ORDERS: ordersReducer,
    HOME_SETUP: homeSetupReducer,
    ORGANIZATION: organizationReducer
}
const store = configureStore({
    reducer: rootReducer,
});
export default store;
export type RootStore = ReturnType<typeof store.getState> 