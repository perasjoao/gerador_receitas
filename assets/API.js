function escreveReceita(receita){
    let p=document.querySelector("p");
    p.innerHTML=JSON.stringify(receita);
}

function separaIngredientes(receita){
        for(let i=1; receita["strIngredient"+i]!=""; i++){
            console.log(receita["strIngredient"+i]);
        }
    }

async function pegaComida() {
    try{
        let comida= await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        console.log(comida.status);
        if(comida.ok){
            console.log("requisiçao feita");
        }
        let receita= await comida.json();
        escreveReceita(receita);
        console.log(typeof(receita));
        console.log(receita);
        console.log(receita.meals[0]);
        separaIngredientes(receita.meals[0]); 
    }
    catch{
        console.log("Erro");
    }
}

pegaComida();
console.log("acabou");