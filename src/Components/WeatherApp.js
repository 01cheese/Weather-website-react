import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import WeatherInfo from "./WeatherInfo";
import Recommendation from "./Recommendation";
import VideoBackground from "./VideoBackground";
import "./../App.css";

const API_KEY = process.env.REACT_APP_API_KEY;

// const randomCities = ["Paris", "New York", "Tokyo", "Sydney", "Moscow", "Rio", "Berlin", "Toronto", "Rome", "Istanbul"];

function WeatherApp() {
    const [city, setCity] = useState("London");
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [background, setBackground] = useState("default.mp4");

    // // inactivity logic
    // useEffect(() => {
    //     const resetTimer = () => {
    //         clearTimeout(window.inactivityTimeout);
    //         window.inactivityTimeout = setTimeout(() => {
    //             const random = randomCities[Math.floor(Math.random() * randomCities.length)];
    //             setCity(random);
    //         }, 10000);
    //     };
    //     ["click", "mousemove", "scroll", "keydown"].forEach(event =>
    //         document.addEventListener(event, resetTimer)
    //     );
    //     resetTimer();
    //     return () => clearTimeout(window.inactivityTimeout);
    // }, []);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`);
                if (!res.ok) throw new Error("City not found");
                const data = await res.json();
                setWeather(data);
                setError("");
                updateBackground(data);
            } catch (e) {
                setError("City not found. Try again.");
            }
        }
        fetchWeather();
    }, [city, units]);

    function updateBackground(data) {
        const condition = data.weather[0].main;
        const isDay = data.dt >= data.sys.sunrise && data.dt <= data.sys.sunset;
        console.log(isDay);
        const videos = {
            Clear: isDay ? "default.mp4" : "default.mp4",
            Clouds: isDay ? "default.mp4" : "default.mp4",
            Rain: isDay ? "default.mp4" : "default.mp4",
            Snow: isDay ? "default.mp4" : "default.mp4",
            Thunderstorm: isDay ? "default.mp4" : "default.mp4",
            Drizzle: isDay ? "default.mp4" : "default.mp4",
            Mist: isDay ? "default.mp4" : "default.mp4",
        };
        console.log(videos[condition]);

        setBackground(videos[condition] || "default.mp4");
    }


    return (
        <div className="container">
            <VideoBackground src={background} />
            <SearchBar onSearch={setCity} units={units} setUnits={setUnits} />
            {error && <p className="error-message">{error}</p>}
            {weather && <WeatherInfo data={weather} city={city} units={units} />}
            {weather && <Recommendation data={weather} />}
        </div>
    );
}

export default WeatherApp;
