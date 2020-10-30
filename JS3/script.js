const counter = function(secret){
    //return secret = secret+ 1;
    return function pluss(){
        return secret++;
        
        /*getValue: function(){
            return secret;
        },
        setValue: function(value){
            if(typeof value === 'number'){
                secret = value;
            }
        }*/
    }
}


let incrementar = counter(1);
console.log('Primeira chamada '+incrementar());
console.log('Segunda chamada '+incrementar());
console.log('Terceira chamada '+incrementar());
//node script.js