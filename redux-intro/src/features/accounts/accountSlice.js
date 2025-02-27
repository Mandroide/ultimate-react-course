import {createSlice} from "@reduxjs/toolkit";

const ACCOUNT_ACTION_TYPES = Object.freeze({
    SET_ACCOUNT_DEPOSIT: 'account/deposit',
    SET_ACCOUNT_WITHDRAW: 'account/withdraw',
    SET_ACCOUNT_REQUEST_LOAN: 'account/requestLoan',
    SET_ACCOUNT_PAY_LOAN: 'account/payLoan',
    SET_ACCOUNT_CONVERTING_CURRENCY: 'account/convertingCurrency',
});

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit: (state, action) => {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw: (state, action) => {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose
                    }
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            }
        },
        payLoan: (state) => {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency: (state) => {
            state.isLoading = true;
        }
    }
});

export const {withdraw, requestLoan, payLoan} = accountSlice.actions;

export function deposit(amount, currency) {
    if (currency === "USD") {
        return {type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_DEPOSIT, payload: amount}
    } else {
        return async function (dispatch, getState) {
            dispatch({type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_CONVERTING_CURRENCY})
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
            const data = await res.json();
            const converted = data.rates.USD;
            dispatch({type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_DEPOSIT, payload: converted});
        }
    }
}

export default accountSlice.reducer;

/*export default function accountReducer(state = initialState, {type, payload}) {
    switch (type) {
        case ACCOUNT_ACTION_TYPES.SET_ACCOUNT_DEPOSIT:
            return {
                ...state,
                balance: state.balance + payload,
                isLoading: false
            }
        case ACCOUNT_ACTION_TYPES.SET_ACCOUNT_WITHDRAW:
            return {
                ...state,
                balance: state.balance - payload
            }
        case ACCOUNT_ACTION_TYPES.SET_ACCOUNT_REQUEST_LOAN:
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: payload.amount,
                loanPurpose: payload.purpose,
                balance: state.balance + payload.amount
            }
        case ACCOUNT_ACTION_TYPES.SET_ACCOUNT_PAY_LOAN:
            return {
                ...state,
                loan: 0,
                loanPurpose: '',
                balance: state.balance - state.loan
            }
        case ACCOUNT_ACTION_TYPES.SET_ACCOUNT_CONVERTING_CURRENCY:
            return {
                ...state,
                isLoading: true
            }
        default:
            return {...state}
    }
}

export function deposit(amount, currency) {
    if (currency === "USD") {
        return {type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_DEPOSIT, payload: amount}
    } else {
        return async function (dispatch, getState) {
            dispatch({type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_CONVERTING_CURRENCY})
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
            const data = await res.json();
            const converted = data.rates.USD;
            dispatch({type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_DEPOSIT, payload: converted});
        }
    }
}

export function withdraw(amount) {
    return {type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_WITHDRAW, payload: amount}
}

export function requestLoan(amount, purpose) {
    return {type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_REQUEST_LOAN, payload: {amount, purpose}}
}

export function payLoan() {
    return {type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_PAY_LOAN}
}*/