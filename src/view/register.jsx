import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import validateInput from "../utils/ValidateInput";
import { PostUser,postLogin,getUser, first } from "../redux/actions";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import img from "../assets/Worldgame.png"

export const Register = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [userA, setUserA] = useState(null);
    const soundOn = useSelector((state) => state.soundOn);
    const isSpanish= useSelector((state) => state.isSpanish);
    const user= useSelector(state => state.login);
    const allUser = useSelector((state) => state.users)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const countries = [{"value":"Afganistán","label":"Afganistán"},{"value":"Alandia","label":"Alandia"},{"value":"Albania","label":"Albania"},{"value":"Alemania","label":"Alemania"},{"value":"Andorra","label":"Andorra"},{"value":"Angola","label":"Angola"},{"value":"Anguilla","label":"Anguilla"},{"value":"Antigua y Barbuda","label":"Antigua y Barbuda"},{"value":"Antártida","label":"Antártida"},{"value":"Arabia Saudí","label":"Arabia Saudí"},{"value":"Argelia","label":"Argelia"},{"value":"Argentina","label":"Argentina"},{"value":"Armenia","label":"Armenia"},{"value":"Aruba","label":"Aruba"},{"value":"Australia","label":"Australia"},{"value":"Austria","label":"Austria"},{"value":"Azerbaiyán","label":"Azerbaiyán"},{"value":"Bahamas","label":"Bahamas"},{"value":"Bahrein","label":"Bahrein"},{"value":"Bangladesh","label":"Bangladesh"},{"value":"Barbados","label":"Barbados"},{"value":"Belice","label":"Belice"},{"value":"Benín","label":"Benín"},{"value":"Bermudas","label":"Bermudas"},{"value":"Bielorrusia","label":"Bielorrusia"},{"value":"Bolivia","label":"Bolivia"},{"value":"Bosnia y Herzegovina","label":"Bosnia y Herzegovina"},{"value":"Botswana","label":"Botswana"},{"value":"Brasil","label":"Brasil"},{"value":"Brunei","label":"Brunei"},{"value":"Bulgaria","label":"Bulgaria"},{"value":"Burkina Faso","label":"Burkina Faso"},{"value":"Burundi","label":"Burundi"},{"value":"Bután","label":"Bután"},{"value":"Bélgica","label":"Bélgica"},{"value":"Cabo Verde","label":"Cabo Verde"},{"value":"Camboya","label":"Camboya"},{"value":"Camerún","label":"Camerún"},{"value":"Canadá","label":"Canadá"},{"value":"Caribe Neerlandés","label":"Caribe Neerlandés"},{"value":"Catar","label":"Catar"},{"value":"Chad","label":"Chad"},{"value":"Chequia","label":"Chequia"},{"value":"Chile","label":"Chile"},{"value":"China","label":"China"},{"value":"Chipre","label":"Chipre"},{"value":"Ciudad del Vaticano","label":"Ciudad del Vaticano"},{"value":"Colombia","label":"Colombia"},{"value":"Comoras","label":"Comoras"},{"value":"Congo","label":"Congo"},{"value":"Congo (Rep. Dem.)","label":"Congo (Rep. Dem.)"},{"value":"Corea del Norte","label":"Corea del Norte"},{"value":"Corea del Sur","label":"Corea del Sur"},{"value":"Costa Rica","label":"Costa Rica"},{"value":"Costa de Marfil","label":"Costa de Marfil"},{"value":"Croacia","label":"Croacia"},{"value":"Cuba","label":"Cuba"},{"value":"Curazao","label":"Curazao"},{"value":"Dinamarca","label":"Dinamarca"},{"value":"Djibouti","label":"Djibouti"},{"value":"Dominica","label":"Dominica"},{"value":"Ecuador","label":"Ecuador"},{"value":"Egipto","label":"Egipto"},{"value":"El Salvador","label":"El Salvador"},{"value":"Emiratos Árabes Unidos","label":"Emiratos Árabes Unidos"},{"value":"Eritrea","label":"Eritrea"},{"value":"Eslovenia","label":"Eslovenia"},{"value":"España","label":"España"},{"value":"Estados Unidos","label":"Estados Unidos"},{"value":"Estonia","label":"Estonia"},{"value":"Etiopía","label":"Etiopía"},{"value":"Filipinas","label":"Filipinas"},{"value":"Finlandia","label":"Finlandia"},{"value":"Fiyi","label":"Fiyi"},{"value":"Francia","label":"Francia"},{"value":"Gabón","label":"Gabón"},{"value":"Gambia","label":"Gambia"},{"value":"Georgia","label":"Georgia"},{"value":"Ghana","label":"Ghana"},{"value":"Gibraltar","label":"Gibraltar"},{"value":"Grecia","label":"Grecia"},{"value":"Grenada","label":"Grenada"},{"value":"Groenlandia","label":"Groenlandia"},{"value":"Guadalupe","label":"Guadalupe"},{"value":"Guam","label":"Guam"},{"value":"Guatemala","label":"Guatemala"},{"value":"Guayana Francesa","label":"Guayana Francesa"},{"value":"Guernsey","label":"Guernsey"},{"value":"Guinea","label":"Guinea"},{"value":"Guinea Ecuatorial","label":"Guinea Ecuatorial"},{"value":"Guinea-Bisáu","label":"Guinea-Bisáu"},{"value":"Guyana","label":"Guyana"},{"value":"Haití","label":"Haití"},{"value":"Honduras","label":"Honduras"},{"value":"Hong Kong","label":"Hong Kong"},{"value":"Hungría","label":"Hungría"},{"value":"India","label":"India"},{"value":"Indonesia","label":"Indonesia"},{"value":"Irak","label":"Irak"},{"value":"Iran","label":"Iran"},{"value":"Irlanda","label":"Irlanda"},{"value":"Isla Bouvet","label":"Isla Bouvet"},{"value":"Isla de Man","label":"Isla de Man"},{"value":"Isla de Navidad","label":"Isla de Navidad"},{"value":"Isla de Norfolk","label":"Isla de Norfolk"},{"value":"Islandia","label":"Islandia"},{"value":"Islas Caimán","label":"Islas Caimán"},{"value":"Islas Cocos o Islas Keeling","label":"Islas Cocos o Islas Keeling"},{"value":"Islas Cook","label":"Islas Cook"},{"value":"Islas Faroe","label":"Islas Faroe"},{"value":"Islas Georgias del Sur y Sandwich del Sur","label":"Islas Georgias del Sur y Sandwich del Sur"},{"value":"Islas Heard y McDonald","label":"Islas Heard y McDonald"},{"value":"Islas Malvinas","label":"Islas Malvinas"},{"value":"Islas Marianas del Norte","label":"Islas Marianas del Norte"},{"value":"Islas Marshall","label":"Islas Marshall"},{"value":"Islas Pitcairn","label":"Islas Pitcairn"},{"value":"Islas Salomón","label":"Islas Salomón"},{"value":"Islas Svalbard y Jan Mayen","label":"Islas Svalbard y Jan Mayen"},{"value":"Islas Tokelau","label":"Islas Tokelau"},{"value":"Islas Turks y Caicos","label":"Islas Turks y Caicos"},{"value":"Islas Ultramarinas Menores de Estados Unidos","label":"Islas Ultramarinas Menores de Estados Unidos"},{"value":"Islas Vírgenes de los Estados Unidos","label":"Islas Vírgenes de los Estados Unidos"},{"value":"Islas Vírgenes del Reino Unido","label":"Islas Vírgenes del Reino Unido"},{"value":"Israel","label":"Israel"},{"value":"Italia","label":"Italia"},{"value":"Jamaica","label":"Jamaica"},{"value":"Japón","label":"Japón"},{"value":"Jersey","label":"Jersey"},{"value":"Jordania","label":"Jordania"},{"value":"Kazajistán","label":"Kazajistán"},{"value":"Kenia","label":"Kenia"},{"value":"Kirguizistán","label":"Kirguizistán"},{"value":"Kiribati","label":"Kiribati"},{"value":"Kosovo","label":"Kosovo"},{"value":"Kuwait","label":"Kuwait"},{"value":"Laos","label":"Laos"},{"value":"Lesotho","label":"Lesotho"},{"value":"Letonia","label":"Letonia"},{"value":"Liberia","label":"Liberia"},{"value":"Libia","label":"Libia"},{"value":"Liechtenstein","label":"Liechtenstein"},{"value":"Lituania","label":"Lituania"},{"value":"Luxemburgo","label":"Luxemburgo"},{"value":"Líbano","label":"Líbano"},{"value":"Macao","label":"Macao"},{"value":"Macedonia del Norte","label":"Macedonia del Norte"},{"value":"Madagascar","label":"Madagascar"},{"value":"Malasia","label":"Malasia"},{"value":"Malawi","label":"Malawi"},{"value":"Maldivas","label":"Maldivas"},{"value":"Mali","label":"Mali"},{"value":"Malta","label":"Malta"},{"value":"Marruecos","label":"Marruecos"},{"value":"Martinica","label":"Martinica"},{"value":"Mauricio","label":"Mauricio"},{"value":"Mauritania","label":"Mauritania"},{"value":"Mayotte","label":"Mayotte"},{"value":"Micronesia","label":"Micronesia"},{"value":"Moldavia","label":"Moldavia"},{"value":"Mongolia","label":"Mongolia"},{"value":"Montenegro","label":"Montenegro"},{"value":"Montserrat","label":"Montserrat"},{"value":"Mozambique","label":"Mozambique"},{"value":"Myanmar","label":"Myanmar"},{"value":"México","label":"México"},{"value":"Mónaco","label":"Mónaco"},{"value":"Namibia","label":"Namibia"},{"value":"Nauru","label":"Nauru"},{"value":"Nepal","label":"Nepal"},{"value":"Nicaragua","label":"Nicaragua"},{"value":"Nigeria","label":"Nigeria"},{"value":"Niue","label":"Niue"},{"value":"Noruega","label":"Noruega"},{"value":"Nueva Caledonia","label":"Nueva Caledonia"},{"value":"Nueva Zelanda","label":"Nueva Zelanda"},{"value":"Níger","label":"Níger"},{"value":"Omán","label":"Omán"},{"value":"Pakistán","label":"Pakistán"},{"value":"Palau","label":"Palau"},{"value":"Palestina","label":"Palestina"},{"value":"Panamá","label":"Panamá"},{"value":"Papúa Nueva Guinea","label":"Papúa Nueva Guinea"},{"value":"Paraguay","label":"Paraguay"},{"value":"Países Bajos","label":"Países Bajos"},{"value":"Perú","label":"Perú"},{"value":"Polinesia Francesa","label":"Polinesia Francesa"},{"value":"Polonia","label":"Polonia"},{"value":"Portugal","label":"Portugal"},{"value":"Puerto Rico","label":"Puerto Rico"},{"value":"Reino Unido","label":"Reino Unido"},{"value":"República Centroafricana","label":"República Centroafricana"},{"value":"República Dominicana","label":"República Dominicana"},{"value":"República Eslovaca","label":"República Eslovaca"},{"value":"República de Sudáfrica","label":"República de Sudáfrica"},{"value":"Reunión","label":"Reunión"},{"value":"Ruanda","label":"Ruanda"},{"value":"Rumania","label":"Rumania"},{"value":"Rusia","label":"Rusia"},{"value":"Sahara Occidental","label":"Sahara Occidental"},{"value":"Saint Martin","label":"Saint Martin"},{"value":"Samoa","label":"Samoa"},{"value":"Samoa Americana","label":"Samoa Americana"},{"value":"San Bartolomé","label":"San Bartolomé"},{"value":"San Cristóbal y Nieves","label":"San Cristóbal y Nieves"},{"value":"San Marino","label":"San Marino"},{"value":"San Pedro y Miquelón","label":"San Pedro y Miquelón"},{"value":"San Vicente y Granadinas","label":"San Vicente y Granadinas"},{"value":"Santa Elena, Ascensión y Tristán de Acuña","label":"Santa Elena, Ascensión y Tristán de Acuña"},{"value":"Santa Lucía","label":"Santa Lucía"},{"value":"Santo Tomé y Príncipe","label":"Santo Tomé y Príncipe"},{"value":"Senegal","label":"Senegal"},{"value":"Serbia","label":"Serbia"},{"value":"Seychelles","label":"Seychelles"},{"value":"Sierra Leone","label":"Sierra Leone"},{"value":"Singapur","label":"Singapur"},{"value":"Sint Maarten","label":"Sint Maarten"},{"value":"Siria","label":"Siria"},{"value":"Somalia","label":"Somalia"},{"value":"Sri Lanka","label":"Sri Lanka"},{"value":"Suazilandia","label":"Suazilandia"},{"value":"Sudán","label":"Sudán"},{"value":"Sudán del Sur","label":"Sudán del Sur"},{"value":"Suecia","label":"Suecia"},{"value":"Suiza","label":"Suiza"},{"value":"Surinam","label":"Surinam"},{"value":"Tailandia","label":"Tailandia"},{"value":"Taiwán","label":"Taiwán"},{"value":"Tanzania","label":"Tanzania"},{"value":"Tayikistán","label":"Tayikistán"},{"value":"Territorio Británico del Océano Índico","label":"Territorio Británico del Océano Índico"},{"value":"Tierras Australes y Antárticas Francesas","label":"Tierras Australes y Antárticas Francesas"},{"value":"Timor Oriental","label":"Timor Oriental"},{"value":"Togo","label":"Togo"},{"value":"Tonga","label":"Tonga"},{"value":"Trinidad y Tobago","label":"Trinidad y Tobago"},{"value":"Turkmenistán","label":"Turkmenistán"},{"value":"Turquía","label":"Turquía"},{"value":"Tuvalu","label":"Tuvalu"},{"value":"Túnez","label":"Túnez"},{"value":"Ucrania","label":"Ucrania"},{"value":"Uganda","label":"Uganda"},{"value":"Uruguay","label":"Uruguay"},{"value":"Uzbekistán","label":"Uzbekistán"},{"value":"Vanuatu","label":"Vanuatu"},{"value":"Venezuela","label":"Venezuela"},{"value":"Vietnam","label":"Vietnam"},{"value":"Wallis y Futuna","label":"Wallis y Futuna"},{"value":"Yemen","label":"Yemen"},{"value":"Zambia","label":"Zambia"},{"value":"Zimbabue","label":"Zimbabue"}]
    const [open, setOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(countries);
    const [inputa, setInput] = useState({
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
      country: "",
    });
    const [err, setErr] = useState({});
  
    const setLogin = async (value) => {
      try {
          return await localStorage.setItem('User', JSON.stringify(value))
      } catch (error) {
         console.error('AsyncStorage#setItem error: ' + error.message);
      }
    }
    //UseEffect limpiar estados
  
    function handleSubmit(e) {
      setErr(validateInput(inputa,isSpanish));
      if (!(Object.keys(err).length > 0)) {
        dispatch(
          PostUser({
            email: inputa.email,
            username: inputa.username,
            password: inputa.password,
            country: inputa.country,
            avatar:"https://res.cloudinary.com/dunhnh8mv/image/upload/v1660090956/sgui6vs7tehvrggagkd5.png",
            first: true,
          })
        ).then(()=>{
          console.log('entre al postLogin')
          dispatch(
            postLogin({
              username: inputa.username,
              password: inputa.password,
        }));
        });
        dispatch(getUser());
        dispatch(first(true))
        navigate('/home')
      }
    }
  
    function handleInputChange(type, text) {
      setInput({
        ...inputa,
        [type]: text,
      });
      setErr(validateInput({ ...inputa, [type]: text },isSpanish));
      if (!(Object.keys(validateInput({ ...inputa, [type]: text },isSpanish)).length > 0)) {
        setIsDisabled(false);
      }
    }
  return (
    <div className="bg-[#005f73] h-full">
      <div className="min-h-full flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8 bg-[#005f73]">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-60"
              src={img}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">{isSpanish? "Regístrate.":"Register"}</h2>
          </div>
          <form className="mt-8 space-y-6" action="#"  onSubmit={() => {handleSubmit(inputa);}}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
              <h2 className='text-white ml-2 mb-1 ' >
                {isSpanish ? "Usuario" : "User"}</h2>
                <label htmlFor="username" className="sr-only"></label>
                <input
                  type="text"
                  className="appearance-none rounded-md  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username..."
                  value={inputa.username}
                  onChange={(e) =>{handleInputChange("username", e.target.value)}}
                />
                <h4 className={`text-red-500 text-xs text-left mt-2 mb-3`}
                >{err.username}</h4>
              </div>
              <div>
              <h2 className='text-white ml-2 mb-1 ' >
                {isSpanish ? "Contraseña" : "Password"}
                </h2>
                <label htmlFor="password" className="sr-only"></label>
                <input
                  type="Password"
                  value={inputa.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder={isSpanish ? "Contraseña..." : "Password..."}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

                />
                <h4 className={`text-red-500 text-xs text-left mt-2 mb-3`}
                >{err.password}</h4>
              </div>
              <div>
              <h2 className='text-white ml-2 mb-1 ' >
                {isSpanish ? "Repetir contraseña" : "Repeat password"}
                </h2>
                <label htmlFor="repeatpassword" className="sr-only">
                </label>
                <input
                  type="password"
                  value={inputa.repeatPassword}
                  onChange={(e) => handleInputChange("repeatPassword", e.target.value)}
                  placeholder={isSpanish ? "Repetir contraseña..." : "Repeat password..."}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

                />
                <h4 className={`text-red-500 text-xs text-left mt-2 mb-3`}
                >{err.repeatPassword}</h4>
              </div>
              <div>
                <h2 className='text-white ml-2 mb-1 ' >
                {isSpanish ? "Correo electrónico" : "e-mail"}
                </h2>
                <label htmlFor="email" className="sr-only">
                {isSpanish ? "Correo electrónico..." : "e-mail..."}
                </label>
                <input
                  value={inputa.email}
                  type="email"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={isSpanish ? "Contraseña..." : "Password..."}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

                />
                <h4 className={`text-red-500 text-xs text-left mt-2 mb-3`}
                >{err.email}</h4>
              </div>
              <div>
              <h2 className='text-white ml-2 mb-1 ' >
                {isSpanish ? "País" : "Country"}
                </h2>
                <label htmlFor="country" className="sr-only">
                </label>
                <input
                  value={inputa.country}
                  type="text"
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder={isSpanish ? "País..." : "Country..."}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

                />
                <h4 className={`text-red-500 text-xs text-left mt-2 mb-3`}
                ></h4>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#023047] hover:bg-[#a2d2ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                {isSpanish ? "Registrarse" : "Register"}
              </button>
              <h4 className={`text-white text-center font-bold mt-5`}>
              {isSpanish ? 'Si ya tenes cuenta' : "If you have acount" }
              <a
              className={`text-blue-200 text-center font-bold cursor-pointer mt-5`}
              onClick={() => {navigate('/login');setInput({
                username: "",
                password: "",
              });}}
            >
              &nbsp;{isSpanish ? 'Ingresa' : "Login" }
            </a>
          </h4>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}
