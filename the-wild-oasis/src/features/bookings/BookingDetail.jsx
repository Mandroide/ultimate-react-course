import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import {useMoveBack} from "../../hooks/useMoveBack";
import {useBooking} from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import {BOOKING_STATUS, PATHS} from "../../utils/enums.js";
import Menus from "../../ui/Menus.jsx";
import {HiArrowDownOnSquare, HiArrowUpOnSquare} from "react-icons/hi2";
import {useNavigate} from "react-router";
import {useCheckout} from "../check-in-out/useCheckout.js";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const {isPending, booking} = useBooking();
    const {checkout, isCheckingOut} = useCheckout();
    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isPending) {
        return <Spinner/>;
    }

    if (!booking) {
        return <Empty resourceName="booking"/>
    }

    const {status, id: bookingId} = booking;

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag
                        type={BOOKING_STATUS[status.replace("-", "_")].color}>{BOOKING_STATUS[status.replace("-", "_")].label}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking}/>

            <ButtonGroup>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
                {status === BOOKING_STATUS.UNCONFIRMED.value
                    && <Button onClick={() => navigate(`${PATHS.CHECKIN}/${bookingId}`)}>Check in</Button>}
                {status === BOOKING_STATUS.CHECKED_IN.value
                    && <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>Check out</Button>}
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
