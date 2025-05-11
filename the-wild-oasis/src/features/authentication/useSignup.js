import {useMutation} from "@tanstack/react-query";
import {signup as signupApi} from "../../services/apiAuth.js";
import {useNavigate} from "react-router";
import {PATHS} from "../../utils/enums.js";
import toast from "react-hot-toast";

export function useSignup() {
    const navigate = useNavigate();
    const {mutate: signup, isPending: isSigningUp} = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success("Account successfully created! Please verify your email address");
            navigate(PATHS.LOGIN);
        }
    });

    return {isSigningUp, signup};
}