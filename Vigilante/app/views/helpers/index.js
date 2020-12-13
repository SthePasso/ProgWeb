function toLower(str){
    return str.toLowerCase();
}

function toUpper(str){
    return str.toUpperCase();
}

function checked(currentValue, value){
    if (currentValue == value){
        return "checked";
    } else{
        return "";
    }
}

function printError(errors, campo) {
    let message = '';
    if(errors && Array.isArray(errors.errors)){
        errors.errors.forEach(error =>{
            if(error.path === campo){
                message = error.message;
            }
        });
    }
    return message;
}

module.exports = {toLower, toUpper, checked, printError};