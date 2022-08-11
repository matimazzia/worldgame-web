let validate = (type, event,isSpanish) => {
  let reg = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
  var usernameRegex = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/
  if (type === "username") {
    if (!usernameRegex.test(event)) {
      return isSpanish?"Usuario invalido": "Invalid User";
    }
    return "";
  } else {
    if (event.length < 4) {
      return isSpanish? "Introduzca su contraseña": "Enter your password";
    } else if (event.length > 50) {
      return isSpanish?"Sólo hay contraseñas con menos de 50 caracteres":"There's only passwords whit less than 50 characters";
    }
    return "";
  }
};

export default validate;
