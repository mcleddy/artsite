window.addEventListener("load", start);

function start() {
    console.log("Challenge 1 DOM started");
}

window.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    var username = document.querySelector("#username");
    var note = document.querySelector("#note");

    if (username.value !== "" && note.value !=="") {
        var listOfNames = document.querySelector("#listOfNames");

        var itemContent = document.createElement("div");
        itemContent.id = "itemContent";

        var name = document.createElement("span");
        name.textContent = username.value;
        name.classList.add("addPointer");
        name.addEventListener("click", function () {
            username.value = name.textContent;
            document.querySelector("#submit").addEventListener("click", function () {
                name.textContent = username.value;
                username.value = "";
            });
        });

        var deleteButton = document.createElement("input");
        deleteButton.type = "submit";
        deleteButton.value = "Delete";
        deleteButton.id = "delete";
        deleteButton.addEventListener("click", function () {
            itemContent.remove();
        });

        itemContent.appendChild(name);
        itemContent.appendChild(deleteButton);

        listOfNames.appendChild(itemContent);
        username.value = "";
    }
}
