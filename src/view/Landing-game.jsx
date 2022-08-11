import React from 'react'
import video from "../assets/LandingGame.mp4"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getUser, setLogin, setStat, getAllCountries } from '../redux/actions'

export const LandingGame = () => {
    const allUser = useSelector((state) => state.users)
    const stat = useSelector((state) => state.stat)
    const [al, setAl] = useState(true);
    const navigate = useNavigate();
    let [first , setFirst] = useState(true);
    const dispatch = useDispatch()


    
    const createAlert = () =>
    <div role="alert">
        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            You have been banned
        </div>
        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>For more information, contact support</p>
        </div>
    </div>
    const getLogin = async () => {
        if(first === true){
        if (allUser.Request?.length > 0) {
            var value = await localStorage.getItem("User")
            if (value !== null) {
                value = JSON.parse(value);
                const User = (allUser.Request.find((e) => (e.username.toLowerCase() === value.username.toLowerCase())))
                if (User) {
                    if(User.state === false){
                        dispatch(setLogin(User));
                        if(al === true){
                            createAlert();
                            setAl(false);
                        } 
                    } else {
                        dispatch(setLogin(User));
                        setTimeout(()=>{
                            navigate("/home");
                        }, 6000)
                    }
                } else {
                    setTimeout(()=>{
                      navigate("/login");
                    }, 6000)
                }
            } else {
                setTimeout(()=>{
                    navigate("/login");
                }, 6000)
            }
        }else{
            console.log("not users")
            setTimeout(()=>{
                navigate("/register");
            }, 6000)
        }
        setFirst(false);
    }
    }
    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getUser());
    }, [dispatch]);
    useEffect(() => {
        if(allUser.Request){
            getLogin();
        }
        //console.log(allUser);
    }, [allUser]);

  return (
    <div>
        <video autoPlay={true} loop={true}style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%,-50%)",
            zIndex: "-1"
        }}>
             <source src={video} type="video/mp4" />
        </video>
    </div>
  )
}
