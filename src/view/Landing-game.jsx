import React from 'react'
import video from "../assets/landingGame.mp4"

export const LandingGame = () => {
  return (
    <div>
    <div className="video">
        <video width="750" height="500" controls style={{display:'none'}} >
      <source src={video} type="video/mp4"/>
      </video>
    <video
      loop
      autoPlay
      controls={false}
      style={{
        position: "absolute",
        width: "100%",
        left: "50%",
        top: "50%",
        height: "100%",
        objectFit: "cover",
        transform: "translate(-50%,-50%)",
        zIndex: "-1",
      }}
    >
      <source src={video} type="video/mp4"></source>
    </video>
  </div></div>
  )
}
