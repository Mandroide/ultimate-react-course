export const ACCOUNT_ACTION_TYPES = Object.freeze({
    SET_ACCOUNT_DEPOSIT: 'account/deposit',
    SET_ACCOUNT_WITHDRAW: 'account/withdraw',
    SET_ACCOUNT_REQUEST_LOAN: 'account/requestLoan',
    SET_ACCOUNT_PAY_LOAN: 'account/payLoan'
});

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ''
};

export default function accountReducer(state = initialStateAccount, {type, payload}) {
    switch (type) {
        case ACCOUNT_ACTION_TYPES.SET_ACCOUNT_DEPOSIT:
            return {
                ...state,
                balance: state.balance + payload
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
        default:
            return {...state}
    }
}

export function deposit(amount) {
    return {type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_DEPOSIT, payload: amount}
}

export function withdraw(amount) {
    return {type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_WITHDRAW, payload: amount}
}

export function requestLoan(amount, purpose) {
    return {type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_REQUEST_LOAN, payload: {amount, purpose}}
}

export function payLoan() {
    return {type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_PAY_LOAN}
}