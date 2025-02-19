import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from "./BackButton.jsx";
import useUrlPosition from "../hooks/useUrlPosition.js";
import FlagEmojiToPNG from "./FlagEmojiToPNG.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";
import useCities from "../hooks/useCities.js";
import {useNavigate} from "react-router-dom";


function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const [lat, lng] = useUrlPosition();
    const {createCity, isLoading} = useCities();
    const navigate = useNavigate();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState("");
    const [geocodingError, setGeocodingError] = useState("");


    useEffect(() => {
        if (!lat && !lng) {
            return;
        }
        const controller = new AbortController();

        async function fetchCityData() {
            setIsLoadingGeocoding(true);
            setGeocodingError("");
            const res = await fetch(`${import.meta.env.VITE_API_GEOCODE_URL}?latitude=${lat}&longitude=${lng}`, {
                signal: controller.signal,
            });

            if (!res.ok) {
                return Promise.reject(new Error("Failed to fetch cities from API"));
            }

            const data = await res.json();

            if (!data.countryCode) {
                return Promise.reject(new Error("That doesn't seem to be a city. Click somewhere else"));
            }

            setCityName(data.city || data.locality || "");
            setCountry(data.countryName);
            setEmoji(convertToEmoji(data.countryCode));
            //setCities(data);
            setIsLoadingGeocoding(false);
        }

        fetchCityData().catch((err) => {
            setIsLoadingGeocoding(false);
            if (err.name !== 'AbortError') {
                setGeocodingError(err.message);
            }
        });

        return () => controller.abort();
    }, [lat, lng])

    if (isLoadingGeocoding) {
        return <Spinner/>;
    }

    if (!lat && !lng) {
        return <Message message="Start by clicking somewhere on the map"/>;
    }

    if (geocodingError) {
        return <Message message={geocodingError}/>;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!cityName || !date) {
            return;
        }

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {lat, lng}
        };

        await createCity(newCity);
        navigate("/app/cities");
    }

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                {emoji && <span className={styles.flag}><FlagEmojiToPNG flag={emoji}/> </span>}
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker id="date" showMonthYearDropdown maxDate={new Date()} onChange={date => setDate(date)}
                            selected={date} dateFormat="yyyy-MM-dd"/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton/>
            </div>
        </form>
    );
}

export default Form;
