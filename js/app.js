const input = document.querySelector('#input')
const list = document.querySelector('#list')
const done = document.querySelector('#list-done')
const reset = document.querySelector('#btn-clear')

/*
input.addEventListener("keypress", function(event) {
    if(event.which === 13 && this.value) {
        let item = this.value
        input.value = ""
        localStorage.setItem('list', item)
    }
})
*/

input.addEventListener("keypress", function(event) {
    // Only trigger if return i pressed and inputfield not empty
    if(event.which === 13 && this.value) {
        // Save input to variable and clear inputfield
        let listItem = this.value
        input.value = ""
        // Create element with styles
        const newListItem = document.createElement("li")
        newListItem.className = 'list-group-item'
        // Create textnode to insert value
        const itemContent = document.createTextNode(listItem)
        // Add the input value inside the new li-element
        newListItem.appendChild(itemContent)
        // Attach the new lisitem with content to list
        list.appendChild(newListItem)
        // Check if list is empty 
        checkIfListEmpty()
    }
})

list.addEventListener("click", function(event) {
    const target = event.target;
    if (target.matches("li")) {
        let checkItem = target
        target.remove()
        done.appendChild(checkItem)
        checkIfListEmpty()
    }
}, true)

reset.addEventListener("click", function() {
    let child = done.querySelectorAll("li")
    child.forEach(item => item.remove())
    reset.style.display = "none"
})

function checkIfListEmpty() {
    if (list.childElementCount === 0) {
        reset.style.display = "inline"
    } else {
        reset.style.display = "none"
    }
}
