import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import {useEffect, useState} from "react";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCities() {
            setIsLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cities`, {
                signal: controller.signal,
            });

            if (!res.ok) {
                return Promise.reject(new Error("Failed to fetch cities from API"));
            }

            const data = await res.json();
            setCities(data);
            setIsLoading(false);
        }

        fetchCities().catch((err) => {
            setIsLoading(false);
            if (err.name !== 'AbortError') {
                console.error(err.message);
                alert("There was an error loading data...");
            }
        })

        return () => {
            controller.abort()
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="app" element={<AppLayout/>}>
                    <Route index element={<Navigate replace to="cities"/>}/>
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="cities/:id" element={<City/>}/>
                    <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="form" element={<Form/>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
