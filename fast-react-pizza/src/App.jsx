import {createBrowserRouter, RouterProvider} from "react-router";
import {PATHS} from "./utils/enums.js";
import AppLayout from "./ui/AppLayout.jsx";
import {lazy} from "react";

const Home = lazy(() => import("./ui/Home"));
const Menu = lazy(() => import("./features/menu/Menu"));
// const menuLoader = lazy(() => import("./features/menu/menuLoader.js"));
import menuLoader from "./features/menu/menuLoader.js";
import Error from "./ui/Error.jsx";
import {createOrderAction, orderLoader} from "./features/order/functions.js";

const Cart = lazy(() => import("./features/cart/Cart"));
const CreateOrder = lazy(() => import("./features/order/CreateOrder"));
const Order = lazy(() => import("./features/order/Order"));


const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: PATHS.HOME,
                element: <Home/>
            },
            {
                path: PATHS.MENU,
                element: <Menu/>,
                errorElement: <Error/>,
                loader: menuLoader
            },
            {
                path: PATHS.CART,
                element: <Cart/>
            },
            {
                path: PATHS.ORDER_NEW,
                element: <CreateOrder/>,
                action: createOrderAction
            },
            {
                path: PATHS.ORDER,
                element: <Order/>,
                loader: orderLoader,
                errorElement: <Error/>
            }
        ]
    }


])

function App() {

    return (
        <RouterProvider router={router}/>
    )
}

export default App
