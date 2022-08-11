import React from 'react'
import video  from "../assets/Secuencia01.mp4"
import { NavbarLanding } from './components/Navbar.landing'

export const Landing = () => {
  return (
    <div>
        <div className='video'>
            <video loop autoPlay style={
                {
                    position: 'absolute',
                    width: '100%',
                    left: '50%',
                    top: '50%',
                    height: '100%',
                    objectFit:"cover",
                    transform: "translate(-50%,-50%)",
                    zIndex:"-1"
                }
            }>
                <source src={video} type="video/mp4" ></source>
            </video>
            <NavbarLanding />
        </div>
        
    </div>
  )
}
