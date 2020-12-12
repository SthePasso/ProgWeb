(function () {

  const FPS = 1; 
  let arvoreDimensions = [100,55];
  let gameDimensions = [1243, 960-arvoreDimensions[1]];
  let focoDimensions = [100, 130];
  let devastacaoDimensions = [250,250];
  let caveiraDimensions = [100, 130];
  let numPontos = 0;
  let pontos = [];
  let probFoco = 25;
  let reserva;
  let numFocos = 0;
  let numCaveira = 0;
  let numDevastacao = 0;
  let focos = [];
  let caveira = [];
  let titulo = [];
  let arvore = [];
  let devastacao = [];
  let id=0;
  let pausa = false;
  let game_Over = false;
  let i=0;
  let j=0;
  let segundos = 1000;//0;
  let sessentaFrames = 0.9;
  const root = document.getElementById("root");

  function init() {
    arvore = new Arvore();
    pontos = new Pontuacao();
    reserva = new Reserva();
    focos = new FocoIncendio();
  }

  class Arvore{
    constructor(){
      for (var i=0; i<5; i++){
        this.element = document.createElement("div");
        this.element.id = "arvore"+i;
        this.element.className = "arvore";
        this.element.style.width = `${arvoreDimensions[0]}px`;
        this.element.style.height = `${arvoreDimensions[1]}px`;
        root.appendChild(this.element);
      }
    }
      
  }

  class Pontuacao{

    constructor(){
      document.querySelectorAll('.pontos').forEach(function(a){
        a.remove()
      })
      this.element = document.createElement("h1");
      this.element.className = "pontos";
      this.element.innerHTML = this.getPontuation()//pontos;
      root.appendChild(this.element);
    }

    getPontuation(){
      if(numPontos/10 == 0){
        return "00000"
      }else if(numPontos/10 < 1){
        return "0000"+numPontos;
      }else if(numPontos/100 < 1){
        return "000"+numPontos;
      }else if(numPontos/1000 < 1){
        return "00"+numPontos;
      }else if(numPontos/10000 < 1){
        return "0"+numPontos;
      }else if(numPontos/100000 < 1){
        return numPontos;
      }
    }
  }

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.id = "reserva"+id++;
      this.element.className = "reserva";
      this.adaptBoard();
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      root.appendChild(this.element);
    }

    adaptBoard(){
      var win = window,
      doc = document,
      docElem = doc.documentElement,
      body = doc.getElementsByTagName('body')[0],
      x = win.innerWidth || docElem.clientWidth || body.clientWidth,
      y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
      gameDimensions = [x, y-20-arvoreDimensions[1]];
    }
  }

  class FocoIncendio {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.id = "foco"+(numFocos++);
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      var left = Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])));
      var top = Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])));
      [left, top] = this.semLagos(focoDimensions);
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
      root.appendChild(this.element);
      //console.log('Jogada: '+this.element.style.left+" , "+this.element.style.top);
      if(!pausa){
        this.alvosDeFogo();
        segundos = segundos*sessentaFrames;
      } 
    }

    semLagos(dimension){
      var x = Math.floor((Math.random() * (gameDimensions[0]-dimension[0])));
      var y = Math.floor((Math.random() * (gameDimensions[1]-dimension[1])));
      //var c = document.getElementById("myCanvas");
      //var ctx = c.getContext("2d");
      //var pixelData = ctx.getImageData(x, y, 1, 1).data;
      //console.log("Pixel: "+pixelData);
      if(x > Math.floor(gameDimensions[0]/2) && y < Math.floor(gameDimensions[1]/2)){//blueIndex < redIndex || blueIndex < greenIndex){
        console.log(x, y);
        return this.semLagos(dimension);
      } return [x, y];
    }

    alvosDeFogo(){
      this.setFoco();
      this.setCaveira();
    }

    setFoco(){
      var timeFoco = Math.floor((Math.random()+1) * 4);//1 a 4 segundos
      setTimeout( function() {
        focos = new FocoIncendio();
      }, timeFoco * segundos);
      this.setDevastacao(-3);
      this.setDevastacao(-2);
      this.setDevastacao(-1);
    }

    setCaveira(){
      var timeCaveira = Math.floor((Math.random()+5) * 20);//5 a 20 segundos
      var x;
      var y;
      [x, y] = this.semLagos(caveiraDimensions);
      setTimeout( function() {
        this.caveira = new Caveira(x, y);
      }, timeCaveira * segundos);
      this.setDevastacaoCaveira(-3);
      this.setDevastacaoCaveira(-2);
      this.setDevastacaoCaveira(-1);
    }

    setDevastacaoCaveira(i){//fazer função para trocar imagem
      setTimeout( function() {
        if(document.getElementById("caveira"+(numCaveira+i)) !== null) {
          this.devastacao = new Devastacao(document.getElementById("caveira"+(numCaveira+i)));
          perdeUmaVida();
          perdeUmaVida();
        }
      }, 2 * segundos);

      function perdeUmaVida() {//função para remover elemento da arvore 
        console.log("Perdeu 1");
        for (var i=4; i>=0 ;i--){
          if(document.getElementById("arvore"+i) !== null){
            if(i>0){
              document.getElementById("arvore"+i).remove();
              return;
            } else{
              document.getElementById("arvore"+i).remove();
              return gameOver();
            }
          }
        }
      } 
      
      function gameOver(){
        pausa = true;
        game_Over = true;        
        this.titulo = new Titulo("GAME OVER");
      }
    }
    
    setDevastacao(i){//fazer função para trocar imagem
      setTimeout( function() {
        if(document.getElementById("foco"+(numFocos+i)) !== null) {
          console.log("Foco: "+document.getElementById("foco"+(numFocos+i)).style.left+" "+document.getElementById("foco"+(numFocos+i)).style.top)
          this.devastacao = new Devastacao(document.getElementById("foco"+(numFocos+i)));
          perdeUmaVida();
        } return 1;
      }, 2 * segundos);

      function perdeUmaVida () {//função para remover elemento da arvore 
        console.log("Perdeu 1");
        for (var i=4; i>=0 ;i--){
          if(document.getElementById("arvore"+i) !== null){
            if(i>0){
              document.getElementById("arvore"+i).remove();
              //root.style.background-color = `${yellow}`;
              return;
            } else{
              document.getElementById("arvore"+i).remove();
              //document.getElementByClassName("body").style.background-color = `${red}`;
              return gameOver();
            }
          }
        }
      } 

      function gameOver(){
        pausa = true;
        game_Over = true;
        titulo = new Titulo("GAME OVER");
      }
    }  
  }

  class Caveira {
    constructor (left, top) {
      this.element = document.createElement("div");
      this.element.className = "caveira";
      this.element.id = "caveira"+(numCaveira++);
      this.element.style.width = `${caveiraDimensions[0]}px`;
      this.element.style.height = `${caveiraDimensions[1]}px`;
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
      root.appendChild(this.element);
    } 
  }

  class Titulo{
    constructor(mensagem){
      this.element = document.createElement("div");
      this.element.className = "titulo";
      this.element.id = "titulo_id";
      this.element.innerHTML = mensagem; 
      root.appendChild(this.element);
    }
  }

  class Devastacao {
    constructor (outro) {
      var tamanho = 1;
      var left = outro.style.left;
      var top = outro.style.top;
      if(outro.className == "caveira"){
        tamanho++;
      } outro.parentNode.removeChild(outro);
      this.element = document.createElement("div");
      this.element.className = "devastacao";
      this.element.id = "devastacao"+(numDevastacao++);
      this.element.style.width = `${devastacaoDimensions[0]*tamanho}px`;
      this.element.style.height = `${devastacaoDimensions[1]*tamanho}px`;
      this.element.style.left = left;
      this.element.style.top = top;
      root.appendChild(this.element);
    } 
  }

  window.addEventListener("keydown", function(e){
    if(e.key === "s" || e.key === "S"){       
      //remover todos os focos de incendio, vidas 
      document.querySelectorAll('.foco-incendio').forEach(function(a){
        a.remove()
      })
      document.querySelectorAll('.devastacao').forEach(function(a){
        a.remove()
      })
      document.querySelectorAll('.caveira').forEach(function(a){
        a.remove()
      })
      document.querySelectorAll('.titulo').forEach(function(a){
        a.remove()
      })
      //Reinicia o jogo
      numFocos = 0;
      numPontos = 0;
      pontos = new Pontuacao();
      pausa = true;
      game_Over = false;
      console.log("START");
      titulo = new Titulo("     START");
      setTimeout( function() {
        document.querySelectorAll('.titulo').forEach(function(a){
          a.remove()
        })
        document.querySelectorAll('.arvore').forEach(function(a){
          a.remove()
        })
        var nomeId = "reserva"+(id-1);
        document.getElementById(nomeId).remove();
        segundos = 1000;
        pausa = false;
        init();
      }, 3 * segundos); 
    }
  })

  window.addEventListener("keydown", function(e){
    if(e.key === "p" || e.key === "P"){
      //clearInterval(gameLoop);
      if(!game_Over){
        if(!pausa){
          titulo = new Titulo("PAUSE");
          pausa=true;
        } else{
          document.querySelectorAll('.titulo').forEach(function(a){
            a.remove()
          })        
          pausa = false;
          focos.alvosDeFogo();
        }
      } else {       
        pausa = true;
      }
      console.log("PAUSE");
    }
  })

  window.addEventListener("mousedown", function(e){
    if(!game_Over && !pausa){
      var left = `${e.clientX}px`;
      var top = `${e.clientY}px`;
      var element = e.srcElement;
      if(element.className=="foco-incendio"){
        element.parentNode.removeChild(element);
        numPontos += 10;
        this.pontos = new Pontuacao();
      } else if(element.className=="caveira"){
        element.parentNode.removeChild(element);
        numPontos += 20;
        this.pontos = new Pontuacao();
      }
    }
  })

  function run () {
    if (Math.random() * 100 <= probFoco) {
      let foco = new FocoIncendio();
      focos.push(foco);
    }
  }
  
  this.arvore = new Arvore();
  this.pontos = new Pontuacao();
  this.reserva = new Reserva();
})();
