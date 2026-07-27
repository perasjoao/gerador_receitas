
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
    separaImagem(receita){
        let body=document.querySelector("body");
        let img=document.createElement("img");
        img.setAttribute("src",receita["strMealThumb"]);
        body.appendChild(img);
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

    escreveIngredientes(ingredient, quantidade,ul){
        let li=document.createElement("li");
        li.innerHTML=quantidade+" of "+ingredient;
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
            this.escreveIngredientes(receita["strIngredient"+i],receita["strMeasure"+i],ul);
        }
    }

    escreveDescricao(country,category,name){
        let h2=document.createElement("h2");
        let body=document.querySelector("body");
        let p=document.createElement("p");
        let ul=document.createElement("ul");
        let l1=document.createElement("li");
        let l2=document.createElement("li");
        let l3=document.createElement("li");
        l1.innerHTML="Name: "+name;
        l2.innerHTML="Country: "+country;
        l3.innerHTML="Category: "+category;
        h2.innerHTML="Descrição";
        body.appendChild(h2);
        ul.appendChild(l1);
        ul.appendChild(l2);
        ul.appendChild(l3);
        p.appendChild(ul);
        body.appendChild(p);
    }

    separaDescricao(receita){
        let country=receita["strCountry"];
        let category=receita["strCategory"];
        let name=receita["strMeal"];
        console.log(country,category,name);
        this.escreveDescricao(country,category,name);
    }

    separaVideo(receita){
        if(!receita["strYoutube"].length){
            return;
        }
        let body=document.querySelector("body");
        let a=document.createElement("a");
        let br=document.createElement("br");
        a.setAttribute("href",receita["strYoutube"]);
        a.innerHTML="video tutorial";
        body.appendChild(br);
        body.appendChild(a);
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
            this.separaImagem(receita.meals[0]);
            this.separaVideo(receita.meals[0]);
            this.separaDescricao(receita.meals[0]);
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
