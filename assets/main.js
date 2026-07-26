
class GeradorReceitas{
    constructor(){
        this.gerador;
        this.imagem;
        this.preparo;
        this.ingredientes;
    }
    inicia(){
        this.callAPI();
    }
    separaImagem(){

    }

    separaPreparo(receita){
        let body=document.querySelector("body");
        let p=document.createElement("p");
        let h1=document.createElement("h1");
        p.innerHTML=receita["strInstructions"];
        h1.innerHTML="Modo de Prepraro";
        body.appendChild(h1);
        body.appendChild(p);
    }

    escreveIngredientes(ingredient, ul){
        let li=document.createElement("li");
        li.innerHTML=ingredient;
        ul.appendChild(li);
    }

    criaCorpoIngredients(){
        let body=document.querySelector("body");
        let p=document.createElement("p");
        let h1=document.createElement("h1");
        let ul=document.createElement("ul");
        h1.innerText="Ingredientes";
        body.appendChild(h1);
        body.appendChild(p);
        p.appendChild(ul);
        return ul;
    }

    separaIngredientes(receita){
        let ul=this.criaCorpoIngredients();

        for(let i=1; receita["strIngredient"+i]!=""; i++){
            console.log("separando");
            console.log(receita["strIngredient"+i]);
            this.escreveIngredientes(receita["strIngredient"+i], ul);
        }
    }
    async callAPI(){
        try {
            let comida= await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            if(!comida.ok){
                console.log("Erro a consular api" + comida.status);
                return;
            }
            let receita= await comida.json();
            console.log(receita);
            //this.separaImagem(receita.meals[0]);
            this.separaIngredientes(receita.meals[0]);
            this.separaPreparo(receita.meals[0]);
        }
        catch (error) {
            console.error(error.message);    
        }
    }
}

const g= new GeradorReceitas();
g.inicia();
