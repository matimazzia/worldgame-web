import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { gameAction, getAllCountries, PostGame, giveUp, newGame, setCountrie } from "../../redux/actions/index";
// import { setTestDeviceIDAsync, AdMobInterstitial } from "expo-ads-admob"; change for ads in react web
// import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown'; change for other autocomplete
import { BsArrowClockwise, BsFlagFill, BsFillArrowUpSquareFill } from "react-icons/bs";
import Turnstone from 'turnstone'

export const Footer = () => {
  const dispatch = useDispatch();
  var attemp = {};
  const isSpanish = useSelector((state) => state.isSpanish);
  const [input, setInput] = useState("");
  const [countryOfDay, setCountryOfDay] = useState("");
  const countries = useSelector((state) => state.countries);
  const login = useSelector((state) => state.login);
  const listOfAttemps = useSelector((state) => state.attemps);
  const [win, sein] = useState(false)
  const GV = useSelector((state) => state.giveUp);
  const [modalVisible, setModalVisible] = useState(false);
  const countriesNames = []
  const listbox = [
      {
        data: countriesNames,
        searchType: "startswith"
      }
  ];
  const styles = {
      input: 'w-full border py-4 px-4 text-lg outline-none rounded-3xl',
      listbox: 'bg-neutral-900 w-full text-slate-50 rounded-3xl',
      highlightedItem: 'bg-neutral-800',
      query: 'text-oldsilver-800 placeholder:text-slate-600',
      typeahead: 'text-slate-500',
      clearButton:
        'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-500',
      noItems: 'cursor-default text-center my-20',
      match: 'font-semibold',
      groupHeading: 'px-5 py-3 text-pink-500',
  }
  const Item = ({ item }) => {
      return (
        <div className='flex items-center cursor-pointer px-5 py-6 rounded-3xl'>
          <p>{item}</p>
        </div>
      )
  }

  useEffect(()=>{
    countries.forEach((el)=>{
      countriesNames.push(el.name)
    })
  },[countries])
  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  useEffect(() => {
    if(login.length === 0){
        sein(false);
        dispatch(newGame());
        dispatch(giveUp(false));
    }
  }, [login]);

  useEffect(() => {
    if(win===false){
      let countrie = countries[Math.floor(Math.random() * 249)];
      setCountryOfDay(countrie);
      dispatch(setCountrie(countrie));
    }
  }, [win, countries]);

  // async function chargeAds(){
  //   await setTestDeviceIDAsync('EMULATOR').then(()=>{},()=>{});
  //   await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433').then(()=>{},()=>{});
  //   await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false}).then(()=>{},()=>{});
  // }
  
  // async function showAds(){
  //   await AdMobInterstitial.showAdAsync().then(()=>{},()=>{});
  // }

  // if(!(login?.Request?.premium)){
  //   chargeAds()
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('countryOfDay---->', countryOfDay);
    if ((input !== "") &&
      countries.some((el) => {
        if (el.name.toLowerCase() === input.trim().toLowerCase()) {
          attemp = el;
          return true;
        }
      })
    ) {
      if (
        !listOfAttemps.some(
          (el) => el.name.toLowerCase() === attemp.name.toLowerCase()
        )
      ) {
        if (!listOfAttemps.some((el) => el.name.toLowerCase() === countryOfDay.name.toLowerCase())){
          dispatch(gameAction(countryOfDay, attemp));
        }
        if(attemp.name.toLowerCase() === countryOfDay.name.toLowerCase()){
          dispatch(PostGame({countrie: countryOfDay.name, winned: true, time: 120, attempts: listOfAttemps.length + 1, UserId: 1, points: 5000})) 
          sein(true)
          // if(!(login.Request.premium)){
          //   console.log("a mostrar ads")
          //   setTimeout(()=>{showAds()}, 1000)
          // }
          console.log("Ya encontraste el país, felicitaciones!");
        }
      } else {
        console.log("Ya has probado con ese país, intenta con otra opción!");
      }
      setInput("");
      attemp = {};
    } else {
      console.log("No encontré el país");
    }
  };

  const handleGiveUp = (e) =>{
    e.preventDefault();
    dispatch(
      PostGame({countrie: countryOfDay.name, winned: false, time: 120, attempts: listOfAttemps.length , UserId: login?.Request?.id ? login.Request.id : 2 , points:5000})
      );
      sein(true)
      // if(!(login.Request.premium)){
      //   console.log("a mostrar ads")
      //   setTimeout(()=>{showAds()}, 1000)
      // }
      dispatch(giveUp(true));
    }

  return (
    <div className={`flex h-full w-full items-center justify-center`}>
      <div className={`flex flex-row justify-evenly items-center w-full bg-[#C0D6DF] shadow-xl rounded-t-3xl h-20`}>
          <div className={`flex items-center justify-center rounded-lg`}>
            {/* <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <div className={`flex items-center justify-center mt-75`}>
                <div className={`flex items-center justify-evenly bg-[#C0D6DF] rounded-xl w-60 h-40`}>
                  <Text className={`text-center text-lg text-black font-bold`}> {isSpanish?"¿Seguro que quieres rendirte?":"Sure you want to give up?"} </Text>
                  <div className={`flex flex-row items-center`}>
                    <button
                      className={`rounded-lg bg-green-400 w-10 pt-1 pb-1 pr-2 pl-2 mr-10`}
                      onClick={(e) => {setModalVisible(!modalVisible); handleGiveUp(e);}}
                    >
                      <Text className={`text-sm text-center font-bold text-white`}>{isSpanish?"Si":"Yes"}</Text>
                    </button>
                    <button
                      className={`rounded-lg bg-red-400 w-10 pt-1 pb-1 pr-2 pl-2`}
                      onClick={() => {setModalVisible(!modalVisible); backSound(soundOn)}}
                    >
                      <Text className={`text-sm text-center font-bold text-white`}>{isSpanish?"No":"No"}</Text>
                    </button>
                  </div>
                </div>
              </div>
            </Modal> */}
          </div>
        <button
          className={`flex rounded-full ml-3 mr-3 w-24 h-16 justify-center items-center bg-white`}
          onClick={!win ? (e) => {handleGiveUp(e);} : () => { sein(false); dispatch(newGame()); dispatch(giveUp(false));}}
        >
          { win ?
            <div>
              <BsArrowClockwise fontSize="2.5em"/>
            </div>
            :
            <div>
              <BsFlagFill fontSize="2.5em"/>
            </div>
          }
        </button>
        <Turnstone
          id='search'
          name='search'
          autoFocus={true}
          typeahead={true}
          clearButton={true}
          debounceWait={250}
          listboxIsImmutable={false}
          maxItems={2}
          noItemsMessage="No results..."
          placeholder={isSpanish ? "Introduce un país..." : 'Enter a country...'}
          listbox={listbox}
          styles={styles}
          Item={Item}
          onChange={(text) => {setInput(text);}}
        />
        <button
          className={`flex rounded-full ml-3 mr-3 w-24 h-16 justify-center items-center bg-white`}
          onClick={!win ? (e) => {handleSubmit(e);}: () => {console.log(12);  sein(false); dispatch(newGame()); dispatch(giveUp(false));}}
        >
          {GV || (win && listOfAttemps.length > 0) ? 
          <div>
            <BsArrowClockwise fontSize="2.5em"/>
          </div> :
          <div>
            <BsFillArrowUpSquareFill fontSize="2.5em"/>
          </div>
          }
        </button>
      </div>
    </div>
  )
}
