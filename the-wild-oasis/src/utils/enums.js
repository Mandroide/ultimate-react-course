export const PATHS = Object.freeze({
    DASHBOARD: "/dashboard",
    BOOKINGS: "/bookings",
    BOOKINGS_ID: "bookings/:bookingId",
    CABINS: "/cabins",
    CHECKIN: "/checkin",
    CHECKIN_ID: "/checkin/:bookingId",
    HOME: "/",
    USERS: "/users",
    SETTINGS: "/settings",
    ACCOUNT: "/account",
    LOGIN: "/login"
});

export const BOOKING_STATUS = Object.freeze({
    ALL: {
        value: "all",
        label: "All",
        color: null
    },
    CHECKED_IN: {
        value: "checked-in",
        label: "Checked in",
        color: "green"
    },
    CHECKED_OUT: {
        value: "checked-out",
        label: "Checked out",
        color: "silver"
    },
    UNCONFIRMED: {
        value: "unconfirmed",
        label: "Unconfirmed",
        color: "blue"
    }
});