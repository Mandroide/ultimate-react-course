import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";

function CountryList({cities, isLoading}) {
    if (isLoading) {
        return <Spinner/>
    }

    if (!cities.length) {
        return <Message message="Add your first country by clicking on a country on the map"/>
    }

    const countriesUnique = new Set(
        cities.map(city =>
            JSON.stringify({ country: city.country, emoji: city.emoji }),
        ),
    )
    const countries = [...countriesUnique].map(each => JSON.parse(each));

    return (
        <ul className={styles.countryList}>
            {countries.map(country => (<CountryItem key={country.country} country={country} />))}
        </ul>
    )
}

export default CountryList;