const input = document.querySelector('#input')
const list = document.querySelector('#list')
const done = document.querySelector('#list-done')
const reset = document.querySelector('#btn-clear')

// check for browser compatability with service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('service worker registered', reg))
    .catch(err => console.log('service worker not registered', err))
}

// get list on page reload
window.onload = function() {
    for (let i = 0; i < localStorage.length; i++) {
        let item = localStorage.key(i)
        newTextNode(item)
    }
}

// add item to list from input
input.addEventListener("keypress", function(event) {
    if(event.which === 13 && this.value) {
        let item = this.value
        input.value = ""
        localStorage.setItem(item, item)
        newTextNode(item)
    }
})

// move item from list to done when clicked
list.addEventListener("click", function(event) {
    const target = event.target;
    if (target.matches("li")) {
        let checkItem = target
        localStorage.removeItem(target.innerHTML)
        target.remove()
        done.appendChild(checkItem)
        checkIfListEmpty()
    }
}, true)

// reset done once all items in list are completed
reset.addEventListener("click", function() {
    let child = done.querySelectorAll("li")
    child.forEach(item => item.remove())
    reset.style.display = "none"
})

// hide reset button until list is empty
function checkIfListEmpty() {
    if (list.childElementCount === 0) {
        reset.style.display = "inline"
    } else {
        reset.style.display = "none"
    }
}

// create list item when added from input or on page reload
function newTextNode(content) {
    const newListItem = document.createElement("li")
    newListItem.className = 'list-group-item'
    const itemContent = document.createTextNode(content)
    newListItem.appendChild(itemContent)
    list.appendChild(newListItem)
}