import React from "react";
import {FlagConverter} from "./Converter";
import Weather from "./Weather.jsx";


function convertToFlag(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            location: "lisbon",
            isLoading: false,
            displayLocation: "",
            countryCode: "pt",
            weather: {}
        }
    }

    handleLocationChange = location => {
        this.setState({location, isLoading: false});
    }

    fetchWeather = async () => {
        try {
            // 1) Getting location (geocoding)
            this.setState({isLoading: true});
            const geoRes = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
            );
            const geoData = await geoRes.json();
            console.log(geoData);

            if (!geoData.results) throw new Error("Location not found");

            const {latitude, longitude, timezone, name, country_code} =
                geoData.results.at(0);
            this.setState({
                displayLocation: `${name} ${convertToFlag(country_code)}`
            });

            // 2) Getting actual weather
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
            );
            const weatherData = await weatherRes.json();
            this.setState({
                weather: weatherData.daily
            });
        } catch (err) {
            console.err(err);
        } finally {
            this.setState({isLoading: false});
        }
    }

    render() {
        return (
            <div className="app">
                <h1>Classy Weather</h1>
                <div>
                    <input type="text" placeholder="Search from location..."
                           value={this.state.location}
                           onChange={e => this.handleLocationChange(e.target.value)}/>
                </div>
                <button onClick={this.fetchWeather} disabled={this.state.isLoading}>Get weather</button>
                {this.state.isLoading && <div className="loader">Loading...</div>}
                {this.state.weather.weathercode &&
                    <Weather weather={this.state.weather}
                             location={this.state.displayLocation}
                    from={this.state.countryCode}/>}
                { this.state.weather.weathercode && <div style={{ display: "flex", columnGap: "1rem" }}>
                    <p>{this.state.displayLocation}</p>
                    <FlagConverter from={this.state.countryCode}>
                        {this.state.location} flag
                    </FlagConverter>
                </div>}
            </div>
        )
    }
}