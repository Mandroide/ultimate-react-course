import {createContext} from "react";

export const AuthContext = createContext(
    {
        isAuthenticated: false,
        user: {},
        login: (email, password) => {
        },
        logout: () => {
        },
    }
);

export const CitiesContext = createContext({
        cities: [],
        isLoading: false,
        currentCity: {},
        getCity: (id) => {},
        createCity: (newCity) => {},
        deleteCity: (id) => {}
});