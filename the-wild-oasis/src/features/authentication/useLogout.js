import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {logout as logoutApi} from "../../services/apiAuth.js";
import {PATHS} from "../../utils/enums.js";
import toast from "react-hot-toast";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isPending: isSigningOut, mutate: logout} = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate(PATHS.LOGIN, {replace: true});
        },
        onError: error => toast.error(error.message),
    });

    return {isSigningOut, logout};
}
