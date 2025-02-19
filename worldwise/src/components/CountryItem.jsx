import styles from "./CountryItem.module.css";
import FlagEmojiToPNG from "./FlagEmojiToPNG.jsx";

function CountryItem({country}) {
    return (
        <li className={styles.countryItem}>
            <span><FlagEmojiToPNG flag={country.emoji}/></span>
            <span>{country.country}</span>
        </li>
    );
}

export default CountryItem;
