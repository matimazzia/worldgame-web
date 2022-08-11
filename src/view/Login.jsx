import React from 'react'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import validate from '../utils/validateL';
import img from "../assets/Worldgame.png"
import {
  postLogin,
  setLogin,
  getAllCountries,
  getUser,
} from "../redux/actions/index";
import { useNavigate } from 'react-router-dom';
export const Login = ({user}) => {
    const allUser = useSelector((state) => state.users);
    const isSpanish= useSelector((state) => state.isSpanish);
    //const soundOn = useSelector((state) => state.soundOn);
    const first = useSelector((state) => state.first);
    const dispatch = useDispatch();
  const [inputa, setInput] = useState({
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
  const navigate = useNavigate();

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
      console.log("user: ", User);
      console.log("user: ", allUser);
      if (User && User.state === false) {
        setLogErr(isSpanish ? "Usuario baneado por favor contactarse con el administrador ":"Banned user, please contact the administrator.");
        setBanned(true); 
      } else if (User && User.state === true) {
        dispatch(
            postLogin(_input)
        ).then(data =>{
            console.log(data)
            if (data.payload.Request.hasOwnProperty("authorization")) {
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
        })
      }
    }
    setPressed(true);
  };

  function handleInputChange(type, text) {
    setInput({
      ...inputa,
      [type]: text,
    });
    setLogErr("");
    setErr({ ...err, [type]:validate(type, text,isSpanish) });
    setPressed(false);
  }

  useEffect(() => {
    if (
      pressed === true &&
      user?.Request &&
      banned === false &&
      first === false
    ) {
      setInput({
        username: "",
        password: "",
      });
      setLogErr("");
      //navigate('/home')
    } else if (pressed === true && first === true) {
      const User = allUser.Request.find(
        (e) => e.username.toLowerCase() === inputa.username.toLowerCase()
      );
      if (User) {
        //navigate('/instructions')
        let logear = user?.Request;
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
    if (pressed === true && !user?.Request) {
      setTimeout(() => {
        if (logErr !== "Banned user, please contact the administrator." || logErr !=="Usuario baneado por favor contactarse con el administrador ") {
          setLogErr(isSpanish ? "Usuario o contraseña invalido"  :" Invalid user or password");
        }
      }, 700);
    }
    if (inputa.password === "" || inputa.username === "") {
      setLogErr("");
    }
    setPressed(false);
  }, [user, pressed]);

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getUser());
    if (inputa.password === "" || inputa.username === "") {
      setLogErr("");
    }
  }, []);
 
  return (
    <div className="bg-[#005f73] h-full">
      <div className="min-h-full flex items-center justify-center py-40 px-4 sm:px-6 lg:px-8 bg-[#005f73]">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-60"
              src={img}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">{isSpanish? "Ingresá a tu cuenta.":"Sign in to your account"}</h2>
          </div>
          <form className="mt-8 space-y-6" action="#"  onSubmit={() => {log(inputa);}}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                    {isSpanish ? "Usuario" : "User"}
                </label>
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
                <label htmlFor="password" className="sr-only">
                {isSpanish ? "Contraseña" : "Password"}
                </label>
                <input
                  type="password"
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder={isSpanish ? "Contraseña..." : "Password..."}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

                />
                <h4 className={`text-red-500 text-xs text-left mt-2 mb-3`}
                >{err.password}</h4>
              </div>
            </div>
            <div>
            <h4 className={`text-red-500 text-xs text-center mb-3`}
                >{logErr}</h4>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#023047] hover:bg-[#a2d2ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                {isSpanish ? "INICIAR SESIÓN" : "LOGIN"}
              </button>
            </div>
          </form>
          <h4 className={`text-white text-center font-bold mt-5`}>
            {isSpanish ? "Si no tenes cuenta, ": "If you do not have an account, "}
              <a
              className={`text-blue-200 text-center font-bold cursor-pointer mt-5`}
              onClick={() => {;setInput({
                username: "",
                password: "",
              });}}
            >
             &nbsp;{isSpanish ? "Registrarse": "Register"}
            </a>
          </h4>
        </div>
      </div>
    </div>
  )}

