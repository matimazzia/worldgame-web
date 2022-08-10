import React from 'react'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import validate from "../utils/validateL";
import {
  postLogin,
  setLogin,
  getAllCountries,
  getUser,
} from "../redux/actions/index";
//import { touchSound } from '../utils/sounds';
import { Register } from './Register';
export const Login = ({user, postLogin}) => {
    const allUser = useSelector((state) => state.users);
    const isSpanish= useSelector((state) => state.isSpanish);
    //const soundOn = useSelector((state) => state.soundOn);
    const first = useSelector((state) => state.first);
    const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState({
    username: "",
    password: "",
  });

  const [pressed, setPressed] = useState(false);
  const [banned, setBanned] = useState(false);
  const [logErr, setLogErr] = useState("");
  const login = useSelector((state) => state.login);

  const setLogin_ = async (value) => {
    try {
      return await localStorage.setItem("User", JSON.stringify(value));
    } catch (error) {
      console.error("AsyncStorage#setItem error: " + error.message);
    }

  };

  let log = async (_input) => {
    if (_input.username.length < 3 && _input.password.length < 3) {
      setErr({
        username: isSpanish ? "Ingrese su Nombre de usuario" : "Enter your username",
        password: isSpanish ? "Ingrese su Contraseña": "Enter your password",
      });
    } else {
      if (_input.username.length < 3) {
        setErr({ ...err, username: isSpanish ? "Ingrese su Nombre de usuario" : "Enter your username" });
      }
      if (_input.password.length < 3) {
        setErr({ ...err, password: isSpanish ? "Ingrese su Nombre de usuario" : "Enter your username" });
      }
    }

    if (
      validate("username", _input.username,isSpanish) === "" &&
      validate("password", _input.password,isSpanish) === ""
    ) {
      const User = allUser.Request.find(
        (e) => e.username.toLowerCase() === _input.username.toLowerCase()
      );
      let siLogin = false;
      // if(login.Request && login.Request?.username?.toLowerCase() === input.username.toLowerCase() && login?.Request?.first === false){
      //   siLogin = true;
      // }
      console.log("user: ", User);
      console.log("user: ", allUser);
      if (User && User.state === false) {
        setLogErr(isSpanish ? "Usuario baneado por favor contactarse con el administrador ":"Banned user, please contact the administrator.");
        setBanned(true); 
      } else if (User && User.state === true) {
        var c = await postLogin(_input);
        console.log("c: ", c);
        if (c.payload.Request !== "No se inicio sessión") {
          dispatch(setLogin(User));
          setLogin_(_input);
          setPressed(true);
        } else {
          setTimeout(() => {
            if (logErr !== "Banned user, please contact the administrator."|| logErr !=="Usuario baneado por favor contactarse con el administrador ") {
              setLogErr(isSpanish ? "Usuario o contraseña invalido"  : "Invalid user or password");
            }
          }, 700);
        }
      }
    }
    setPressed(true);
  };

  function handleInputChange(type, text) {
    setInput({
      ...input,
      [type]: text,
    });
    setLogErr("");
    setErr({ ...err, [type]: validate(type, text,isSpanish) });
    setPressed(false);
  }

  useEffect(() => {
    if (
      pressed === true &&
      user.Request &&
      banned === false &&
      first === false
    ) {
      setInput({
        username: "",
        password: "",
      });
      setLogErr("");
      //navigation.navigate("Home");
    } else if (pressed === true && first === true) {
      const User = allUser.Request.find(
        (e) => e.username.toLowerCase() === input.username.toLowerCase()
      );
      if (User) {
        //navigation.navigate("Instructions");
        let logear = user.Request;
        logear.first = false;
        dispatch(
          setLogin({
            logear,
          })
        );
      } else {
        setTimeout(() => {
          if (logErr !== "Banned user, please contact the administrator."|| logErr !=="Usuario baneado por favor contactarse con el administrador ") {
            setLogErr(isSpanish ? "Usuario o contraseña invalido"  :" Invalid user or password");
          }
        }, 700);
      }
    }
    if (pressed === true && !user.Request) {
      setTimeout(() => {
        if (logErr !== "Banned user, please contact the administrator." || logErr !=="Usuario baneado por favor contactarse con el administrador ") {
          setLogErr(isSpanish ? "Usuario o contraseña invalido"  :" Invalid user or password");
        }
      }, 700);
    }
    if (input.password === "" || input.username === "") {
      setLogErr("");
    }
    setPressed(false);
  }, [user, pressed]);

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getUser());
    if (input.password === "" || input.username === "") {
      setLogErr("");
    }
    //console.log("useruseruseruseruseru", allUser);
  }, []);
 
  return (
    <div>
        <img/>
        <div>
            <h2 style={tw`text-white text-lg text-left mb-1`} >{isSpanish ? "Usuario" : "User"}</h2>
            <input
            type="text"
            key={"user"}
            value={input.username}
            onChangeText={(e) => handleInputChange("username", e)}
            placeholderTextColor="#6f6f6f"
            style={tw`pl-3 mb-1 w-70 h-10 rounded-lg bg-[#C0D6DF] text-gray-900 shadow-lg`}
            ></input>
            <h4 style={tw`text-red-500 text-xs text-left mt-1 mb-1`}
            >{err.username}</h4>
        </div>
        <div>
        <h2 style={tw`text-white text-lg text-left mb-1`}>{isSpanish ? "Contraseña" : "Password"}</h2>
            <input
            type="text"
            placeholder={isSpanish ? "Contraseña..." : "Password..."}
            key={"password"}
            value={input.password}
            onChangeText={(e) => handleInputChange("password", e)}
            placeholderTextColor="#6f6f6f"
            style={tw`pl-3 mb-1 w-70 h-10 rounded-lg bg-[#C0D6DF] text-gray-900 shadow-lg`}
            ></input>
            <h4 style={tw`text-red-500 text-xs text-left mt-1 mb-1`}
            >{err.password}</h4>
        </div>
        <button
        style={tw`flex flex-row justify-around items-center bg-[#FFFFFF] px-8 py-2 rounded-xl w-60 h-12 shadow-lg`}
        disabled={true}
        // onPress={() => {touchSound(soundOn);}}
        >
            <div style={tw`w-6 h-6 mr-5`}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 326667 333333"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                    <path
                        d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                        fill="#4285f4"
                />
                    <path
                        d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                        fill="#34a853"
                />
                    <path
                        d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                        fill="#fbbc04"
                />
                    <path
                        d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                        fill="#ea4335"
                />
                </svg>
            </div>
            <h2 style={tw`text-base font-bold`}>{isSpanish ? 'Iniciar con google' : "Sing In whit Google" }</h2>
        </button>
        <div style={tw`mt-10`}>
                <h3 style={tw`text-white text-center font-bold`}>
                {isSpanish ? "Si no tenes cuenta, ": "If you do not have an account, "}
                <h3
                style={tw`text-blue-200 text-center font-bold`}
                onPress={() => {<Navigate to={<Register/>}/>;setPressed(false);setInput({
                username: "",
                password: "",
              });console.log("touchSound(soundOn)");}}
            >
              &nbsp;{isSpanish ? "Registrarse": "Register"}
                </h3>
            </h3>
        </div>
    </div>
  )
}

function mapStateToProps(state) {
    return {
      user: state.login,
    };
  }
  
  export default connect(mapStateToProps, { postLogin })(Login);