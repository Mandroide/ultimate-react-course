import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router";
import {PAGE_SIZE} from "../../utils/constants.js";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // FILTER
    const filterValueStatus = searchParams.get("status") || "all";
    const filterValueAmount = searchParams.get("amount") || "all";
    let filters = [];
    if (filterValueStatus !== "all") {
        filters.push({
            field: "status",
            value: filterValueStatus,
            method: "eq",
        });
    }

    if (filterValueAmount !== "all") {
        filters.push({
            field: "totalPrice",
            value: filterValueAmount,
            method: "gte",
        });
    }

    // SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = {field, direction}

    // PAGINATION
    const page = searchParams.get('page') ? +searchParams.get('page') : 1;

    const {isPending, data: {data: bookings, count} = {}, error} = useQuery({
        queryKey: ['bookings', filters, sortBy, page],
        queryFn: () => getBookings({filters, sortBy, page})
    });

    // PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filters, sortBy, page + 1],
            queryFn: () => getBookings({filters, sortBy, page: page + 1})
        })
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filters, sortBy, page - 1],
            queryFn: () => getBookings({filters, sortBy, page: page - 1})
        })
    }

    return {isPending, bookings, error, count};
}