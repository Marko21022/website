// Grab the button element by its ID
const button = document.getElementById("alertButton");
const input = document.getElementById("inputField");
const error = document.getElementById("errorMessage");

// Add a click event listener
button.addEventListener("click", function () {
    alert("You clicked the button!");
    button.innerText = "Clicked!";

    setTimeout(() => {
        button.innerText = "Done!";
    }, 2000); // changes to "Done!" after 2 seconds

    setTimeout(() => {
        button.innerText = "Click or hover me!";
    }, 2000); // changes to "Done!" after 2 seconds
});

button.addEventListener("mouseover", function () {
    button.style.backgroundColor = "lightblue";
    button.style.color = "green";
    button.innerText = "Hovered!"

    setTimeout(() => {
        button.innerText = "Click or hover me!";
    }, 2000); // changes to "Done!" after 2 seconds
});

button.addEventListener("mouseout", function () {
    button.style.backgroundColor = "white";
    button.style.color = "black";
});

input.addEventListener("input", () => {
    const value = input.value;

    // Limit max characters
    if (value.length > 10) {
        input.value = value.slice(0, 10); // cut extra characters
        return; // stop further validation since max is hit
        style.color = "red";
        error.style.fontWeight = "normal";
    }

    // If empty
    if (value.length === 0) {
        error.innerText = "Input required (3–10 characters)";
        error.style.color = "red";
        error.style.fontWeight = "normal";
    }
    // If less than 3 characters
    else if (value.length < 3) {
        error.innerText = "Too short (min 3 characters)";
        error.style.color = "red";
        error.style.fontWeight = "normal";
    }
    // If valid
    else {
        error.innerText = "Awesome!";
        error.style.color = "green";
        error.style.fontWeight = "bold";
    }
});

setInterval(() => {
    if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
        alert("DevTools open detected");
    }
}, 1000);

document.addEventListener("keydown", function (e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
    }
});
