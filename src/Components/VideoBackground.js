import React from "react";

function VideoBackground({ src }) {
    return (
        <video className="weather__background show" autoPlay muted loop>
            <source src={`/${src}`} type="video/mp4" />
        </video>
    );
}

export default VideoBackground;
