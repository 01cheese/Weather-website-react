import React from "react";
import conditions from '../recommendation.json';


function Recommendation({ data }) {



    const text = conditions.find(item => item.id === data.weather[0].id);
    console.log(text);

    return <div className="weather__convenience show">{text?.fancyDescription}</div>;
}

export default Recommendation;
