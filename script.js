var modal = document.getElementById("modal");

var close = document.getElementById("close");

close.onclick = function(event) {
      modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

var recipes;

function listItemTemplate(recipe){
    const list = document.getElementsByClassName("recipes")[0];
    var entry = document.createElement('li');
    
    var recipeFlex = document.createElement('div');
    recipeFlex.classList.add("recipeFlex");
    
    var leftFlex = document.createElement("div");
    leftFlex.classList.add("leftFlex");
    var img = document.createElement("img");
    var label = document.createElement("label");
    img.src = recipe["image"];
    label.innerText = recipe["name"];

    leftFlex.appendChild(img);
    leftFlex.appendChild(label);

    var rightFlex = document.createElement("div");
    rightFlex.classList.add("rightFlex");
    
    var label2 = document.createElement("label");
    label2.innerText = recipe["category"] + ", " + recipe["region"];
    var button = document.createElement("button");
    
    button.classList.add("recipeButton");
    button.innerText = "See recipe";

    button.onclick = function(){showRecipeModal(recipe["id"]);};
    rightFlex.appendChild(label2);
    rightFlex.appendChild(button);

    recipeFlex.appendChild(leftFlex);
    recipeFlex.appendChild(rightFlex);
    
    entry.appendChild(recipeFlex);
    list.appendChild(entry);
}

function showRecipeModal(id){
    var recipe = recipes["meals"].filter(function(item) { return item.id === id; })[0];
    const modalImg = document.getElementById("modalImg");
    modalImg.src = recipe["image"];
    document.getElementById("recipeText").innerText = recipe["instruction"];
    modal.style.display = "block";
    var table = document.getElementById("ingredients");
    const ingredients = recipe["ingredients"];
    table.innerHTML = "";
    const headerRow = document.createElement("tr");
    
    const headerIngredient = document.createElement("th");
    const headerMeasure = document.createElement("th");
    
    headerIngredient.innerText = "Ingredient";
    headerMeasure.innerText = "Measure";
    
    headerRow.appendChild(headerIngredient);
    headerRow.appendChild(headerMeasure);
    
    table.appendChild(headerRow);
    
        ingredients.forEach(ingredient => {
        var tr = document.createElement("tr");
        var tdIngredient = document.createElement("td");
        var tdMeasure = document.createElement("td");
        
        tdIngredient.innerText = ingredient["name"];
        tdMeasure.innerText = ingredient["measure"];
        
        tr.appendChild(tdIngredient);
        tr.appendChild(tdMeasure);

        table.appendChild(tr);
    });
}

function filterByName(){
    var input = document.getElementById("filterName").value.toUpperCase();
    let r = recipes["meals"].filter(function(item) { return item.name.toUpperCase().startsWith(input); });
    const list = document.getElementsByClassName("recipes")[0];
    list.innerHTML = "";
    r.forEach((recipe) => listItemTemplate(recipe));
}

function filterByRegion(){
    var input = document.getElementById("filterRegion").value.toUpperCase();
    let r = recipes["meals"].filter(function(item) { return item.region.toUpperCase().startsWith(input); });
    const list = document.getElementsByClassName("recipes")[0];
    list.innerHTML = "";
    r.forEach((recipe) => listItemTemplate(recipe));
}

function filterByCategory(){
    var input = document.getElementById("filterCategory").value.toUpperCase();
    let r = recipes["meals"].filter(function(item) { return item.category.toUpperCase().startsWith(input); });
    const list = document.getElementsByClassName("recipes")[0];
    list.innerHTML = "";
    r.forEach((recipe) => listItemTemplate(recipe));
}

async function loadRecipes() {
    const response = await fetch (
        `https://api.npoint.io/51ed846bdd74ff693d7e`
      );

    recipes = await response.json();
    localStorageRecipes = JSON.parse(localStorage.getItem("localRecipes"));
    
    for(let i = 0; i < localStorageRecipes.length; i++){
        recipes["meals"].push(localStorageRecipes[i]);
    }

    // console.log(localStorageRecipes);

    recipes["meals"].forEach((recipe) => listItemTemplate(recipe));
  }

  loadRecipes();
