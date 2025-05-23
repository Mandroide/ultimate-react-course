import {useQuery} from "@tanstack/react-query";
import {getBooking} from "../../services/apiBookings.js";
import {useParams} from "react-router";

export function useBooking() {
    const {bookingId} = useParams();
    const {isPending, data: booking, error} = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false
    });
    return {isPending, booking, error};
}