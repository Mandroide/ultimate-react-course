import {createSlice} from "@reduxjs/toolkit";

const CUSTOMER_ACTION_TYPES = Object.freeze({
    SET_CUSTOMER_CREATE: 'customer/createCustomer',
    SET_CUSTOMER_UPDATE_NAME: 'customer/updateName',
});

const initialState = {
    fullName: "",
    nationalId: "",
    createdAt: ""
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalId) {
                return {
                    payload: {
                        fullName,
                        nationalId,
                        createdAt: new Date().toISOString()
                    }
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalId = action.payload.nationalId;
                state.createdAt = action.payload.createdAt;
            }
        },
        updateName(state, action) {
            state.fullName = action.payload;
        }
    }

});

export const {createCustomer, updateName} = customerSlice.actions;

export default customerSlice.reducer;
