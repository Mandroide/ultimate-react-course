const DARK_MODE_ACTION_TYPES = Object.freeze({
    SET_DARK_MODE_TOGGLE: 'darkMode/toggle'
});

const initialState = {
    isDarkMode: false,
    toggleDarkMode: () => {}
};

export function toggle() {
    return {type: DARK_MODE_ACTION_TYPES.SET_DARK_MODE_TOGGLE, payload: true}
    // if (currency === "USD") {
    //     return {type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_DEPOSIT, payload: amount}
    // } else {
    //     return async function (dispatch, getState) {
    //         dispatch({type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_CONVERTING_CURRENCY})
    //         const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
    //         const data = await res.json();
    //         const converted = data.rates.USD;
    //         dispatch({type: ACCOUNT_ACTION_TYPES.SET_ACCOUNT_DEPOSIT, payload: converted});
    //     }
    // }
}
