import {useQuery} from "@tanstack/react-query";
import {getCabins} from "../../services/apiCabins.js";

export function useCabins() {
    const {isPending, data: cabins, error} = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins
    });
    return {isPending, cabins, error};
}