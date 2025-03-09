import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";

export function useUpdateCabin() {
    const queryClient = useQueryClient();
    const {mutate: updateCabin, isPending: isUpdating} = useMutation({
        mutationFn: ({cabin, id}) => createEditCabin(cabin, id),
        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
        },
        onError: error => {
            toast.error(error.message);
        }
    });
    return {updateCabin, isUpdating};
}