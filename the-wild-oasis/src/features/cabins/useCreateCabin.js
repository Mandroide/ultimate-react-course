import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const {mutate: createCabin, isPending: isCreating} = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("Cabin creation successfully!");
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
        },
        onError: err => {
            toast.error(err.message);
        }
    });

    return {createCabin, isCreating};
}