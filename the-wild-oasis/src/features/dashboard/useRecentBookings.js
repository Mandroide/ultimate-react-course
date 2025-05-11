import {useSearchParams} from "react-router";
import {subDays} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getBookingsAfterDate} from "../../services/apiBookings.js";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get('last') ? 7 : +searchParams.get('numDays');
    const queryDate = subDays(new Date(), numDays).toISOString();
    const {isPending: isGettingBookings, data: bookings} = useQuery({
        queryKey: ['bookings', `last-${numDays}`],
        queryFn: () => getBookingsAfterDate(queryDate),
        retry: false
    });

    return {isGettingBookings, bookings};
}