import React from 'react'
import { BsLinkedin } from 'react-icons/bs'
import image from "../assets/Worldgame.png"

export const Abaut = () => {
  return (
    <div className="flex-col justify-center  text-center items-center flex">
        <img src={image} alt= "jsfd" className='items-center justify-center flex  ' />
        <h1 className="mt-6 text-center text-3xl font-extrabold text-white">¿Quiénes somos?</h1>
        <p className='text-white ml-2 mb-1 mt-4 '>
        {"Somos un grupo de 8 estudiantes de Henry, con mucha dedicación creamos un videojuego"}
        </p>
        <p className='text-white ml-2 mb-1 mt-2 '>
        {"para presentar en nuestro Proyecto Final."}
        </p>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-white" >¿Qué es WorldGame?</h1>
        <p className='text-white ml-2 mb-1 mt-4 '>
            {"WORLDGAME es un juego móvil, con su versión web, basado en Wordle un juego de  adivinanzas de palabras..."} 
        </p>
        <p className='text-white ml-2 mb-1 mt-4'>
            {"Nos basamos en ese mismo formato reinventándonos cambiando la temática a países."} 
        </p>
        <pc className='text-white ml-2 mb-1 mt-4'>
            {"El mismo cuenta con pagos integrados, autenticación de terceros, publicidad \n, pedidos a Google maps, carga de imágenes con Cloudinary, chat integrado con socket-Io \n y más funcionalidades que brindan al usuario una mejor experiencia."} 
        </pc>
        <p className='text-white ml-2 mb-1 mt-4 '>
        {" El proyecto fue realizado con la metodología Scrum en apenas 3 semanas, \n donde pudimos demostrar agilidad a la hora de la resolución de problemas, compañerismo,\n disposición y muy buena comunicación."}
        </p>
    </div>
  )
}
