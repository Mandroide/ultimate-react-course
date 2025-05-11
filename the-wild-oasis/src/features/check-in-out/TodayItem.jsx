import styled from "styled-components";
import {BOOKING_STATUS, PATHS} from "../../utils/enums.js";
import Tag from "../../ui/Tag.jsx";
import {Flag} from "../../ui/Flag.jsx";
import Button from "../../ui/Button.jsx";
import {Link} from "react-router";
import CheckoutButton from "./CheckoutButton.jsx";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({activity}) {
    const {id, status, guests, numNights} = activity;
    return (
        <StyledTodayItem>
            {status === BOOKING_STATUS.UNCONFIRMED.value && <Tag type="green">Arriving</Tag>}
            {status === BOOKING_STATUS.CHECKED_IN.value && <Tag type="blue">Departing</Tag>}
            <Flag src={guests.countryFlag} alt={`Flag of ${guests.nationality}`}/>
            <Guest>{guests.fullName}</Guest>
            <div>{numNights} nights</div>
            {status === BOOKING_STATUS.UNCONFIRMED.value && (
                <Button size="small" variation="primary" as={<Link to={`${PATHS.CHECKIN}/${id}`}/>}>
                    Check in
                </Button>)
            }
            {status === BOOKING_STATUS.CHECKED_IN.value && <CheckoutButton bookingId={id}/>}
        </StyledTodayItem>
    );
}

export default TodayItem;