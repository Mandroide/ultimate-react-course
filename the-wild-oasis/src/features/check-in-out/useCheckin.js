import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BOOKING_STATUS, PATHS} from "../../utils/enums.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";
import {updateBooking} from "../../services/apiBookings.js";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: checkin, isPending: isCheckingIn} = useMutation({
        mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, {
            status: BOOKING_STATUS.CHECKED_IN.value,
            isPaid: true,
            ...breakfast
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({
                queryKey: ['booking', data.id],
                active: true
            });
            navigate(PATHS.HOME);
        },
        onError: () => toast.error("There was an error checking in the booking")
    });

    return {checkin, isCheckingIn};
}