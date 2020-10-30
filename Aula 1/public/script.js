(function () {
    const botao = document.getElementById("botao");
    botao.onclick = function (){
        console.log("Icomp");//Ctrl+Shit+J
        document.body.style.background = getRandomColor();
    }

    function getRandomColor(){
        const letras = "0123456789ABCDEF";
        let cor = "#";
        for (let i = 0; i<6; i++){
            cor += letras[Math.floor(Math.random()*16)];
        }
        return cor;
    }

}) ()