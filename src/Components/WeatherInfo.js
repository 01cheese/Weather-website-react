import React from "react";


function WeatherInfo({ data, units, city }) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    function capitalizeLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    }


    return (
        <div>
        <div className="weather__body">
            <h1 >{data.name}, {convertCountry(data.sys.country)}</h1>
            <div className="weather__datetime">{formatTime(data.dt, data.timezone)}</div>
            <div><p>{capitalizeLetter(data.weather[0].description)}</p></div>
            <div className="weather__icon"><img src={iconUrl} alt="Weather Icon" /></div>
            <p className="weather__temperature">{data.main.temp.toFixed()}°</p>
            <div className="weather__minmax">
                <p>Min: {data.main.temp_min.toFixed()}°</p>
                <p>Max: {data.main.temp_max.toFixed()}°</p>
            </div>
        </div>
        <div>
            <div className="weather__info">
                <div className="weather__card"><i className="fa-solid fa-temperature-full"></i><div><p>Real Feel</p><p>{data.main.feels_like.toFixed()}°</p></div></div>
                <div className="weather__card"><i className="fa-solid fa-droplet"></i><div><p>Humidity</p><p>{data.main.humidity}%</p></div></div>
                <div className="weather__card"><i className="fa-solid fa-wind"></i><div><p>Wind</p><p>{data.wind.speed} {units === "imperial" ? "mph" : "m/s"}</p></div></div>
                <div className="weather__card"><i className="fa-solid fa-gauge-high"></i><div><p>Pressure</p><p>{data.main.pressure} hPa</p></div></div>
            </div>
        </div>
        </div>
    );
}

function convertCountry(code) {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
}

function formatTime(timestamp, timezone) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-US", {
        timeZone: `UTC`,
        hour12: true,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
}

export default WeatherInfo;
