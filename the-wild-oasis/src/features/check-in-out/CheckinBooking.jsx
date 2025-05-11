import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import {useMoveBack} from "../../hooks/useMoveBack";
import {useBooking} from "../bookings/useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import {useEffect, useState} from "react";
import Checkbox from "../../ui/Checkbox.jsx";
import {formatCurrency} from "../../utils/helpers.js";
import {BOOKING_STATUS} from "../../utils/enums.js";
import {useCheckin} from "./useCheckin.js";
import {useSettings} from "../settings/useSettings.js";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const {booking, isPending} = useBooking();
    const moveBack = useMoveBack();
    const {checkin, isCheckingIn} = useCheckin();
    const {settings, isPending: isSettingsPending} = useSettings();

    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false);
    }, [booking]);

    if (isPending || isSettingsPending) {
        return <Spinner/>;
    }

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    const optionalBreakfastprice = settings?.breakfastPrice * numNights * numGuests;

    function handleCheckin() {
        if (confirmPaid) {
            if (addBreakfast) {
                checkin({
                    bookingId, breakfast: {
                        hasBreakfast: true,
                        extrasPrice: optionalBreakfastprice,
                        totalPrice: totalPrice + optionalBreakfastprice,
                    }
                });
            } else {
                checkin({bookingId, breakfast: {}});
            }
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking}/>
            {booking.status === BOOKING_STATUS.UNCONFIRMED.value && (
                <Box>
                    <Checkbox checked={confirmPaid} onChange={() => setConfirmPaid(prevState => !prevState)}
                              disabled={booking?.isPaid ?? false} id="confirm">
                        I confirmed that {guests.fullName} has paid the total amount of {!addBreakfast
                        ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastprice)}
                        (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastprice)})`}</Checkbox>
                </Box>
            )}

            {!hasBreakfast && <Box>
                <Checkbox id="breakfast" checked={addBreakfast} onChange={() => {
                    setAddBreakfast(prevState => !prevState);
                    setConfirmPaid(false)
                }}> Want to add breakfast for ${formatCurrency(optionalBreakfastprice)}?</Checkbox>
            </Box>}

            <ButtonGroup>
                {booking.status === BOOKING_STATUS.UNCONFIRMED.value && (
                    <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking
                        #{bookingId}</Button>
                )}
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
