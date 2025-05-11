import {useSearchParams} from "react-router";
import {subDays} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getStaysAfterDate} from "../../services/apiBookings.js";
import {BOOKING_STATUS} from "../../utils/enums.js";

export function useRecentStays() {
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get('last') ? 7 : +searchParams.get('numDays');
    const queryDate = subDays(new Date(), numDays).toISOString();
    const {isPending: isGettingStays, data: stays} = useQuery({
        queryKey: ['bookings', `last-${numDays}`],
        queryFn: () => getStaysAfterDate(queryDate),
        retry: false
    });

    const confirmedStays = stays?.filter(s => s.status === BOOKING_STATUS.CHECKED_IN.value || s.status === BOOKING_STATUS.CHECKED_OUT.value);

    return {isGettingStays, stays, confirmedStays, numDays};
}