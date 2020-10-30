let pontuacao = 0;
let flag = 1;

while(flag){
    console.log("Escolha uma jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura\n");
    let valor = parseInt(window.prompt("Escolha uma jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura\n"));
    //console.log(valor);
    let computador = Math.floor(Math.random() * (3 - 1)) + 1;
    let alternativa;
    if(computador == 1){alternativa = "Papel";} else if(computador == 2) {alternativa = "Pedra";} else{alternativa = "Tesoura";}
    console.log("O computador jogou "+alternativa);
    alert("O computador jogou "+alternativa);
    
    if(isNaN(valor) || (valor < 1 && valor > 3) ){
        console.log("Opção inválida, você perdeu! A sua pontuação foi de "+pontuacao);
        alert("Opção inválida, você perdeu! A sua pontuação foi de "+pontuacao);
        flag = 0;
    } else if (valor == computador){
        console.log("A rodada empatou!");
        alert("A rodada empatou!");
    } else if(valor < computador  && !(valor==1 && computador == 3)){
        console.log("Você ganhou");
        alert("Você ganhou");
        pontuacao+=1;
    } else if(valor==3 && computador == 1){
        console.log("Você ganhou");
        alert("Você ganhou");
        pontuacao+=1;
    } else{
        console.log("Você perdeu! A sua pontuação foi de "+pontuacao);
        alert("Você perdeu! A sua pontuação foi de "+pontuacao);
        flag = 0;
    } 
}