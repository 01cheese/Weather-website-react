import React, { useState } from "react";

function SearchBar({ onSearch, units, setUnits }) {
    const [input, setInput] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input);
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
                    onChange={e => setInput(e.target.value)}
                    className="weather__searchform"
                />
                <i className="fa-solid fa-magnifying-glass"></i>
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
