import React from 'react'
import { useSelector } from 'react-redux';
import { FiShare2 } from "react-icons/fi";

export const ShareButton = () => {
    const listOfAttemps = useSelector((state) => state.attemps);
    const isSpanish= useSelector((state) => state.isSpanish);
    const countryOfGame = useSelector((state) => state.countrie);
    const login = useSelector((state) => state.login);
    const createMessage = ()=>{
        let message = ""
        message += `--- *World Game* ---\n`
        message += isSpanish? `Usuario: ${login?.Request?.username}\n`:`User: ${login?.Request?.username}*\n`
        message += isSpanish? `Juego: #${login?.Request?.stats?.games +1}\n`:`Game: #${login?.Request?.stats?.games +1}\n`
        message += `-------------------------\n`
        listOfAttemps.map((el) => {
            if(el.hemisphere.asserted) message += "🟢"
            else message += "🔴"
            if(el.continent.asserted) message += "🟢"
            else message += "🔴"
            if(el.area.arrowdirection == "up" || el.area.arrowdirection == "down") message += "🔴"
            else message += "🟢"
            if(el.population.arrowDirection == "up" || el.population.arrowDirection == "down") message += "🔴"
            else message += "🟢"
            if(el.coordinates.direction.length > 0) message += "🔴"
            else message += "🟢"
            message += "\n"
        })
        message += `-------------------------\n`
        message += isSpanish? `País del juego: *${countryOfGame?.name}*`:`Country of game: *${countryOfGame?.name}*`
        return message
    }

    const onShare = async () => {
        try {
            var content = createMessage();
            navigator.clipboard.writeText(content).then(
                () => alert(isSpanish ? "Copiado!" : "Copied!")
            )
        } catch (error) {
          alert(error.message);
        }
    };

    return (
        <div className={`flex justify-center items-center mt-8 mb-5`}>
            <button 
                className={`w-52 h-10 border-0 m-0 p-0 shadow-lg flex justify-center items-center rounded-lg bg-white`}
                onClick={()=>{onShare()}}
            >
                <div className={`w-32 h-10 flex flex-row justify-evenly items-center`}>
                    <div>
                        <FiShare2 fontSize="2em"/>
                    </div>
                    <h2 className={`font-bold text-xl ml-6`}>{isSpanish ? "Compartir" :"Share"}</h2>
                </div>
            </button>
        </div>
    )
}
