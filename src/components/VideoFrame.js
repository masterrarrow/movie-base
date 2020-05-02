import React from "react";


const VideoFrame = ({ id, trailer }) => {
    return (
        <iframe title={id} width="1244" height="700" src={trailer} frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen/>
    )
};


export default React.memo(VideoFrame);
