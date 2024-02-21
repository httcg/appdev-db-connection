import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//database connection
const appSettings = {
    databaseURL: "https://wishlist-3c2c6-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)      //initialize db- firebase
const database = getDatabase(app)           //referencing
const wishlistInDB = ref(database, "wishlist")

const inputFieldEl = document.getElementById("input-field")
const wishButtonEl = document.getElementById("wish-button")
const wishlist = document.getElementById("wish-list")

wishButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(wishlistInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(wishlistInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
        clearListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToListEl(currentItem)
        }    
    } else {

        wishlist.innerHTML = "... no wish meow? "
    }
})

function clearListEl() {
    wishlist.innerHTML = ""
}

 
//remove input to placeholder
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

//add wish to list meow
function appendItemToListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `wishlist/${itemID}`)
        //remove wish from list
        
        remove(exactLocationOfItemInDB)
    })
    
    wishlist.append(newEl)
}