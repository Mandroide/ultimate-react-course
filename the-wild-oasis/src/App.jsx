import {lazy} from "react";


import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {PATHS} from "./utils/enums.js";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
    return (
        <>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout/>}>
                        <Route index element={<Navigate replace to={PATHS.DASHBOARD}/>}/>
                        <Route path={PATHS.DASHBOARD} element={<Dashboard/>}/>
                        <Route path={PATHS.BOOKINGS} element={<Bookings/>}/>
                        <Route path={PATHS.CABINS} element={<Cabins/>}/>
                        <Route path={PATHS.USERS} element={<Users/>}/>
                        <Route path={PATHS.SETTINGS} element={<Settings/>}/>
                        <Route path={PATHS.ACCOUNT} element={<Account/>}/>
                    </Route>
                    <Route path={PATHS.LOGIN} element={<Login/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
