import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BOOKING_STATUS} from "../../utils/enums.js";
import toast from "react-hot-toast";
import {updateBooking} from "../../services/apiBookings.js";

export function useCheckout() {
    const queryClient = useQueryClient();
    const {mutate: checkout, isPending: isCheckingOut} = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: BOOKING_STATUS.CHECKED_OUT.value
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out`);
            queryClient.invalidateQueries({
                queryKey: ['booking', data.id],
                active: true
            });
        },
        onError: () => toast.error("There was an error checking out the booking")
    });

    return {checkout, isCheckingOut};
}