export const CUSTOMER_ACTION_TYPES = Object.freeze({
    SET_CUSTOMER_CREATE: 'customer/createCustomer',
    SET_CUSTOMER_UPDATE_NAME: 'customer/updateName',
});

const initialStateCustomer = {
    fullName: "",
    nationalId: "",
    createdAt: ""
};

export default function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case CUSTOMER_ACTION_TYPES.SET_CUSTOMER_CREATE:
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt: action.payload.createdAt
            }
        case CUSTOMER_ACTION_TYPES.SET_CUSTOMER_UPDATE_NAME:
            return {
                ...state,
                fullName: action.payload
            }
        default:
            return state
    }
}

export function createCustomer(fullName, nationalId) {
    // Since new Date is a side effect (non-deterministic), this must be done here instead of logic in reducer
    return {
        type: CUSTOMER_ACTION_TYPES.SET_CUSTOMER_CREATE,
        payload: {fullName, nationalId, createdAt: new Date().toISOString()}
    }
}

export function updateName(fullName) {
    return {
        type: CUSTOMER_ACTION_TYPES.SET_CUSTOMER_CREATE,
        payload: fullName
    }
}