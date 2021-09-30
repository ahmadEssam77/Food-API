// =============== Initialize API old way ===============
// =============== Story the data from API to my Array ===============
let storeData = [];

// =============== Select the links ===============
let links = document.querySelectorAll(".navbar-nav li a");

// =============== Pass the word that I clicked on it to the getAPI function and change the active class ===============
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        let foodName = e.target.innerHTML;
        let theElement = e.target;
        for (let i = 0; i < links.length; i++) {
            links[i].classList.remove("active");
        }
        theElement.classList.add("active");
        getAPI(foodName);
    });
}

// =============== Get API ===============
function getAPI(cuisine) {
    let http = new XMLHttpRequest();
    http.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${cuisine}`);
    http.send();
    http.addEventListener("readystatechange", function () {
        if (http.readyState == 4 && http.status == 200) {
            storeData = JSON.parse(http.response).recipes;
            displayMenu(callback);
        }
    });
}

// =============== Display API
function displayMenu(callback) {
    let keeper = ``;
    for (let i = 0; i < storeData.length; i++) {
        keeper += `
                <div class="col-md-3 py-4">
                    <div class="text-center">
                        <img src="${storeData[i].image_url}" alt="" class="w-100">
                        <p>${storeData[i].title}</p>
                        <button class="btn btn-warning">Details</button>
                        <button class="btn btn-secondary">Recipes</button>
                    </div>
                </div>  
            `
    }

    document.getElementById('displayHere').innerHTML = keeper;

    return callback();
}

// ========== Call at the beginning to show data ============
getAPI("salad");

// ========== callback function ==========
function callback() {
    let keeper = `
            <div class="container py-5">
                <div class="text-center text-white">
                    <h5>&copy;Ahmad Essam 30-9-2021</h5>
                </div>
            </div>
    `
    document.getElementById('myFooter').innerHTML = keeper;
}
