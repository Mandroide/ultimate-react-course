import {lazy} from "react";


import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {PATHS} from "./utils/enums.js";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import DarkModeProvider from "./providers/DarkModeProvider.jsx";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Booking = lazy(() => import("./pages/Booking"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Checkin = lazy(() => import("./pages/Checkin"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                staleTime: 0
                // staleTime: 60 * 1000
            }
        }
    }
);

function App() {
    return (
        <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                        <Route index element={<Navigate replace to={PATHS.DASHBOARD}/>}/>
                        <Route path={PATHS.DASHBOARD} element={<Dashboard/>}/>
                        <Route path={PATHS.BOOKINGS} element={<Bookings/>}/>
                        <Route path={PATHS.BOOKINGS_ID} element={<Booking/>}/>
                        <Route path={PATHS.CHECKIN_ID} element={<Checkin/>}/>
                        <Route path={PATHS.CABINS} element={<Cabins/>}/>
                        <Route path={PATHS.USERS} element={<Users/>}/>
                        <Route path={PATHS.SETTINGS} element={<Settings/>}/>
                        <Route path={PATHS.ACCOUNT} element={<Account/>}/>
                    </Route>
                    <Route path={PATHS.LOGIN} element={<Login/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster position="top-center" gutter={12} containerStyle={{margin: '8px'}}
                     toastOptions={{
                         success: {
                             duration: 3000
                         },
                         error: {
                             duration: 5000
                         },
                         style: {
                             fontSize: '16px',
                             maxWidth: '500px',
                             padding: '16px 24px',
                             backgroundColor: 'var(--color-grey-0)',
                             color: 'var(--color-grey-700)',
                         }
                     }}/>
        </QueryClientProvider>
        </DarkModeProvider>
    )
}

export default App
