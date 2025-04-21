import React from "react";

function Recommendation({ data }) {
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const condition = data.weather[0].main;

    let text = "";
    if (temp < 0) text = "На улице очень холодно, надевай теплую одежду!";
    else if (temp < 10) text = "Погода прохладная. Надень куртку!";
    else if (temp < 20) text = "Неплохая погода, можно обойтись лёгкой курткой.";
    else if (temp < 30) text = "Тёплая погода, одевай что-нибудь лёгкое.";
    else text = "Очень жарко! Пей больше воды и избегай солнца.";

    if (condition.includes("Rain")) text += " Не забудь зонт!";
    if (wind > 10) text += " На улице ветрено.";

    return <div className="weather__convenience show">{text}</div>;
}

export default Recommendation;
