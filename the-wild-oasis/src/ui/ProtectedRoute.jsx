import {useUser} from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {PATHS} from "../utils/enums.js";

const FullPage = styled.div`
height: 100vh;
    background-color: var(--color-grey-50);
display: flex;
align-items: center;
justify-content: center;`

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    // 1. Load the authenticated user
    const {isPending, isAuthenticated} = useUser()

    // 2. If there is NO authenticated user, redirect to the /login page
    useEffect(() => {
        if (!isAuthenticated && !isPending) {
            navigate(PATHS.LOGIN, {replace: true});
        }
    }, [isAuthenticated, isPending, navigate])

    // 3. While loading, show a spinner
    if (isPending) {
        return <FullPage><Spinner/></FullPage>;
    }

    // 4. If there IS a user render the app
    if (isAuthenticated) {
        return children;
    }
}

export default ProtectedRoute;