var regions;
var categories;

function addRegionToSelect(region){
    select = document.getElementById('region');
    var opt = document.createElement('option');
    opt.value = region["name"];
    opt.innerHTML = region["name"];
    select.appendChild(opt);
}

function addCategoryToSelect(category){
    select = document.getElementById('category');
    var opt = document.createElement('option');
    opt.value = category["name"];
    opt.innerHTML = category["name"];
    select.appendChild(opt);
}

function addIngredientInput(){
    const list = document.getElementById("ingredientsList");
    const li = document.createElement("li");

    const ingredientName = document.createElement("input");
    ingredientName.classList.add("input1");
    ingredientName.placeholder = "Ingredient Name";
    ingredientName.type = "text";
    ingredientName.classList.add("ingredientName");
    li.appendChild(ingredientName);

    const measure = document.createElement("input");
    measure.classList.add("input1");
    measure.placeholder = "Measure";
    measure.type = "text";
    measure.classList.add("measure");
    li.appendChild(measure);

    list.appendChild(li);
}

function addRecipe(){
    var localStorageRecipes = [];
    localStorage.clear();
    localStorageRecipes = JSON.parse(localStorage.getItem("localRecipes"));
    if(localStorageRecipes == null){
        localStorageRecipes = [];
    }
    console.log(localStorageRecipes);
    var recipe = {};
    var name = document.getElementById("name").value;
    recipe["name"] = name;

    var image = document.getElementById("image").value;
    recipe["image"] = image;

    var category = document.getElementById("category").value;
    recipe["category"] = category;

    var region = document.getElementById("region").value;
    recipe["region"] = region;

    var ingredientNames = document.getElementsByClassName("ingredientName");
    var measures = document.getElementsByClassName("measure");
    var arr = [];
    for(let i = 0; i < measures.length; i++){
        arr.push({"name": ingredientNames[i].value, "measure": measures[i].value});
    }
    recipe["ingredients"] = arr;
    console.log(recipe);
    localStorageRecipes.push(recipe);
    localStorage.setItem("localRecipes", JSON.stringify(localStorageRecipes));
    location.href = "index.html";

}

async function loadRecipes() {
    const response = await fetch (
        `https://api.npoint.io/51ed846bdd74ff693d7e`
      );

    recipes = await response.json();
    regions = recipes["regions"];
    categories = recipes["categories"];


    regions.forEach(region => {
        addRegionToSelect(region);        
    });

    categories.forEach(category => {
        addCategoryToSelect(category);        
    });
  }
  loadRecipes();
