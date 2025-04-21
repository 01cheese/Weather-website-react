import React from "react";
import conditions from '../recommendation.json';


function Recommendation({ data }) {

    function capitalizeLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    const text = conditions.find(item => item.id === data.weather[0].id);
    console.log(text);

    return <div className="weather__convenience show">{text?.fancyDescription} {capitalizeLetter(data.weather[0].description)}</div>;
}

export default Recommendation;
