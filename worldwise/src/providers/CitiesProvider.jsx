import {CitiesActionType} from "../enums.js";
import {useEffect, useReducer} from "react";
import {CitiesContext} from "../constants/contexts.js";

function reducer(state, action) {
    switch (action.type) {
        case CitiesActionType.LOADING:
            return {
                ...state,
                error: "",
                loading: true,
            }
        case CitiesActionType.CITIES_LOADED:
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        case CitiesActionType.CITY_LOADED:
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
        case CitiesActionType.CITY_CREATED:
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            }
        case CitiesActionType.CITY_DELETED:
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload)
            }
        case CitiesActionType.REJECTED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            throw new Error(`Unknown action type ${action.type}`);

    }
}

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
}

function CitiesProvider({children}) {
    const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCities() {
            dispatch({type: CitiesActionType.LOADING})
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cities`, {
                signal: controller.signal,
            });

            if (!res.ok) {
                return Promise.reject(new Error("Failed to fetch cities from API"));
            }

            const data = await res.json();
            dispatch({type: CitiesActionType.CITIES_LOADED, payload: data})
        }

        fetchCities().catch((err) => {
            if (err.name !== 'AbortError') {
                dispatch({type: CitiesActionType.REJECTED, payload: "There was an error loading cities..."})
            }
        })

        return () => {
            controller.abort()
        }
    }, []);

    function getCity(id) {
        if (currentCity.id === +id) {
            return;
        }
        dispatch({type: CitiesActionType.LOADING});
        return fetch(`${import.meta.env.VITE_API_BASE_URL}/cities/${id}`).then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch city from API");
            }
            return res.json();
        }).then(data => {
            dispatch({type: CitiesActionType.CITY_LOADED, payload: data});
        }).catch(() => {
            dispatch({type: CitiesActionType.REJECTED, payload: "There was an error loading the city..."});
        });
    }

    function createCity(newCity) {
        dispatch({type: CitiesActionType.LOADING});
        return fetch(`${import.meta.env.VITE_API_BASE_URL}/cities`, {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            if (!res.ok && res.status !== 201) {
                throw new Error("Failed to save city on API");
            }
            return res.json();
        }).then(data => {
            dispatch({type: CitiesActionType.CITY_CREATED, payload: data});
        }).catch(() => {
            dispatch({type: CitiesActionType.REJECTED, payload: "There was an error creating the city..."});
        });
    }

    function deleteCity(id) {
        dispatch({type: CitiesActionType.LOADING});
        return fetch(`${import.meta.env.VITE_API_BASE_URL}/cities/${id}`, {
            method: "DELETE"
        }).then(res => {
            if (!res.ok && res.status !== 204) {
                throw new Error("Failed to delete city on API");
            }
            dispatch({type: CitiesActionType.CITY_DELETED, payload: id});
        }).catch(() => {
            dispatch({type: CitiesActionType.REJECTED, payload: "There was an error deleting city on API..."});
        });
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity
        }}>
            {children}
        </CitiesContext.Provider>
    );
}


export default CitiesProvider;