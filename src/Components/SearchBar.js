import React, { useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

function SearchBar({ onSearch, units, setUnits }) {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (e) => {
        const value = e.target.value;
        setInput(value);

        if (value.length >= 2) {
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
            );
            const data = await res.json();
            setSuggestions(data);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (cityObj) => {
        onSearch({ lat: cityObj.lat, lon: cityObj.lon });
        setInput(`${cityObj.name}, ${cityObj.country}`);
        setSuggestions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input);
            setSuggestions([]);
            setInput("");
        }
    };

    return (
        <div className="weather__header">
            <form className="weather__search" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search for a city..."
                    value={input}
                    onChange={handleChange}
                    className="weather__searchform"
                />
                <i className="fa-solid fa-magnifying-glass"></i>
                {suggestions.length > 0 && (
                    <div className="search__suggestions">
                        {suggestions.map((city, idx) => (
                            <p key={idx} onClick={() => handleSelect(city)}>
                                {city.name}, {city.state ? city.state + ", " : ""}{city.country}
                            </p>
                        ))}
                    </div>
                )}
            </form>
            <div className="weather__units">
        <span
            className={`weather_unit_celsius ${units === "metric" ? "active" : ""}`}
            onClick={() => setUnits("metric")}
        >
          °C
        </span>
                <span
                    className={`weather_unit_farenheit ${units === "imperial" ? "active" : ""}`}
                    onClick={() => setUnits("imperial")}
                >
          °F
        </span>
            </div>
        </div>
    );
}

export default SearchBar;
