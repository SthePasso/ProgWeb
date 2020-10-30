class IntegerSet {
    constructor (nome, numeroMaximo) {
        this.nome = nome;
        this.numeroMaximo = numeroMaximo;
        this.lista = [];
        this.initializeLista();
        //console.log(this.lista);
    }
    initializeLista(){
        for (var i = 0; i < this.numeroMaximo; i++) {
            this.lista.push(false);
        }
    }
    insere (i) {
        if(i>= 0 && i< this.numeroMaximo){
            this.lista[i] = true;
            //console.log("Insere: "+i);
            
        }    
    }
    exclui (i) {
        if(i>= 0 && i< this.numeroMaximo){
            this.lista[i] = false;
            //console.log("Exclui: "+i);
            //console.log(this.lista);
        }
    }
    uniao (outra) {
        let aux = [];
        for (var i = 0; i < this.numeroMaximo || i < outra.numeroMaximo; i++) {
            if(this.lista[i] || outra.lista[i]){
                aux.push(true);
            }else{
                aux.push(false);
            }
        }
        return aux;
    }
    intersexao (outra) {
        let aux = [];
        for (var i = 0; i < this.numeroMaximo || i < outra.numeroMaximo; i++) {
            if((this.lista[i] || outra.lista[i]) && !(this.lista[i] && outra.lista[i])){
                aux.push(true);
            }else{
                aux.push(false);
            }
        }
        return aux;
    }
    diferenca (outra) {//this - outra
        let aux = [];
        for (var i = 0; i < this.numeroMaximo; i++) {
            if(this.lista[i] && !outra.lista[i]){
                aux.push(true);
            }else{
                aux.push(false);
            }
        }
        return aux;
    }
    conversaoParaString(){
        return this.lista.join(',');
    }
    
}
lista1 = new IntegerSet ("Lista 1", 4);
lista2 = new IntegerSet ("Lista 2", 10);
lista1.insere(2);
lista2.insere(2);
lista2.insere(4);
console.log("União:         "+lista1.uniao(lista2));
console.log("Intersexão:    "+lista1.intersexao(lista2));
console.log("Diferença:     "+lista1.diferenca(lista2));
console.log("Conversão:     "+typeof(lista1.conversaoParaString(lista2)));

//console.log(IntegerSet.maiorLista([lista1,lista2]));