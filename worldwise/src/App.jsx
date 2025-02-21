import {lazy, Suspense} from "react";
import {BrowserRouter, Navigate, Outlet, Route, Routes, useLocation} from "react-router-dom";

const Product = lazy(() => import('./pages/Product.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const Homepage = lazy(() => import('./pages/Homepage.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'));
const AppLayout = lazy(() => import('./pages/AppLayout.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import CitiesProvider from "./providers/CitiesProvider.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// dist/assets/index-DatoiQRn.css   30.23 kB │ gzip:   5.04 kB
// dist/assets/index-CafTk_2j.js   565.84 kB │ gzip: 167.01 kB

function Layout() {
    let location = useLocation();

    return (
        <Suspense fallback={<SpinnerFullPage/>} key={location.key}>
            <Outlet/>
        </Suspense>
    );
}

function App() {

    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<Homepage/>}/>
                            <Route path="product" element={<Product/>}/>
                            <Route path="pricing" element={<Pricing/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route
                                path="app"
                                element={
                                    <ProtectedRoute>
                                        <AppLayout/>
                                    </ProtectedRoute>
                                }
                            >
                                <Route index element={<Navigate replace to="cities"/>}/>
                                <Route path="cities" element={<CityList/>}/>
                                <Route path="cities/:id" element={<City/>}/>
                                <Route path="countries" element={<CountryList/>}/>
                                <Route path="form" element={<Form/>}/>
                            </Route>
                        </Route>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    )
}

export default App
