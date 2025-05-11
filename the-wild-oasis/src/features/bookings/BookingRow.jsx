import styled from "styled-components";
import {format, isToday} from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import {formatCurrency, formatDistanceFromNow} from "../../utils/helpers";
import Menus from "../../ui/Menus.jsx";
import {HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import {useNavigate} from "react-router";
import {BOOKING_STATUS, PATHS} from "../../utils/enums.js";
import {useCheckout} from "../check-in-out/useCheckout.js";
import {useDeleteCabin} from "../cabins/useDeleteCabin.js";
import {useDeleteBooking} from "./useDeleteBooking.js";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "../cabins/CreateCabinForm.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function BookingRow({
                        booking: {
                            id: bookingId,
                            created_at,
                            startDate,
                            endDate,
                            numNights,
                            numGuests,
                            totalPrice,
                            status,
                            guests: {fullName: guestName, email},
                            cabins: {name: cabinName},
                        },
                    }) {

    const navigate = useNavigate();
    const {checkout, isCheckingOut} = useCheckout();
    const {isDeletingBooking, deleteBooking} = useDeleteBooking();
    const bookingStatus = BOOKING_STATUS[status.replace("-", "_").toUpperCase()]

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
        <span>
          {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
        </span>
                <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
        </span>
            </Stacked>

            <Tag
                type={bookingStatus.color}>{bookingStatus.label}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>
            {/* TODO 2025-05-05 Implementar borrado y corregir Modal */}
            {/*<div>*/}
            {/*    <Modal>*/}
            {/*        <Menus.Menu>*/}
            {/*            <Menus.Toggle id={id}/>*/}
            {/*            <Menus.List id={id}>*/}
            {/*                <Modal.Open icon={<HiPencil/>}>Edit</Modal.Open>*/}
            {/*                <Modal.Open icon={<HiSquare2Stack/>} onClick={handleDuplicate}>Duplicate</Modal.Open>*/}
            {/*                <Modal.Open icon={<HiTrash/>} onClick={() => deleteCabin(id)}>Delete</Modal.Open>*/}
            {/*            </Menus.List>*/}
            {/*        </Menus.Menu>*/}
            {/*        <Modal.Open icon={<HiPencil/>}>Edit</Modal.Open>*/}
            {/*        <Modal.Window>*/}
            {/*            <CreateCabinForm cabinToEdit={cabin}/>*/}
            {/*        </Modal.Window>*/}
            {/*    </Modal>*/}
            {/*    <Modal>*/}
            {/*        <Menus.Menu>*/}
            {/*            <Menus.Toggle id={id}/>*/}
            {/*            <Menus.List id={id}>*/}
            {/*                <Modal.Open icon={<HiPencil/>}>Edit</Modal.Open>*/}
            {/*                <Modal.Open icon={<HiSquare2Stack/>} onClick={handleDuplicate}>Duplicate</Modal.Open>*/}
            {/*                <Modal.Open icon={<HiTrash/>} onClick={() => deleteCabin(id)}>Delete</Modal.Open>*/}
            {/*            </Menus.List>*/}
            {/*        </Menus.Menu>*/}
            {/*        <Modal.Open icon={<HiPencil/>}>Edit</Modal.Open>*/}
            {/*        <Modal.Window>*/}
            {/*            <CreateCabinForm cabinToEdit={cabin}/>*/}
            {/*        </Modal.Window>*/}
            {/*    </Modal>*/}
            {/*    <Modal>*/}
            {/*        <Modal.Open><HiTrash/></Modal.Open>*/}
            {/*        <Modal.Window>*/}
            {/*            <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(id)}/>*/}
            {/*        </Modal.Window>*/}
            {/*    </Modal>*/}
            {/*</div>*/}
            <Menus.Menu>
                <Menus.Toggle id={bookingId}></Menus.Toggle>
                <Menus.List id={bookingId}>
                    <Menus.Button icon={<HiEye/>} onClick={() => navigate(`${PATHS.BOOKINGS}/${bookingId}`)}>See
                        details</Menus.Button>
                    {status === BOOKING_STATUS.UNCONFIRMED.value
                        && <Menus.Button icon={<HiArrowDownOnSquare/>}
                                         onClick={() => navigate(`${PATHS.CHECKIN}/${bookingId}`)}>Check
                            in</Menus.Button>}
                    {status === BOOKING_STATUS.CHECKED_IN.value
                        && <Menus.Button icon={<HiArrowUpOnSquare/>} onClick={() => checkout(bookingId)}
                        disabled={isCheckingOut}>Check out</Menus.Button>}
                </Menus.List>
            </Menus.Menu>
        </Table.Row>
    );
}

export default BookingRow;
