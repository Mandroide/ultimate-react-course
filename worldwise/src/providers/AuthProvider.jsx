import {useReducer} from "react";
import {AuthActionType} from "../enums.js";
import {AuthContext} from "../constants/contexts.js";

const initialState = {
    user: null,
    isAuthenticated: false
}

function reducer(state, action) {
    switch (action.type) {
        case AuthActionType.LOADING:
            return {
                ...state,

            }
        case AuthActionType.LOGGED_IN:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,

            }
        case AuthActionType.LOGGED_OUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,

            }
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({children}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: AuthActionType.LOGGED_IN, payload: FAKE_USER})
        }
    }

    function logout() {
        dispatch({type: AuthActionType.LOGGED_OUT})
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;