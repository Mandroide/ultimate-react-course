import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login as loginApi} from "../../services/apiAuth.js";
import toast from "react-hot-toast";
import {PATHS} from "../../utils/enums.js";
import {useNavigate} from "react-router";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isPending: isSigningIn, mutate: login} = useMutation({
        mutationFn: loginApi,
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user.user);
            navigate(PATHS.DASHBOARD, {replace: true});
        },
        onError: error => toast.error(error.message),
    });

    return {isSigningIn, login};
}