import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-41875-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()

})

onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())

    clearShoppingListEl()
    
    for (let i = 0; i < itemsArray.length; i++) {
        appendItemToShoppingListEl(itemsArray[i])
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = null
}

function appendItemToShoppingListEl(itemValue){
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}